import axios from "axios";

const API = "https://backend-1-cqg4.onrender.com/api";

// Vendor login token stored in LocalStorage
const getToken = () => localStorage.getItem("vendorToken");

export const vendorLogin = async (data) =>
  axios.post(`${API}/vendor/login`, data);

export const addProduct = async (productData) =>
  axios.post(`${API}/vendor/products/add`, productData, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

export const getMyProducts = async () =>
  axios.get(`${API}/vendor/products/my-products`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
