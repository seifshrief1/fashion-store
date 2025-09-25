import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminOverview from "./pages/admin/AdminOverview";
import Shop from "./pages/customer/Shop";
import Cart from "./pages/customer/Cart";
import CheckOut from "./pages/customer/CheckOut";
import About from "./pages/customer/About";
import Contact from "./pages/customer/Contact";
import ProductDetails from "./pages/customer/ProductDetails";
import Home from "./pages/customer/Home";
import Footer from "./components/Footer";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import { useEffect } from "react";
import ProtectedAdminRoute from "./components/ProtectAdminPagesRoute";
import { useCrud } from "./contexts/CrudContext";
import { useCartContext } from "./contexts/CartAndCheckoutContext";

function App() {
  const { user } = useCartContext();
  const navigate = useNavigate();
  const { location } = useCrud();
  useEffect(() => {
    if (!user) return;
    const isAdmin = user.publicMetadata?.role === "admin";
    const isNotAdminPage = !location.pathname.startsWith("/admin");

    if (isAdmin && isNotAdminPage) {
      navigate("/admin/overview");
    }
  }, [user, navigate, location.pathname]);

  return (
    <>
      {!location.pathname.startsWith("/admin") && <Navbar />}
      <Routes>
        {/* admin */}
        <Route
          path="/admin/overview"
          element={
            <ProtectedAdminRoute>
              <AdminOverview />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedAdminRoute>
              <AdminProducts />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedAdminRoute>
              <AdminOrders />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <ProtectedAdminRoute>
              <AdminAnalytics />
            </ProtectedAdminRoute>
          }
        />

        {/* customer */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
      {!location.pathname.startsWith("/admin") && <Footer />}
    </>
  );
}

export default App;
