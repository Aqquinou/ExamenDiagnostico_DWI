# Sistema de Gestion de Libros - CRUD Web

Aplicacion web completa para administrar libros con operaciones CRUD (crear, consultar, editar y eliminar). El proyecto esta dividido en frontend y backend para mantener una arquitectura profesional, clara y facil de explicar.

## Tecnologias utilizadas

### Frontend
- React + Vite
- Axios
- CSS moderno

### Backend
- Node.js
- Express
- MySQL
- CORS + Dotenv

### Base de datos
- MySQL

## Funcionalidades

- Registro de libros con validaciones
- Listado de libros en tabla
- Edicion de libros existentes
- Eliminacion de libros con confirmacion
- Mensajes visuales de exito y error
- API REST con rutas CRUD (`GET`, `POST`, `PUT`, `DELETE`)
- Manejo basico de errores en backend
- Datos de ejemplo precargados por SQL

## Estructura del proyecto

```bash
Examen Diagnostico/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── bookController.js
│   ├── models/
│   │   └── bookModel.js
│   ├── routes/
│   │   └── bookRoutes.js
│   ├── sql/
│   │   └── schema.sql
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AlertMessage.jsx
│   │   │   ├── BookForm.jsx
│   │   │   └── BookTable.jsx
│   │   ├── pages/
│   │   │   └── BooksPage.jsx
│   │   ├── services/
│   │   │   └── bookService.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## Base de datos (MySQL)

Ejecuta el archivo SQL incluido:

- Ruta: `backend/sql/schema.sql`

Este script crea:
- Base de datos: `library_db`
- Tabla: `books`
- Campos principales:
  - `id`
  - `title`
  - `author`
  - `genre`
  - `price`
  - `stock`
- 3 registros de ejemplo

## Instalacion y ejecucion

### 1) Clonar/abrir proyecto
Ubicate en la carpeta raiz del proyecto.

### 2) Configurar MySQL
1. Asegurate de tener MySQL ejecutandose.
2. Ejecuta `backend/sql/schema.sql` en tu gestor SQL (MySQL Workbench, DBeaver o consola).

### 3) Configurar variables de entorno (backend)
En la carpeta `backend`:

1. Copia `.env.example` a `.env`
2. Ajusta tus credenciales:

```env
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=library_db
DB_PORT=3306
```

### 4) Instalar dependencias

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### 5) Ejecutar backend
Desde `backend`:

```bash
npm run dev
```

API disponible en:
- `http://localhost:4000`
- CRUD de libros: `http://localhost:4000/api/books`

### 6) Ejecutar frontend
Desde `frontend`:

```bash
npm run dev
```

Abre en navegador la URL que muestre Vite.

## Endpoints de la API

- `GET /api/books` -> obtener todos los libros
- `POST /api/books` -> crear un libro
- `PUT /api/books/:id` -> actualizar un libro
- `DELETE /api/books/:id` -> eliminar un libro

### Ejemplo de payload (POST/PUT)

```json
{
  "title": "Habitos Atomicos",
  "author": "James Clear",
  "genre": "Desarrollo personal",
  "price": 320.5,
  "stock": 12
}
```

## Explicacion breve de cada parte

- `backend/config/db.js`: configura la conexion pool a MySQL.
- `backend/models/bookModel.js`: concentra las consultas SQL CRUD.
- `backend/controllers/bookController.js`: valida datos y maneja la logica HTTP.
- `backend/routes/bookRoutes.js`: define las rutas REST para libros.
- `backend/server.js`: inicializa Express, middlewares y API.
- `frontend/src/services/bookService.js`: consumo de API con axios.
- `frontend/src/components/BookForm.jsx`: formulario con validaciones y modo edicion.
- `frontend/src/components/BookTable.jsx`: tabla para visualizar, editar y eliminar.
- `frontend/src/pages/BooksPage.jsx`: orquesta estado, carga de datos y alertas.

## Uso de IA

Se utilizo IA como apoyo para:
- Definir una estructura de proyecto modular y profesional.
- Mejorar el estilo visual.

## Buenas practicas aplicadas

- Separacion por capas en backend (rutas/controladores/modelos/config).
- Componentizacion en frontend.
- Nombres claros en variables y funciones.
- Validaciones basicas tanto en frontend como backend.
- Manejo basico de errores para evitar caidas de la aplicacion.

