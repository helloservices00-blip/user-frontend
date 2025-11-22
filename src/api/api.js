import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-1-cqg4.onrender.com",
});

// Attach Token Automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* ===========================
      AUTH
=========================== */
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const getCurrentUser = () => API.get("/auth/me");

/* ===========================
      USERS
=========================== */
export const getUsers = () => API.get("/users");
export const getUser = (id) => API.get(`/users/${id}`);
export const updateUser = (id, data) => API.put(`/users/${id}`, data);
export const deleteUser = (id) => API.delete(`/users/${id}`);

/* ===========================
      PRODUCTS
=========================== */
export const getProducts = () => API.get("/products");
export const getProduct = (id) => API.get(`/products/${id}`);
export const createProduct = (data) => API.post("/products", data);
export const updateProduct = (id, data) => API.put(`/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

// FILTER PRODUCTS
export const filterProducts = (params) => {
  // params example: { category: "Mobiles", minPrice: 100, maxPrice: 5000 }
  return API.get("/products", { params });
};

/* ===========================
      CATEGORIES
=========================== */
export const getCategories = () => API.get("/categories");
export const getCategory = (id) => API.get(`/categories/${id}`);
export const createCategory = (data) => API.post("/categories", data);
export const updateCategory = (id, data) => API.put(`/categories/${id}`, data);
export const deleteCategory = (id) => API.delete(`/categories/${id}`);
export const getProductsByCategory = (catId) =>
  API.get(`/products/category/${catId}`);

/* ===========================
      ORDERS
=========================== */
export const createOrder = (data) => API.post("/orders", data);
export const getOrders = () => API.get("/orders");
export const getOrder = (id) => API.get(`/orders/${id}`);
export const updateOrder = (id, data) => API.put(`/orders/${id}`, data);
export const deleteOrder = (id) => API.delete(`/orders/${id}`);

/* ===========================
      CART
=========================== */
export const getCart = () => API.get("/cart");
export const addToCart = (data) => API.post("/cart", data);
export const updateCartItem = (id, data) => API.put(`/cart/${id}`, data);
export const removeCartItem = (id) => API.delete(`/cart/${id}`);
export const clearCart = () => API.delete("/cart/clear");

/* ===========================
      REVIEWS
=========================== */
export const getReviews = (productId) => API.get(`/reviews/${productId}`);
export const addReview = (productId, data) =>
  API.post(`/reviews/${productId}`, data);
export const deleteReview = (reviewId) => API.delete(`/reviews/${reviewId}`);

/* ===========================
      VENDORS
=========================== */
export const getVendors = () => API.get("/vendors");
export const getVendor = (id) => API.get(`/vendors/${id}`);
export const createVendor = (data) => API.post("/vendors", data);
export const updateVendor = (id, data) => API.put(`/vendors/${id}`, data);
export const deleteVendor = (id) => API.delete(`/vendors/${id}`);

/* ===========================
      SERVICES (OPTIONAL)
=========================== */
export const getServices = () => API.get("/services");
export const getService = (id) => API.get(`/services/${id}`);
export const createService = (data) => API.post("/services", data);
export const updateService = (id, data) => API.put(`/services/${id}`, data);
export const deleteService = (id) => API.delete(`/services/${id}`);

export default API;
