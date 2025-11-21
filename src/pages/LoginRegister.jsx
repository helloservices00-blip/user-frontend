import React, { useState, useContext } from "react";
import { loginUser, registerUser } from "../api/api.js";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const res = await loginUser({ email, password });

        setUser(res.data.user);
        setToken(res.data.token);

        localStorage.setItem("token", res.data.token);

        navigate("/");
      } else {
        const res = await registerUser({
          name,
          email,
          password,
          role: "customer"   // ⭐ REQUIRED FOR BACKEND
        });

        alert("Registered successfully! Now login.");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Auth failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{isLogin ? "Login" : "Register"}</h1>

      <form onSubmit={handleSubmit} className="space-y-3 bg-white p-4 rounded shadow">
        {!isLogin && (
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full"
            placeholder="Full name"
          />
        )}

        <input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full"
          placeholder="Email"
        />

        <input
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full"
          type="password"
          placeholder="Password"
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <div className="text-center mt-3">
        <button className="text-blue-600" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Create an account" : "Have an account? Login"}
        </button>
      </div>
    </div>
  );
}
