import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("access");
        if (!token) {
            navigate("/login");
            return;
        }

        API.get("orders/")
            .then((res) => setOrders(res.data))
            .catch(() => navigate("/login"));
    }, []);

    return (
        <div>
            <h2>Order History</h2>
            {orders.length === 0 ? (
                <p>No past orders</p>
            ) : (
                orders.map((order) => (
                    <div
                        key={order.id}
                        style={{
                            border: "1px solid #ccc",
                            margin: "1rem",
                            padding: "1rem",
                        }}
                    >
                        <p>
                            <b>Order #{order.id}</b> | ₹{order.total_price} |{" "}
                            {new Date(order.created_at).toLocaleString()}
                        </p>
                        <ul>
                            {order.items.map((item) => (
                                <li key={item.product.id}>
                                    {item.product.name} × {item.quantity} = ₹
                                    {item.price * item.quantity}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
}
