const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const { errorHandler } = require("./middleware/errorHandler");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


require("dotenv").config();

const app = express();

// Middlewares essentiels
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));




// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connecté à MongoDB");

    // Routes
    app.use("/api/owners", require("./routes/ownerRoutes"));
    app.use("/api/pets", require("./routes/petRoutes"));
    app.use("/api/visits", require("./routes/visitRoutes"));
    app.use("/api/veterinarians", require("./routes/veterinarianRoutes"));

    // Gestion des erreurs
    app.use(errorHandler);

    // Démarrage serveur
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Serveur prêt sur http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ Échec connexion MongoDB:", err.message);
    process.exit(1);
  });
