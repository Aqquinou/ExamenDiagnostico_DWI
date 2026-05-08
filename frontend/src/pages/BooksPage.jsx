import { useEffect, useState } from 'react';
import AlertMessage from '../components/AlertMessage';
import BookForm from '../components/BookForm';
import BookTable from '../components/BookTable';
import {
  createBook,
  deleteBook,
  getBooks,
  updateBook,
} from '../services/bookService';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ type: 'success', message: '' });

  const showAlert = (type, message) => {
    setAlert({ type, message });
    window.setTimeout(() => {
      setAlert((prev) => (prev.message === message ? { ...prev, message: '' } : prev));
    }, 3000);
  };

  const loadBooks = async () => {
    try {
      setLoading(true);
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      showAlert('error', error.response?.data?.message || 'No se pudieron cargar los libros');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleSubmit = async (payload) => {
    try {
      if (editingBook) {
        await updateBook(editingBook.id, payload);
        showAlert('success', 'Libro actualizado correctamente');
        setEditingBook(null);
      } else {
        await createBook(payload);
        showAlert('success', 'Libro registrado correctamente');
      }

      await loadBooks();
    } catch (error) {
      showAlert('error', error.response?.data?.message || 'Ocurrio un error al guardar');
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Estas seguro de eliminar este libro?');
    if (!confirmed) return;

    try {
      await deleteBook(id);
      showAlert('success', 'Libro eliminado correctamente');
      await loadBooks();
    } catch (error) {
      showAlert('error', error.response?.data?.message || 'No se pudo eliminar el libro');
    }
  };

  return (
    <main className="container">
      <header className="page-header">
        <h1>Sistema de Gestion de Libros</h1>
        <p>CRUD completo con React, Node.js, Express y MySQL.</p>
      </header>

      <AlertMessage type={alert.type} message={alert.message} />

      <BookForm onSubmit={handleSubmit} editingBook={editingBook} onCancelEdit={() => setEditingBook(null)} />

      {loading ? (
        <section className="panel">
          <p className="empty-state">Cargando libros...</p>
        </section>
      ) : (
        <BookTable books={books} onEdit={setEditingBook} onDelete={handleDelete} />
      )}
    </main>
  );
};

export default BooksPage;
