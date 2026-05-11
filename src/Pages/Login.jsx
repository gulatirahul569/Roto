import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Components/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { name, email, password } = formData;

        if (!name || !email || !password) {
            alert("Please fill all fields");
            return;
        }

        // LOGIN USER
        login({
            name,
            email,
        });

        navigate("/main");
    };

    return (
        <div
            className="min-h-screen flex justify-center items-center bg-cover bg-center relative"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFzaGlvbiUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D')",
            }}
        >

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* LOGIN BOX */}
            <form
                onSubmit={handleSubmit}
                className="relative z-10 w-95 p-8 rounded-2xl
      bg-white/15 backdrop-blur-md border border-white/20
      shadow-2xl"
            >

                <h2 className="text-4xl font-bold text-center mb-8 text-white">
                    Login
                </h2>

                {/* NAME */}
                <div className="mb-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg
          bg-white/20 text-white placeholder:text-white/70
          border border-white/30 outline-none"
                    />
                </div>

                {/* EMAIL */}
                <div className="mb-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg
          bg-white/20 text-white placeholder:text-white/70
          border border-white/30 outline-none"
                    />
                </div>

                {/* PASSWORD */}
                <div className="mb-6">
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg
          bg-white/20 text-white placeholder:text-white/70
          border border-white/30 outline-none"
                    />
                </div>

                {/* BUTTON */}
                <button
                    type="submit"
                    className="w-full bg-white text-black py-3 rounded-lg
        font-semibold hover:bg-zinc-200 transition"
                >
                    Login
                </button>

            </form>
        </div>
    );
};

export default Login;