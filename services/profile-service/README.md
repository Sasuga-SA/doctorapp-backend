# Profile Service

Microservicio para la gestión de perfiles de usuarios en la aplicación DoctorApp.

## 🚀 Características

- ✅ CRUD completo de perfiles de usuario
- ✅ Subida de fotos de perfil
- ✅ Búsqueda de perfiles por nombre
- ✅ Paginación de resultados
- ✅ Autenticación JWT
- ✅ Validación de datos
- ✅ Documentación con Swagger
- ✅ Soft delete para perfiles

## 📋 Requisitos

- Node.js 18+
- PostgreSQL
- Redis (opcional, para cache)

## 🛠️ Instalación

1. **Clonar el repositorio**
```bash
cd services/profile-service
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```

Editar el archivo `.env` con tus configuraciones:
```env
# Servidor
PORT=4001
NODE_ENV=development

# Base de datos
DB_HOST=localhost
DB_PORT=5432
DB_NAME=doctorapp_profiles
DB_USER=postgres
DB_PASSWORD=password

# JWT
JWT_SECRET=your_jwt_secret_key

# CORS
CORS_ORIGIN=http://localhost:3000
```

4. **Ejecutar migraciones**
```bash
npm run migrate
```

5. **Iniciar el servicio**
```bash
# Desarrollo
npm run dev

# Producción
npm start
```

## 📚 API Endpoints

### Perfiles

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| POST | `/api/v1/profiles` | Crear perfil | ✅ |
| GET | `/api/v1/profiles/me` | Obtener mi perfil | ✅ |
| GET | `/api/v1/profiles/:id` | Obtener perfil por ID | ❌ |
| PUT | `/api/v1/profiles/me` | Actualizar mi perfil | ✅ |
| PUT | `/api/v1/profiles/:id` | Actualizar perfil por ID | ✅ |
| DELETE | `/api/v1/profiles/me` | Eliminar mi perfil | ✅ |
| DELETE | `/api/v1/profiles/:id` | Eliminar perfil por ID | ✅ |
| GET | `/api/v1/profiles` | Listar todos los perfiles | ❌ |
| GET | `/api/v1/profiles/search` | Buscar perfiles | ❌ |
| POST | `/api/v1/profiles/upload-picture` | Subir foto de perfil | ✅ |

### Salud del servicio

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/v1/health` | Estado del servicio |

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Iniciar con nodemon

# Producción
npm start            # Iniciar servidor

# Testing
npm test             # Ejecutar tests

# Base de datos
npm run migrate      # Ejecutar migraciones
npm run seed         # Ejecutar seeders

# Linting
npm run lint         # Verificar código
npm run lint:fix     # Corregir código automáticamente

# Formateo
npm run format       # Formatear código
npm run format:check # Verificar formato
```

## 🗄️ Modelo de Datos

### Profile

```javascript
{
  id: UUID (PK),
  userId: UUID (FK -> users.id),
  firstName: STRING(50),
  lastName: STRING(50),
  dateOfBirth: DATE,
  gender: ENUM('male', 'female', 'other'),
  phone: STRING(20),
  address: TEXT,
  city: STRING(100),
  state: STRING(100),
  country: STRING(100),
  postalCode: STRING(20),
  profilePicture: STRING(255),
  bio: TEXT,
  isActive: BOOLEAN,
  createdAt: DATE,
  updatedAt: DATE
}
```

## 🔐 Autenticación

El servicio utiliza JWT para autenticación. Incluye el token en el header:

```
Authorization: Bearer <token>
```

## 📁 Estructura del Proyecto

```
src/
├── config/
│   ├── database.js      # Configuración de base de datos
│   └── swagger.js       # Configuración de Swagger
├── controllers/
│   └── profile.controller.js  # Controladores de perfiles
├── middlewares/
│   ├── verify.jwt.js    # Middleware de autenticación
│   └── upload.middleware.js   # Middleware de subida de archivos
├── models/
│   ├── index.js         # Índice de modelos
│   └── profile.model.js # Modelo de perfil
├── routes/
│   ├── index.js         # Rutas principales
│   └── profile.routes.js # Rutas de perfiles
├── services/
│   └── profile.service.js # Lógica de negocio
├── utils/               # Utilidades
├── app.js              # Configuración de Express
└── server.js           # Punto de entrada
```

## 🐳 Docker

### Construir imagen
```bash
docker build -t profile-service .
```

### Ejecutar contenedor
```bash
docker run -p 4001:4001 profile-service
```

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests con coverage
npm run test:coverage
```

## 📝 Documentación

La documentación de la API está disponible en:
- **Swagger UI**: `http://localhost:4001/docs` (cuando esté habilitado)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

## 🆘 Soporte

Si tienes alguna pregunta o problema, por favor abre un issue en el repositorio. 