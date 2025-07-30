// Cart.jsx
import API from "../services/api";
import { useCart } from "../hooks/useCart";

export default function Cart() {
    const { cart, clearCart } = useCart(); // ✅ No useLocation

    const handleCheckout = async () => {
        const items = cart.map((c) => ({
            product_id: c.product.id,
            quantity: c.quantity,
        }));
        await API.post("checkout/", { items });
        alert("Order placed!");
        clearCart(); // ✅ Optional: clear cart after checkout
    };

    return (
        <div>
            <h2>Cart</h2>
            {cart.length === 0 ? (
                <p>Cart is empty</p>
            ) : (
                <>
                    <ul>
                        {cart.map((c) => (
                            <li key={c.product.id}>
                                {c.product.name} × {c.quantity} = ₹
                                {c.quantity * c.product.price}
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleCheckout}>Checkout</button>
                </>
            )}
        </div>
    );
}
