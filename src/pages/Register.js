import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("register/", form);
            alert("Registered successfully!");
            navigate("/login");
        } catch (err) {
            if (err.response?.data) {
                const errorData = err.response.data;
                let msg = "";
                for (let key in errorData) {
                    msg += `${key}: ${errorData[key]}\n`;
                }
                alert("Registration failed:\n" + msg);
            } else {
                alert("Something went wrong");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input
                placeholder="Username"
                onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
            <input
                placeholder="Email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button type="submit">Register</button>
        </form>
    );
}
