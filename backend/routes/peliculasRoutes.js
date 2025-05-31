const express = require('express');
const router = express.Router();
const {
  getPeliculas,
  getPeliculaById,
  crearPelicula,
  actualizarPelicula,
  eliminarPelicula
} = require('../controllers/peliculasController');

// Obtener todas las películas
router.get('/peliculas', getPeliculas);

// Obtener película por ID
router.get('/peliculas/:id', getPeliculaById);

// Crear nueva película
router.post('/peliculas', crearPelicula);

// Actualizar película por ID
router.put('/peliculas/:id', actualizarPelicula);

// Eliminar película por ID
router.delete('/peliculas/:id', eliminarPelicula);

module.exports = router;

