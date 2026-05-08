const BookTable = ({ books, onEdit, onDelete }) => {
  return (
    <section className="panel">
      <h2>Listado de libros</h2>

      {books.length === 0 ? (
        <p className="empty-state">No hay libros registrados aun.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Titulo</th>
                <th>Autor</th>
                <th>Genero</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>${Number(book.price).toFixed(2)}</td>
                  <td>{book.stock}</td>
                  <td className="actions-cell">
                    <button className="btn btn-warning" onClick={() => onEdit(book)}>
                      Editar
                    </button>
                    <button className="btn btn-danger" onClick={() => onDelete(book.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default BookTable;
