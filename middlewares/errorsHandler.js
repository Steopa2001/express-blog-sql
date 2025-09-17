// Middleware per errori interni del server
const errorsHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
};

module.exports = errorsHandler;