import { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const u = JSON.parse(localStorage.getItem("user"));
        if (!u?.is_admin) navigate("/");
        loadOrders();
    }, []);

    const loadOrders = async () => {
        const res = await API.get("admin/orders/");
        setOrders(res.data);
    };

    return (
        <div>
            <h2>📑 Admin - All Orders</h2>
            {orders.length === 0 ? (
                <p>No orders placed yet.</p>
            ) : (
                orders.map((order) => (
                    <div
                        key={order.id}
                        style={{
                            border: "1px solid #ccc",
                            padding: "1rem",
                            margin: "1rem 0",
                        }}
                    >
                        <p>
                            <b>Order #{order.id}</b> | ₹{order.total_price} |{" "}
                            {new Date(order.created_at).toLocaleString()}
                        </p>
                        <p>
                            <b>User:</b> {order.user.username} (
                            {order.user.email})
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
