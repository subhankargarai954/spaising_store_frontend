import { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const u = JSON.parse(localStorage.getItem("user"));
        if (!u?.is_admin) navigate("/");
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const res = await API.get("admin/users/");
        setUsers(res.data);
    };

    return (
        <div>
            <h2>👥 Admin - All Users</h2>
            {users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            <b>{user.username}</b> — {user.email}{" "}
                            {user.is_admin && "(Admin)"}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
