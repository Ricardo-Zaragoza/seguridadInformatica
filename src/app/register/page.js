"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  // Actualiza los datos del formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
  // VAMOS A HACER QUE LA CONTRASEÑA SIGA EL FORMATO TRADICIONAL DE 1 MAYUSCULA,
    // 1 MINUSCULA, 1 NUMERO  1 UN CARACTER ESPECIAL y tamaño maximo de 15
    const formatocontraseña = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{8,15}$/;
  // vamos a agregar una validacion para la longitud de la contraseña
    if(!passwordPattern.test(formData.password)) {
      setMessage("La contraseña debe de tener un minimo de 8 caracteres")
    }

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formData.nombre,
          apellido: formData.apellido,
          correo: formData.correo,
          contraseña: formData.password, // coincide con el backend
          rol: "user" // rol por defecto
        })
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Usuario registrado correctamente");
        setFormData({ nombre: "", apellido: "", correo: "", password: "" });
      } else {
        setMessage(data.error || "Error al registrar");
      }
    } catch (err) {
      setMessage("❌ Error de conexión con el servidor");
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-green-700">
          Crear cuenta
        </h2>
        <p className="text-center text-gray-600 mt-2 mb-6">
          Regístrate para acceder a la tienda
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Nombre */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              placeholder="Tu nombre"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          {/* Apellido */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Apellido
            </label>
            <input
              type="text"
              name="apellido"
              placeholder="Tu apellido"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </div>

          {/* Correo */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              name="correo"
              placeholder="ejemplo@email.com"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </div>

          {/* Contraseña */}
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

          {/* Botón */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Registrarse
          </button>
        </form>

        {message && (
          <p className="text-center text-sm text-red-500 mt-2">{message}</p>
        )}

        <p className="text-center text-sm text-gray-600 mt-4">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-green-600 font-medium hover:underline">
            Inicia sesión
          </a>
        </p>
      </div>
    </main>
  );
}
