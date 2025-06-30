const express = require("express");
const router = express.Router();
const { ventas, guardarVentas } = require("../models/venta");
const { productos, guardarProductos } = require("./productos");

// POST /ventas
router.post("/", (req, res) => {
  const { productos: productosVendidos, total, vendedor } = req.body;

  if (!productosVendidos || !total || !vendedor) {
    return res.status(400).json({ error: "Faltan datos requeridos" });
  }

  const faltantes = [];

  productosVendidos.forEach(item => {
    const p = productos.find(prod => prod.id === item.id);
    if (!p) {
      faltantes.push(`Producto con id ${item.id} no existe`);
    } else if (p.stock < item.cantidad) {
      faltantes.push(`${p.nombre} sin stock suficiente (quedan ${p.stock})`);
    }
  });

  if (faltantes.length > 0) {
    return res.status(400).json({ error: `Error: ${faltantes.join(", ")}` });
  }

  // Descontar inventario
  productosVendidos.forEach(item => {
    const p = productos.find(prod => prod.id === item.id);
    p.stock -= item.cantidad;
  });

  // Guardar cambios en archivo
  guardarProductos();

  const nuevaVenta = {
    id: ventas.length + 1,
    fecha: new Date(),
    productos: productosVendidos,
    total,
    vendedor
  };

  ventas.push(nuevaVenta);
  guardarVentas();

  res.status(201).json({
    mensaje: "Venta creada exitosamente",
    venta: nuevaVenta
  });
});

router.get("/", (req, res) => {
  res.json(ventas);
});

module.exports = router;
