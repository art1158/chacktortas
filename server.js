const express = require("express");
const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());

// Importar rutas
const ventasRouter = require("./routes/ventas");
const authRouter = require("./routes/auth");
const inventarioRouter = require("./routes/inventario");
const reportesRouter = require("./routes/reportes");
const productosRoutes = require("./routes/productos");
const productosRouter = require("./routes/productos").router;


// Usar rutas
app.use(express.static("public")); // Servir archivos estáticos desde la carpeta "public"
app.use("/ventas", ventasRouter);
app.use("/auth", authRouter);
app.use("/inventario", inventarioRouter);
app.use("/reportes", reportesRouter);
app.use("/productos", productosRoutes.router);
app.use("/productos", productosRouter);

// Ruta raíz
app.get("/", (req, res) => {
  res.send("Bienvenido a la app de ventas");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
