function authMiddleware(req, res, next) {
  // para prototipo rápido
  // leer el user de un header temporal
  const user = req.headers["x-user"];
  const rol = req.headers["x-rol"];

  if (!user || !rol) {
    return res.status(401).json({ error: "No autenticado" });
  }

  req.user = { username: user, rol: rol };
  next();
}

function onlyAdmin(req, res, next) {
  if (req.user.rol !== "admin") {
    return res.status(403).json({ error: "Solo administradores" });
  }
  next();
}

module.exports = { authMiddleware, onlyAdmin };