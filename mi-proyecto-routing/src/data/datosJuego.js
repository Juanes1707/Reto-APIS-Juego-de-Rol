// src/data/datosJuego.js

const habilidades = [

{

id: 1,

nombre: 'Espadazo',

descripcion: 'Un ataque poderoso con la espada.',

incremento_ataque: 10,

incremento_defensa: 0,

incremento_estamina: -5,

},

{

id: 2,

nombre: 'Escudo de Hierro',

descripcion: 'Aumenta la defensa del guerrero.',

incremento_ataque: 0,

incremento_defensa: 15,

incremento_estamina: -3,

},

// Agrega al menos 4 habilidades más.

];


const personajes = [

{

id: 1,

nombre: 'Gagh-Ar',

tipo: 'guerrero',

descripcion: 'Un valiente luchador con gran fuerza física.',

ataque: 80, defensa: 70, estamina: 60,

habilidades: [1, 2],

},

{

id: 2,

nombre: 'Elyra',

tipo: 'maga',

descripcion: 'Hechicera con gran dominio de la energía mágica.',

ataque: 65, defensa: 40, estamina: 90,

habilidades: [2],

},

// Agrega al menos 4 personajes más.

];


module.exports = { personajes, habilidades };