// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error(" ERROR: MONGO_URI no definido en .env");
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => console.log(" MongoDB conectado"))
  .catch((err) => console.error(err));

// Esquema de usuario con rol
const userSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  correo: { type: String, unique: true },
  contraseña: String,
  rol: { type: String, enum: ["user", "admin"], default: "user" }
});

// Forzar la colección a llamarse "tienda_tenis"
const User = mongoose.model("User", userSchema, "tienda_tenis");

// Registro
app.post("/api/register", async (req, res) => {
  try {
    const { nombre, apellido, correo, contraseña, rol } = req.body;
    const existe = await User.findOne({ correo });
    if (existe) return res.status(400).json({ error: "Correo ya registrado" });

    //validacion del formato del correo
    if (!correo || !/\S+@\S+\.\S+/.test(correo)) {
      return res.status(400).json({ error: "Correo inválido" });
    }

    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const nuevoUsuario = new User({
      nombre,
      apellido,
      correo,
      contraseña: hashedPassword,
      rol: rol || "user"
    });

    await nuevoUsuario.save();
    res.json({ message: "Usuario registrado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  try {
    const { correo, contraseña } = req.body;
    const usuario = await User.findOne({ correo });
    if (!usuario) return res.status(400).json({ error: "Usuario no encontrado" });

    const valido = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!valido) return res.status(400).json({ error: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login exitoso", token, rol: usuario.rol });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Backend corriendo en http://localhost:${PORT}`)
);
