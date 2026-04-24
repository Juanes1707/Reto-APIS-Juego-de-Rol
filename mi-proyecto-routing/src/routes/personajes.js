// src/routes/personajes.js

const express = require("express");

const { personajes, habilidades } = require("../data/datosJuego");

const router = express.Router();

// GET /api/personajes?nombre=&tipo= //Listar personajes y filtrar personajes por tipo
router.get("/", (req, res) => {
    const { nombre, tipo } = req.query;

    let resultado = personajes;

    if (nombre) {
    const n = nombre.toLowerCase();
    resultado = resultado.filter(p =>
        p.nombre.toLowerCase().includes(n)
    );
}

    if (tipo) {
        const tipoLower = tipo.toLowerCase();

        resultado = resultado.filter(p =>
        p.tipo.toLowerCase() === tipoLower
    );

    if (resultado.length === 0) {
        return res.status(404).json({
        error: `No existen personajes del tipo '${tipo}'`
        });
    }
    }

    res.status(200).json(resultado);
});

// GET /api/personajes/:id

router.get("/:id", (req, res) => {
    const id = Number(req.params.id);

    const personaje = personajes.find((p) => p.id === id);

    if (!personaje) {
        return res.status(404).json({ error: "Personaje no encontrado" });
    }

    res.status(200).json(personaje);
});

// POST /api/personajes //Crear un nuevo personaje

router.post("/", (req, res) => {
    const nuevo = { id: personajes.length + 1, ...req.body };

    personajes.push(nuevo);

    res.status(201).json(nuevo);
});

// GET /api/personajes/:id/habilidades — ruta jerárquica

router.get("/:id/habilidades", (req, res) => {
    const id = Number(req.params.id);

    const personaje = personajes.find((p) => p.id === id);

    if (!personaje) {
        return res.status(404).json({ error: "Personaje no encontrado" });
    }

    const suyas = habilidades.filter((h) => personaje.habilidades.includes(h.id));

    res.status(200).json(suyas);
});

//Obtener una habilidad específica de un personaje por medio de su ID

router.get("/:id/habilidades/:habilidadId", (req, res) => {
  //Se define la ruta con dos parámetros: el ID del personaje y el ID de la habilidad. Esto permite acceder a una habilidad específica de un personaje.
    const id = Number(req.params.id);
    const habilidadId = Number(req.params.habilidadId);
  //Contienen la lógica para buscar el personaje y la habilidad correspondiente. Primero, se busca el personaje por su ID. Si no se encuentra, se devuelve un error 404. Luego, se busca la habilidad por su ID. Si tampoco se encuentra, se devuelve otro error 404. Si ambos existen, se devuelve la información de la habilidad con un estado 200. Además los convierte a números para asegurar que la comparación se realice correctamente, ya que los parámetros de la URL son cadenas por defecto.

  const personaje = personajes.find((p) => p.id === id); // Busca el personaje en la lista de personajes utilizando el ID proporcionado en la URL.

    if (!personaje) {
    return res.status(404).json({ error: "Personaje no encontrado" });
    }
  //Si no se encuentra ningún personaje con ese ID, se devuelve un error 404 indicando que el personaje no fue encontrado.

  const habilidad = habilidades.find((h) => h.id === habilidadId && personaje.habilidades.includes(h.id)
); //Busca la habilidad en la lista de habilidades utilizando el ID de la habilidad proporcionado en la URL.

    if (!habilidad) {
    return res.status(404).json({ error: "Habilidad no encontrada" });
    }
  //Si no se encuentra ninguna habilidad con ese ID, se devuelve un error 404 indicando que la habilidad no fue encontrada.

  res.status(200).json(habilidad); //Si ambos el personaje y la habilidad existen, se devuelve la información de la habilidad con un estado 200.
});


// ========================
// RETO 5 — DELETE /api/personajes/:id
// Elimina un personaje por su id
// ========================
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id); // convierte el string del URL a número

  const index = personajes.findIndex(p => p.id === id); // busca la posición en el array

  if (index === -1) {
    // Si findIndex devuelve -1, el personaje no existe
    return res.status(404).json({ error: 'Personaje no encontrado' });
  }

  personajes.splice(index, 1); // elimina 1 elemento en esa posición
  res.status(204).send();       // 204: éxito sin body
});

module.exports = router;
