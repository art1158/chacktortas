const fs = require("fs");
const path = require("path");

const ventasFile = path.join(__dirname, "ventas.json");

let ventas = [];

// Cargar ventas guardadas al iniciar
try {
  const data = fs.readFileSync(ventasFile, "utf-8");
  ventas = JSON.parse(data);
} catch (e) {
  ventas = [];
}

// Función para guardar ventas al archivo
function guardarVentas() {
  fs.writeFileSync(ventasFile, JSON.stringify(ventas, null, 2));
}

module.exports = { ventas, guardarVentas };
