import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PeliculasAdmin = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [nuevaPelicula, setNuevaPelicula] = useState({
    titulo: '',
    descripcion: '',
    anio_lanzamiento: '',
    duracion_minutos: '',
    id_categoria: ''
  });
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  const obtenerPeliculas = async () => {
    try {
      setCargando(true);
      const response = await axios.get('http://localhost:3000/api/peliculas');
      setPeliculas(response.data);
    } catch (error) {
      console.error('Error al obtener películas:', error);
    } finally {
      setCargando(false);
    }
  };

  const agregarPelicula = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/peliculas', nuevaPelicula);
      setMensaje('Película agregada correctamente');
      setNuevaPelicula({
        titulo: '',
        descripcion: '',
        anio_lanzamiento: '',
        duracion_minutos: '',
        id_categoria: ''
      });
      obtenerPeliculas();
    } catch (error) {
      console.error('Error al agregar película:', error);
      setMensaje('Error al agregar película');
    }
  };

  const eliminarPelicula = async (id) => {
    if (!window.confirm('¿Estás seguro que quieres eliminar esta película?')) return;
    try {
      setCargando(true);
      await axios.delete(`http://localhost:3000/api/peliculas/${id}`);
      setMensaje('Película eliminada correctamente');
      obtenerPeliculas();
    } catch (error) {
      console.error('Error al eliminar película:', error);
      setMensaje('Error al eliminar película');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerPeliculas();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Películas</h2>

      {mensaje && <p className="mb-4 text-green-600">{mensaje}</p>}

      <form onSubmit={agregarPelicula} className="mb-6 grid grid-cols-2 gap-2">
        <input
          type="text"
          placeholder="Título"
          value={nuevaPelicula.titulo}
          onChange={(e) => setNuevaPelicula({ ...nuevaPelicula, titulo: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Descripción"
          value={nuevaPelicula.descripcion}
          onChange={(e) => setNuevaPelicula({ ...nuevaPelicula, descripcion: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Año de lanzamiento"
          value={nuevaPelicula.anio_lanzamiento}
          onChange={(e) => setNuevaPelicula({ ...nuevaPelicula, anio_lanzamiento: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Duración (minutos)"
          value={nuevaPelicula.duracion_minutos}
          onChange={(e) => setNuevaPelicula({ ...nuevaPelicula, duracion_minutos: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="ID Categoría"
          value={nuevaPelicula.id_categoria}
          onChange={(e) => setNuevaPelicula({ ...nuevaPelicula, id_categoria: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Agregar</button>
      </form>

      {cargando ? (
        <p>Cargando...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">Título</th>
              <th className="border px-2 py-1">Descripción</th>
              <th className="border px-2 py-1">Año</th>
              <th className="border px-2 py-1">Duración</th>
              <th className="border px-2 py-1">ID Categoría</th>
              <th className="border px-2 py-1">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {peliculas.map((pelicula) => (
              <tr key={pelicula.id}>
                <td className="border px-2 py-1">{pelicula.id}</td>
                <td className="border px-2 py-1">{pelicula.titulo}</td>
                <td className="border px-2 py-1">{pelicula.descripcion}</td>
                <td className="border px-2 py-1">{pelicula.anio_lanzamiento}</td>
                <td className="border px-2 py-1">{pelicula.duracion_minutos}</td>
                <td className="border px-2 py-1">{pelicula.id_categoria}</td>
                <td className="border px-2 py-1">
                  <button
                    onClick={() => eliminarPelicula(pelicula.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PeliculasAdmin;
