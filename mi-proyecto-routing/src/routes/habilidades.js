// src/routes/habilidades.js

const express = require("express");

const router = express.Router();

const { habilidades } = require("../data/datosJuego");

// GET /api/habilidades?orden=estamina

router.get("/", (req, res) => {
  const { orden } = req.query;

  let resultado = [...habilidades];

  if (orden === "estamina") {
    resultado.sort((a, b) => b.incremento_estamina - a.incremento_estamina);
  }

  res.status(200).json(resultado);
});

module.exports = router;
