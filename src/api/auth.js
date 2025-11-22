import axios from "axios";

export const registerUser = async ({ name, email, password }) => {
  try {
    const res = await axios({
      method: "POST",
      url: "https://multi-vendor-app-ey66.onrender.com/api/auth/register",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    return res.data;
  } catch (err) {
    console.log("REGISTER ERROR:", err?.response?.data || err.message);
    return { error: err?.response?.data?.message || "Registration failed" };
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const res = await axios({
      method: "POST",
      url: "https://multi-vendor-app-ey66.onrender.com/api/auth/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        email,
        password,
      }),
    });

    return res.data;
  } catch (err) {
    console.log("LOGIN ERROR:", err?.response?.data || err.message);
    return { error: err?.response?.data?.message || "Login failed" };
  }
};
