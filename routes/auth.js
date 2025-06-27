const express = require("express");
const router = express.Router();
const { usuarios } = require("../models/usuarios");

// login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = usuarios.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  // muy básico: guardamos en sesión o devolvemos token
  // para prueba rápida, devolvemos el user:
  res.json({
    mensaje: "Login correcto",
    user: {
      id: user.id,
      username: user.username,
      rol: user.rol
    }
  });
});

module.exports = router;
