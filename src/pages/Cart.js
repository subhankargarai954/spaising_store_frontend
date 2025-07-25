import { useLocation } from "react-router-dom";
import API from "../services/api";

export default function Cart() {
    const { state } = useLocation();
    const cart = state?.cart || [];

    const handleCheckout = async () => {
        const items = cart.map((c) => ({
            product_id: c.product.id,
            quantity: c.quantity,
        }));
        await API.post("checkout/", { items });
        alert("Order placed!");
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
