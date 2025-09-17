// Middleware per rotte non trovate
const notFound = (req, res, next) => {
  res.status(404).json({ error: 'Rotta non trovata' });
};

module.exports = notFound;