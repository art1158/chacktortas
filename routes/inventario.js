const express = require("express");
const router = express.Router();
const { inventario } = require("../models/inventario");

// proteger rutas
const { authMiddleware, onlyAdmin } = require("../middleware/auth");

// obtener inventario
router.get("/", authMiddleware, (req, res) => {
  res.json(inventario);
});

// agregar producto al inventario (solo admin)
router.post("/agregar", authMiddleware, onlyAdmin, (req, res) => {
  const { nombre, cantidad, precio } = req.body;

  if (!nombre || !cantidad || !precio) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const nuevoProducto = {
    id: inventario.length + 1,
    nombre,
    stock: cantidad,
    precio
  };

  inventario.push(nuevoProducto);

  res.status(201).json({
    mensaje: "Producto agregado al inventario",
    producto: nuevoProducto
  });
});

// actualizar cantidades (solo admin)
router.put("/actualizar/:id", authMiddleware, onlyAdmin, (req, res) => {
  const { id } = req.params;
  const { cantidad } = req.body;

  const producto = inventario.find((p) => p.id === parseInt(id));
  if (!producto) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  producto.cantidad = cantidad;
  res.json({
    mensaje: "Cantidad actualizada",
    producto
  });
});

module.exports = router;
