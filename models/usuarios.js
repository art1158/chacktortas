const usuarios = [
  {
    id: 1,
    username: "admin",
    password: "1234",   // en real lo encriptarías con bcrypt
    rol: "admin"
  },
  {
    id: 2,
    username: "empleado",
    password: "1234",
    rol: "empleado"
  }
];

module.exports = { usuarios };