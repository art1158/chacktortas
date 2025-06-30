const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const productosPath = path.join(__dirname, "../data/productos.json");

let productos = [];

function cargarProductos() {
  try {
    const data = fs.readFileSync(productosPath, "utf-8");
    productos = JSON.parse(data);
  } catch {
    productos = [];
  }
}

function guardarProductos() {
  fs.writeFileSync(productosPath, JSON.stringify(productos, null, 2));
}

cargarProductos();

router.get("/", (req, res) => {
  res.json(productos);
});

// Rutas para agregar producto y demás aquí...


module.exports = { router, productos, cargarProductos, guardarProductos };
