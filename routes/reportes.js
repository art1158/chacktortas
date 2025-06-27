const express = require("express");
const router = express.Router();
const { ventas } = require("../models/venta");

const { authMiddleware, onlyAdmin } = require("../middleware/auth");

// Función para filtrar ventas por rango de fechas
function filtrarVentasPorFecha(inicio, fin) {
  return ventas.filter((venta) => {
    const fechaVenta = new Date(venta.fecha);
    return fechaVenta >= inicio && fechaVenta <= fin;
  });
}

// GET /reportes?periodo=diario|semanal|mensual
router.get("/", authMiddleware, onlyAdmin, (req, res) => {
  const { periodo } = req.query;

  if (!periodo) {
    return res.status(400).json({ error: "Debe especificar el periodo (diario, semanal, mensual)" });
  }

  const ahora = new Date();
  let inicio, fin;

  switch (periodo) {
    case "diario":
      inicio = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());
      fin = new Date(inicio);
      fin.setDate(fin.getDate() + 1);
      break;

    case "semanal":
      // Primer día de la semana (domingo)
      const diaSemana = ahora.getDay();
      inicio = new Date(ahora);
      inicio.setDate(ahora.getDate() - diaSemana);
      inicio.setHours(0, 0, 0, 0);
      fin = new Date(inicio);
      fin.setDate(fin.getDate() + 7);
      break;

    case "mensual":
      inicio = new Date(ahora.getFullYear(), ahora.getMonth(), 1);
      fin = new Date(ahora.getFullYear(), ahora.getMonth() + 1, 1);
      break;

    default:
      return res.status(400).json({ error: "Periodo inválido. Use diario, semanal o mensual" });
  }

  const ventasFiltradas = filtrarVentasPorFecha(inicio, fin);

  // Total de ventas (suma de totales)
  const totalVentas = ventasFiltradas.reduce((acc, venta) => acc + venta.total, 0);

  res.json({
    periodo,
    totalVentas,
    cantidadVentas: ventasFiltradas.length,
    ventas: ventasFiltradas,
  });
});

module.exports = router;
