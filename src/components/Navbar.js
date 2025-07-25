import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <nav
            style={{
                display: "flex",
                gap: "1rem",
                padding: "1rem",
                background: "#eee",
            }}
        >
            <button onClick={() => navigate("/")}>🏠 Home</button>
            <button onClick={() => navigate("/cart")}>🛒 Cart</button>
            <button onClick={() => navigate("/orders")}>📦 My Orders</button>

            {user?.is_admin && (
                <button onClick={() => navigate("/admin")}>👑 Admin</button>
            )}

            {user ? (
                <button onClick={logout}>🚪 Logout ({user.username})</button>
            ) : (
                <>
                    <button onClick={() => navigate("/login")}>Login</button>
                    <button onClick={() => navigate("/register")}>
                        Register
                    </button>
                </>
            )}
        </nav>
    );
}
