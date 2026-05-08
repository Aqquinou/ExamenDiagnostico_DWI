import { useEffect, useState } from 'react';

const INITIAL_FORM = {
  title: '',
  author: '',
  genre: '',
  price: '',
  stock: '',
};

const BookForm = ({ onSubmit, editingBook, onCancelEdit }) => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingBook) {
      setFormData({
        title: editingBook.title,
        author: editingBook.author,
        genre: editingBook.genre,
        price: String(editingBook.price),
        stock: String(editingBook.stock),
      });
      setErrors({});
      return;
    }

    setFormData(INITIAL_FORM);
    setErrors({});
  }, [editingBook]);

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'El titulo es obligatorio';
    if (!formData.author.trim()) newErrors.author = 'El autor es obligatorio';
    if (!formData.genre.trim()) newErrors.genre = 'El genero es obligatorio';

    const priceNumber = Number(formData.price);
    if (formData.price === '' || Number.isNaN(priceNumber) || priceNumber < 0) {
      newErrors.price = 'El precio debe ser un numero mayor o igual a 0';
    }

    const stockNumber = Number(formData.stock);
    if (!Number.isInteger(stockNumber) || stockNumber < 0) {
      newErrors.stock = 'El stock debe ser un entero mayor o igual a 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    await onSubmit({
      title: formData.title.trim(),
      author: formData.author.trim(),
      genre: formData.genre.trim(),
      price: Number(formData.price),
      stock: Number(formData.stock),
    });

    if (!editingBook) {
      setFormData(INITIAL_FORM);
      setErrors({});
    }
  };

  return (
    <section className="panel">
      <h2>{editingBook ? 'Editar libro' : 'Registrar nuevo libro'}</h2>

      <form className="book-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="title">Titulo</label>
          <input id="title" name="title" value={formData.title} onChange={handleChange} />
          {errors.title && <span className="field-error">{errors.title}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="author">Autor</label>
          <input id="author" name="author" value={formData.author} onChange={handleChange} />
          {errors.author && <span className="field-error">{errors.author}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="genre">Genero</label>
          <input id="genre" name="genre" value={formData.genre} onChange={handleChange} />
          {errors.genre && <span className="field-error">{errors.genre}</span>}
        </div>

        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="price">Precio</label>
            <input id="price" name="price" type="number" step="0.01" min="0" value={formData.price} onChange={handleChange} />
            {errors.price && <span className="field-error">{errors.price}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="stock">Stock</label>
            <input id="stock" name="stock" type="number" min="0" value={formData.stock} onChange={handleChange} />
            {errors.stock && <span className="field-error">{errors.stock}</span>}
          </div>
        </div>

        <div className="form-actions">
          <button className="btn btn-primary" type="submit">
            {editingBook ? 'Guardar cambios' : 'Registrar libro'}
          </button>

          {editingBook && (
            <button className="btn btn-secondary" type="button" onClick={onCancelEdit}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default BookForm;
