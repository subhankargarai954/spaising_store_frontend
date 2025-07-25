import { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({
        name: "",
        price: "",
        stock: "",
        description: "",
        image_url: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        const u = JSON.parse(localStorage.getItem("user"));
        if (!u?.is_admin) navigate("/");
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const res = await API.get("admin/products/");
        setProducts(res.data);
    };

    const handleEdit = (p) => {
        setEditing(p.id);
        setForm({ ...p });
    };

    const handleDelete = async (id) => {
        await API.delete(`admin/products/${id}/`);
        loadProducts();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editing) {
            await API.put(`admin/products/${editing}/`, form);
        } else {
            await API.post("admin/products/", form);
        }
        setEditing(null);
        setForm({
            name: "",
            price: "",
            stock: "",
            description: "",
            image_url: "",
        });
        loadProducts();
    };

    return (
        <div>
            <h2>📦 Admin Product Management</h2>

            <form onSubmit={handleSubmit}>
                <input
                    value={form.name}
                    placeholder="Name"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                    value={form.price}
                    placeholder="Price"
                    onChange={(e) =>
                        setForm({ ...form, price: e.target.value })
                    }
                />
                <input
                    value={form.stock}
                    placeholder="Stock"
                    onChange={(e) =>
                        setForm({ ...form, stock: e.target.value })
                    }
                />
                <input
                    value={form.image_url}
                    placeholder="Image URL"
                    onChange={(e) =>
                        setForm({ ...form, image_url: e.target.value })
                    }
                />
                <textarea
                    value={form.description}
                    placeholder="Description"
                    onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                    }
                />
                <button type="submit">
                    {editing ? "Update" : "Add"} Product
                </button>
            </form>

            <hr />

            {products.map((p) => (
                <div
                    key={p.id}
                    style={{
                        border: "1px solid #ccc",
                        margin: "1rem",
                        padding: "1rem",
                    }}
                >
                    <h3>
                        {p.name} (₹{p.price})
                    </h3>
                    <p>{p.description}</p>
                    <p>Stock: {p.stock}</p>
                    <img src={p.image_url} alt={p.name} width={100} />
                    <br />
                    <button onClick={() => handleEdit(p)}>✏️ Edit</button>
                    <button onClick={() => handleDelete(p.id)}>🗑 Delete</button>
                </div>
            ))}
        </div>
    );
}
