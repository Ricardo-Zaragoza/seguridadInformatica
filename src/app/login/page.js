"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [formData, setFormData] = useState({ correo: "", password: "" });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correo: formData.correo,
          contraseña: formData.password
        })
      });

      const data = await res.json();

      if (res.ok) {
        // Guardar token y rol en localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.rol);

        setMessage("Login exitoso");

        // Redirigir según rol
        if (data.rol === "admin") {
          router.push("/admin-dashboard");
        } else {
          router.push("/");
        }
      } else {
        setMessage(data.error || "Error al iniciar sesión");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error de conexión con el servidor");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-green-700">
          Iniciar Sesión
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              name="correo"
              placeholder="ejemplo@gmail.com"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              placeholder="********"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Entrar
          </button>
        </form>

        {message && (
          <p className="text-center text-sm text-red-500 mt-2">{message}</p>
        )}

        <div className="text-center mt-4 text-sm text-gray-600">
          <p className="mt-2">
            ¿No tienes cuenta?{" "}
            <a href="/register" className="text-green-600 font-medium hover:underline">
              Regístrate
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
