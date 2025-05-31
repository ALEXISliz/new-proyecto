// backend/db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', // o tu usuario real
  host: 'localhost',
  database: 'peliculas_db', // cambia por tu base
  password: 'alexis8987',
  port: 5432,
});

module.exports = pool;
