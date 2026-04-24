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

// GET /api/habilidades/:id
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const habilidad = habilidades.find((h) => h.id === id);

    if (!habilidad) {
    return res.status(404).json({ error: "Habilidad no encontrada" });
    }

    res.status(200).json(habilidad);
});

// PUT /api/habilidades/:id
router.put("/:id", (req, res) => {
    const id = Number(req.params.id);
    const habilidad = habilidades.find((h) => h.id === id);

    if (!habilidad) {
    return res.status(404).json({ error: "Habilidad no encontrada" });
    }

    Object.assign(habilidad, req.body);

    res.status(200).json(habilidad);
});

// DELETE /api/habilidades/:id
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = habilidades.findIndex((h) => h.id === id);

    if (index === -1) {
    return res.status(404).json({ error: "Habilidad no encontrada" });
    }

    habilidades.splice(index, 1);

    res.status(204).send();
});

// ========================
// RETO 8 — GET /api/habilidades?orden=estamina
// Obtiene habilidades ordenadas por estamina de mayor a menor
// ========================
router.get('/', (req, res) => {
  const { orden } = req.query;

  let resultado = [...habilidades]; // Copia el array para no modificar el original

  // Validar que solo se permita "estamina"
  if (orden && orden !== 'estamina') {
    return res.status(400).json({
      error: "El único valor permitido para 'orden' es 'estamina'"
    });
  }

  // Ordenar si viene correctamente
  if (orden === 'estamina') {
    resultado.sort((a, b) => b.incremento_estamina - a.incremento_estamina);
  }

  res.status(200).json(resultado);
});

module.exports = router;