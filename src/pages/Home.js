import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [nextPageUrl, setNextPageUrl] = useState("products/");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        if (!nextPageUrl || loading) return;

        setLoading(true);
        try {
            const res = await API.get(nextPageUrl);

            // filter duplicates
            const existingIds = new Set(products.map((p) => p.id));
            const newItems = res.data.results.filter(
                (p) => !existingIds.has(p.id)
            );
            setProducts((prev) => [...prev, ...newItems]);

            // handle next URL
            const fullNext = res.data.next;
            if (fullNext) {
                const relative = fullNext.includes("/api/")
                    ? fullNext.split("/api/")[1]
                    : fullNext;
                setNextPageUrl(relative);
            } else {
                setNextPageUrl(null);
            }
        } catch (error) {
            console.error("Failed to load products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                    document.body.offsetHeight - 200 &&
                !loading &&
                nextPageUrl
            ) {
                fetchProducts();
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, nextPageUrl, products]);

    const handleAddToCart = (product) => {
        const exists = cart.find((item) => item.product.id === product.id);
        if (exists) {
            setCart(
                cart.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            setCart([...cart, { product, quantity: 1 }]);
        }
    };

    return (
        <div>
            <h2>Products</h2>
            <button onClick={() => navigate("/cart", { state: { cart } })}>
                🛒 Cart ({cart.length})
            </button>
            <button onClick={() => navigate("/orders")}>📦 My Orders</button>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                {products.map((p) => (
                    <ProductCard
                        key={`product-${p.id}`} // Ensures unique key
                        product={p}
                        onAddToCart={handleAddToCart}
                    />
                ))}
            </div>

            {loading && <p>Loading more products...</p>}
            {!nextPageUrl && <p>✅ All products loaded.</p>}
        </div>
    );
}
