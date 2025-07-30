import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import OrderHistory from "./pages/OrderHistory";
import Navbar from "./components/Navbar";

import { lazy, Suspense } from "react";

const AdminPanel = lazy(() => import("./pages/admin/AdminPanel"));
const AdminProducts = lazy(() => import("./pages/admin/AdminProducts"));
const AdminOrders = lazy(() => import("./pages/admin/AdminOrders"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/orders" element={<OrderHistory />} />
                <Route
                    path="/admin"
                    element={
                        <Suspense fallback={<p>Loading Admin Panel...</p>}>
                            <AdminPanel />
                        </Suspense>
                    }
                />
                <Route
                    path="/admin/products"
                    element={
                        <Suspense fallback="...">
                            <AdminProducts />
                        </Suspense>
                    }
                />
                <Route
                    path="/admin/orders"
                    element={
                        <Suspense fallback="...">
                            <AdminOrders />
                        </Suspense>
                    }
                />
                <Route
                    path="/admin/users"
                    element={
                        <Suspense fallback="...">
                            <AdminUsers />
                        </Suspense>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
