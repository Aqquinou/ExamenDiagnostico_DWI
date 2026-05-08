const bookModel = require('../models/bookModel');

const isInvalidPayload = ({ title, author, genre, price, stock }) => {
  if (!title || !author || !genre) return true;
  if (price === undefined || stock === undefined) return true;
  if (Number.isNaN(Number(price)) || Number(price) < 0) return true;
  if (!Number.isInteger(Number(stock)) || Number(stock) < 0) return true;
  return false;
};

const getBooks = async (req, res) => {
  try {
    const books = await bookModel.findAll();
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener libros', error: error.message });
  }
};

const createBook = async (req, res) => {
  try {
    if (isInvalidPayload(req.body)) {
      return res.status(400).json({ message: 'Datos invalidos. Verifica los campos obligatorios.' });
    }

    const book = await bookModel.create({
      title: req.body.title.trim(),
      author: req.body.author.trim(),
      genre: req.body.genre.trim(),
      price: Number(req.body.price),
      stock: Number(req.body.stock),
    });

    return res.status(201).json(book);
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear libro', error: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: 'ID invalido' });
    }

    if (isInvalidPayload(req.body)) {
      return res.status(400).json({ message: 'Datos invalidos. Verifica los campos obligatorios.' });
    }

    const existingBook = await bookModel.findById(id);
    if (!existingBook) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    const updatedBook = await bookModel.update(id, {
      title: req.body.title.trim(),
      author: req.body.author.trim(),
      genre: req.body.genre.trim(),
      price: Number(req.body.price),
      stock: Number(req.body.stock),
    });

    return res.status(200).json(updatedBook);
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar libro', error: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: 'ID invalido' });
    }

    const existingBook = await bookModel.findById(id);
    if (!existingBook) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    await bookModel.remove(id);
    return res.status(200).json({ message: 'Libro eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar libro', error: error.message });
  }
};

module.exports = {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
};
