const express = require("express");
const router = express.Router();

const { authMiddleware, onlyAdmin } = require("../middleware/auth");

// Usamos un array simple para productos, con emoji incluido
let productos = [
  { id: 1, nombre: "Coca Cola 🥤", precio: 15 },
  { id: 2, nombre: "Sabritas 🍟", precio: 10 }
];

// Obtener todos los productos
router.get("/", authMiddleware, (req, res) => {
  res.json(productos);
});

// Agregar nuevo producto (solo admin)
router.post("/agregar", authMiddleware, onlyAdmin, (req, res) => {
  const { nombre, precio } = req.body;

  if (!nombre || !precio) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  // Aquí podrías agregar lógica IA para agregar emoji (ejemplo simple abajo)

  const nuevoProducto = {
    id: productos.length + 1,
    nombre: agregarEmoji(nombre),
    precio
  };

  productos.push(nuevoProducto);

  res.status(201).json({
    mensaje: "Producto agregado",
    producto: nuevoProducto
  });
});

// Función simple para agregar emoji basado en palabras clave
function agregarEmoji(nombre) {
  const lower = nombre.toLowerCase();
  if (lower.includes("agua")) return nombre + " 💧";
  if (lower.includes("coca")) return nombre + " 🥤";
  if (lower.includes("galleta")) return nombre + " 🍪";
  if (lower.includes("papas") || lower.includes("sabritas")) return nombre + " 🍟";
  if (lower.includes("cafe")) return nombre + " ☕";
  if (lower.includes("pizza")) return nombre + " 🍕";
  // más reglas aquí si quieres...

  return nombre + " 🛒"; // emoji genérico
}

module.exports = router;
