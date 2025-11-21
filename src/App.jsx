import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

// Pages
import Home from "./pages/Home.jsx";
import LoginRegister from "./pages/LoginRegister.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import CartPage from "./pages/CartPage.jsx";
import Checkout from "./pages/Checkout.jsx";
import Orders from "./pages/Orders.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import CategoryProducts from "./pages/CategoryProducts.jsx";
import Profile from "./pages/Profile.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import SearchResults from "./pages/SearchResults.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import NotFound from "./pages/NotFound.jsx";

// Context
import { AuthProvider } from "./context/AuthContext.jsx";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Home and Auth */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginRegister />} />

          {/* User pages */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/search" element={<SearchResults />} />

          {/* Orders and Cart */}
          <Route path="/orders" element={<Orders />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* Products */}
          <Route path="/product/:id" element={<ProductDetails />} />

          {/* Categories */}
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/category/:name" element={<CategoryProducts />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminDashboard />} />

          {/* 404 fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
