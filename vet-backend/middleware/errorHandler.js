const errorHandler = (err, req, res, next) => {
  // Erreur de format d'ID
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "ID invalide",
      details: `Format attendu : 24 caractères hexadécimaux (ex: "65a1b2c3d4e5f6a7b8c9d0e1")`
    });
  }

  // Erreur de validation Mongoose
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Erreur de validation des données",
      errors: Object.values(err.errors).map(e => e.message)
    });
  }

  // Erreur de duplication (ex: nom unique)
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(400).json({
      success: false,
      message: `Le ${field} existe déjà`,
      field: field
    });
  }

  // Erreur générique
  res.status(500).json({
    success: false,
    message: "Une erreur serveur est survenue",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
};

module.exports = { errorHandler };