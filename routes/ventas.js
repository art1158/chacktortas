const express = require("express");
const router = express.Router();
const { ventas } = require("../models/venta");

// POST /ventas -> Crear una nueva venta
router.post("/", (req, res) => {
    const { productos, total, vendedor } = req.body;

    if (!productos || !total || !vendedor) {
        return res.status(400).json({ error: "Faltan datos requeridos" });
    }

    const nuevaVenta = {
        id: ventas.length + 1,
        fecha: new Date(),
        productos,
        total,
        vendedor
    };

    ventas.push(nuevaVenta);

    res.status(201).json({
        mensaje: "Venta creada exitosamente",
        venta: nuevaVenta
    });
});

// GET /ventas -> Obtener todas las ventas
router.get("/", (req, res) => {
    res.json(ventas);
});

module.exports = router;
