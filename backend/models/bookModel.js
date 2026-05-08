const db = require('../config/db');

const findAll = async () => {
  const [rows] = await db.query('SELECT * FROM books ORDER BY id DESC');
  return rows;
};

const findById = async (id) => {
  const [rows] = await db.query('SELECT * FROM books WHERE id = ?', [id]);
  return rows[0];
};

const create = async ({ title, author, genre, price, stock }) => {
  const [result] = await db.query(
    'INSERT INTO books (title, author, genre, price, stock) VALUES (?, ?, ?, ?, ?)',
    [title, author, genre, price, stock]
  );

  return findById(result.insertId);
};

const update = async (id, { title, author, genre, price, stock }) => {
  await db.query(
    'UPDATE books SET title = ?, author = ?, genre = ?, price = ?, stock = ? WHERE id = ?',
    [title, author, genre, price, stock, id]
  );

  return findById(id);
};

const remove = async (id) => {
  const [result] = await db.query('DELETE FROM books WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
