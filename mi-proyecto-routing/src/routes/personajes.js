// src/routes/personajes.js

const express = require("express");

const { personajes, habilidades } = require("../data/datosJuego");

const router = express.Router();

// GET /api/personajes?nombre=&tipo=
//Listar personajes
router.get("/", (req, res) => {
    const { nombre, tipo } = req.query;

    let resultado = personajes;

    if (nombre) {
        const n = nombre.toLowerCase();

        resultado = resultado.filter((p) => p.nombre.toLowerCase().includes(n));
    }

    if (tipo) {
        resultado = resultado.filter(
        (p) => p.tipo.toLowerCase() === tipo.toLowerCase(),
        );
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

  const habilidad = habilidades.find((h) => h.id === habilidadId); //Busca la habilidad en la lista de habilidades utilizando el ID de la habilidad proporcionado en la URL.

    if (!habilidad) {
    return res.status(404).json({ error: "Habilidad no encontrada" });
    }
  //Si no se encuentra ninguna habilidad con ese ID, se devuelve un error 404 indicando que la habilidad no fue encontrada.

  res.status(200).json(habilidad); //Si ambos el personaje y la habilidad existen, se devuelve la información de la habilidad con un estado 200.
});

//Modificar Una habilidad PUT
router.put("/:id", (req, res) => {
    const id = Number(req.params.id); //Convierte el ID del personaje a un número para asegurar que la comparación se realice correctamente, ya que los parámetros de la URL son cadenas por defecto.

    const habilidad = habilidades.find((h) => h.id === id); //Busca la habilidad en la lista de habilidades utilizando el ID proporcionado en la URL.

    if (!habilidad) {
    return res.status(404).json({ error: "Habilidad no encontrada" });
    } //Si no se encuentra ninguna habilidad con ese ID, se devuelve un error 404 indicando que la habilidad no fue encontrada.

  // Actualiza los campos
    Object.assign(habilidad, req.body); //Utiliza Object.assign para actualizar los campos de la habilidad con los datos proporcionados en el cuerpo de la solicitud (req.body). Esto permite modificar cualquier campo de la habilidad sin necesidad de especificar cada uno individualmente.

    res.status(200).json(habilidad); //Devuelve la habilidad actualizada con un estado 200.
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
// ========================
// RETO 7 — GET /api/personajes?tipo=
// Obtiene personajes por tipo
// ========================
router.get('/', (req, res) => {
  const { tipo } = req.query;

  let resultado = personajes;

  if (tipo) {
    const tipoLower = tipo.toLowerCase();

    const existe = personajes.some(
      p => p.tipo.toLowerCase() === tipoLower
    );

    if (!existe) {
      return res.status(404).json({
        error: `No existen personajes del tipo '${tipo}'`
      });
    }

    resultado = personajes.filter(
      p => p.tipo.toLowerCase() === tipoLower
    );
  }

  res.status(200).json(resultado);
});

module.exports = router;
