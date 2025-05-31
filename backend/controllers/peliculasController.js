const pool = require('../db'); 

// Obtener todas las películas
const getPeliculas = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM peliculas');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener películas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener película por ID
const getPeliculaById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM peliculas WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Película no encontrada' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener película por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Crear nueva película
const crearPelicula = async (req, res) => {
  const { titulo, descripcion, anio_lanzamiento, duracion_minutos, id_categoria } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO peliculas (titulo, descripcion, anio_lanzamiento, duracion_minutos, id_categoria) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [titulo, descripcion, anio_lanzamiento, duracion_minutos, id_categoria]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear película:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Actualizar película por ID
const actualizarPelicula = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, anio_lanzamiento, duracion_minutos, id_categoria } = req.body;
  try {
    const result = await pool.query(
      'UPDATE peliculas SET titulo = $1, descripcion = $2, anio_lanzamiento = $3, duracion_minutos = $4, id_categoria = $5 WHERE id = $6 RETURNING *',
      [titulo, descripcion, anio_lanzamiento, duracion_minutos, id_categoria, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Película no encontrada para actualizar' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar película:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Eliminar película por ID
const eliminarPelicula = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM peliculas WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Película no encontrada para eliminar' });
    }
    res.json({ message: 'Película eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar película:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = { 
  getPeliculas,
  getPeliculaById,
  crearPelicula,
  actualizarPelicula,
  eliminarPelicula
};
