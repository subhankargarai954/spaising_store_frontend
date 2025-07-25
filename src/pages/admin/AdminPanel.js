import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function AdminPanel() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) return navigate("/login");
        const parsed = JSON.parse(storedUser);
        if (!parsed.is_admin) return navigate("/");

        setUser(parsed);
    }, []);

    return (
        <div>
            <h2>👑 Admin Panel</h2>
            <p>Welcome, {user?.username}</p>
            <ul>
                <li>
                    <button onClick={() => navigate("/admin/products")}>
                        Manage Products
                    </button>
                </li>
                <li>
                    <button onClick={() => navigate("/admin/orders")}>
                        View All Orders
                    </button>
                </li>
                <li>
                    <button onClick={() => navigate("/admin/users")}>
                        View Users
                    </button>
                </li>
            </ul>
        </div>
    );
}
