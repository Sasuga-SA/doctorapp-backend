# Profile Service - Documentación de Rutas

## 📋 Información General

- **Base URL**: `http://localhost:4001/api/v1`
- **Autenticación**: JWT Bearer Token
- **Formato de respuesta**: JSON

## 🔐 Autenticación

Todas las rutas que requieren autenticación necesitan incluir el header:

```
Authorization: Bearer <token>
```

## 📚 Endpoints

### 1. Crear Perfil

**POST** `/profiles`

Crea un nuevo perfil para el usuario autenticado.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "firstName": "Juan",
  "lastName": "Pérez",
  "dateOfBirth": "1990-01-01",
  "gender": "male",
  "phone": "+1234567890",
  "address": "Calle Principal 123",
  "city": "Ciudad",
  "state": "Estado",
  "country": "País",
  "postalCode": "12345",
  "bio": "Médico especialista en cardiología",
  "specialty": "Cardiólogo"
}
```

**Campos requeridos:**
- `firstName` (string, 2-50 caracteres)
- `lastName` (string, 2-50 caracteres)

**Campos opcionales:**
- `dateOfBirth` (string, formato YYYY-MM-DD)
- `gender` (string: "male", "female", "other")
- `phone` (string, formato internacional)
- `address` (string)
- `city` (string, máximo 100 caracteres)
- `state` (string, máximo 100 caracteres)
- `country` (string, máximo 100 caracteres)
- `postalCode` (string, máximo 20 caracteres)
- `bio` (string)
- `specialty` (string, debe ser una de las especialidades válidas)

**Especialidades válidas:**
```
Alergólogo, Anestesiólogo, Cardiólogo, Cirujano cardiovascular, 
Cirujano general, Cirujano maxilofacial, Cirujano plástico, 
Dermatólogo, Endocrinólogo, Fisiatra, Fisioterapeuta, 
Gastroenterólogo, Geriatra, Ginecólogo, Hematólogo, Infectólogo, 
Internista, Médico del deporte, Médico familiar, Médico general, 
Neumólogo, Neurólogo, Nutriólogo, Obstetra, Odontólogo, 
Oftalmólogo, Oncólogo, Ortopedista, Otorrinolaringólogo, 
Patólogo, Pediatra, Podólogo, Psiquiatra, Psicólogo clínico, 
Psicoterapeuta, Radiólogo, Reumatólogo, Sexólogo, 
Terapeuta ocupacional, Traumatólogo, Urólogo
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "firstName": "Juan",
    "lastName": "Pérez",
    "dateOfBirth": "1990-01-01",
    "gender": "male",
    "phone": "+1234567890",
    "address": "Calle Principal 123",
    "city": "Ciudad",
    "state": "Estado",
    "country": "País",
    "postalCode": "12345",
    "bio": "Médico especialista en cardiología",
    "specialty": "Cardiólogo",
    "profilePicture": null,
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Perfil creado exitosamente"
}
```

### 2. Obtener Mi Perfil

**GET** `/profiles/me`

Obtiene el perfil del usuario autenticado.

**Headers:**
```
Authorization: Bearer <token>
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "firstName": "Juan",
    "lastName": "Pérez",
    "dateOfBirth": "1990-01-01",
    "gender": "male",
    "phone": "+1234567890",
    "address": "Calle Principal 123",
    "city": "Ciudad",
    "state": "Estado",
    "country": "País",
    "postalCode": "12345",
    "bio": "Médico especialista en cardiología",
    "specialty": "Cardiólogo",
    "profilePicture": "uploads/profiles/profile-123.jpg",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 3. Obtener Perfil por ID

**GET** `/profiles/:id`

Obtiene un perfil específico por su ID.

**Parámetros:**
- `id` (UUID): ID del perfil

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "firstName": "Juan",
    "lastName": "Pérez",
    "dateOfBirth": "1990-01-01",
    "gender": "male",
    "phone": "+1234567890",
    "address": "Calle Principal 123",
    "city": "Ciudad",
    "state": "Estado",
    "country": "País",
    "postalCode": "12345",
    "bio": "Médico especialista en cardiología",
    "specialty": "Cardiólogo",
    "profilePicture": "uploads/profiles/profile-123.jpg",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 4. Actualizar Mi Perfil

**PUT** `/profiles/me`

Actualiza el perfil del usuario autenticado.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "firstName": "Juan Carlos",
  "lastName": "Pérez García",
  "phone": "+1234567891",
  "bio": "Médico especialista en cardiología con 10 años de experiencia",
  "specialty": "Cardiólogo"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "firstName": "Juan Carlos",
    "lastName": "Pérez García",
    "dateOfBirth": "1990-01-01",
    "gender": "male",
    "phone": "+1234567891",
    "address": "Calle Principal 123",
    "city": "Ciudad",
    "state": "Estado",
    "country": "País",
    "postalCode": "12345",
    "bio": "Médico especialista en cardiología con 10 años de experiencia",
    "specialty": "Cardiólogo",
    "profilePicture": "uploads/profiles/profile-123.jpg",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Perfil actualizado exitosamente"
}
```

### 5. Actualizar Perfil por ID (Admin)

**PUT** `/profiles/:id`

Actualiza un perfil específico por su ID (requiere permisos de administrador).

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Parámetros:**
- `id` (UUID): ID del perfil

**Body:** (mismo formato que actualizar mi perfil)

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    // Datos del perfil actualizado
  },
  "message": "Perfil actualizado exitosamente"
}
```

### 6. Eliminar Mi Perfil

**DELETE** `/profiles/me`

Elimina el perfil del usuario autenticado (soft delete).

**Headers:**
```
Authorization: Bearer <token>
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Perfil eliminado exitosamente"
}
```

### 7. Eliminar Perfil por ID (Admin)

**DELETE** `/profiles/:id`

Elimina un perfil específico por su ID (requiere permisos de administrador).

**Headers:**
```
Authorization: Bearer <token>
```

**Parámetros:**
- `id` (UUID): ID del perfil

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Perfil eliminado exitosamente"
}
```

### 8. Listar Todos los Perfiles

**GET** `/profiles`

Obtiene una lista paginada de todos los perfiles activos.

**Query Parameters:**
- `page` (number, opcional): Número de página (default: 1)
- `limit` (number, opcional): Elementos por página (default: 10)

**Ejemplo:**
```
GET /profiles?page=1&limit=5
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "profiles": [
      {
        "id": "uuid",
        "userId": "uuid",
        "firstName": "Juan",
        "lastName": "Pérez",
        "dateOfBirth": "1990-01-01",
        "gender": "male",
        "phone": "+1234567890",
        "address": "Calle Principal 123",
        "city": "Ciudad",
        "state": "Estado",
        "country": "País",
        "postalCode": "12345",
        "bio": "Médico especialista en cardiología",
        "specialty": "Cardiólogo",
        "profilePicture": "uploads/profiles/profile-123.jpg",
        "isActive": true,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 50,
      "itemsPerPage": 10
    }
  }
}
```

### 9. Buscar Perfiles

**GET** `/profiles/search`

Busca perfiles por nombre (firstName o lastName).

**Query Parameters:**
- `q` (string, requerido): Término de búsqueda
- `page` (number, opcional): Número de página (default: 1)
- `limit` (number, opcional): Elementos por página (default: 10)

**Ejemplo:**
```
GET /profiles/search?q=Juan&page=1&limit=5
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "profiles": [
      // Perfiles que coinciden con la búsqueda
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 2,
      "totalItems": 15,
      "itemsPerPage": 10
    }
  }
}
```

### 10. Subir Foto de Perfil

**POST** `/profiles/upload-picture`

Sube una foto de perfil para el usuario autenticado.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Body:**
- `profilePicture` (file): Imagen de perfil (jpeg, jpg, png, gif, máximo 5MB)

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "firstName": "Juan",
    "lastName": "Pérez",
    "profilePicture": "uploads/profiles/profilePicture-1234567890.jpg",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Perfil actualizado exitosamente"
}
```

### 11. Salud del Servicio

**GET** `/health`

Verifica el estado del servicio.

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Profile Service is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## ❌ Códigos de Error

### 400 - Bad Request
```json
{
  "success": false,
  "message": "Datos inválidos"
}
```

### 401 - Unauthorized
```json
{
  "success": false,
  "message": "Token de acceso requerido"
}
```

### 404 - Not Found
```json
{
  "success": false,
  "message": "Perfil no encontrado"
}
```

### 500 - Internal Server Error
```json
{
  "success": false,
  "message": "Error interno del servidor"
}
```

## 📝 Notas Importantes

1. **Validaciones**: Los campos `firstName` y `lastName` son obligatorios y deben tener entre 2 y 50 caracteres.

2. **Género**: Los valores permitidos son: `male`, `female`, `other`.

3. **Teléfono**: Debe seguir el formato internacional (ej: +1234567890).

4. **Especialidad**: Si se proporciona, debe ser una de las especialidades válidas listadas arriba.

5. **Fotos**: Solo se permiten archivos de imagen (jpeg, jpg, png, gif) con un tamaño máximo de 5MB.

6. **Soft Delete**: Los perfiles eliminados se marcan como inactivos (`isActive: false`) pero no se eliminan físicamente de la base de datos.

7. **Paginación**: Todas las listas incluyen información de paginación para facilitar la navegación.

8. **Búsqueda**: La búsqueda es insensible a mayúsculas/minúsculas y busca tanto en `firstName` como en `lastName`.

## 🔄 Flujo de Integración con Auth Service

### 1. Registro en Auth Service
```bash
POST /auth/register
{
  "email": "alejandro@example.com",
  "password": "password123",
  "role": "doctor"
}
```

### 2. Verificación de Email
```bash
GET /auth/verify-email?token=abc123def456
```

### 3. Login para obtener Token
```bash
POST /auth/login
{
  "email": "alejandro@example.com",
  "password": "password123"
}
```

### 4. Crear Perfil en Profile Service
```bash
POST /profiles
Authorization: Bearer <token>
{
  "firstName": "Dr. Alejandro",
  "lastName": "Sánchez",
  "dateOfBirth": "1985-03-15",
  "gender": "male",
  "phone": "+1234567890",
  "address": "Calle Principal 123",
  "city": "Ciudad de México",
  "state": "CDMX",
  "country": "México",
  "postalCode": "12345",
  "bio": "Médico pediatra con 10 años de experiencia",
  "specialty": "Pediatra"
}
```

## 🧪 Ejemplos de Testing

### Crear Perfil de Doctor
```json
{
  "firstName": "Dr. María",
  "lastName": "González",
  "dateOfBirth": "1980-07-22",
  "gender": "female",
  "phone": "+1234567893",
  "address": "Av. Reforma 456",
  "city": "Guadalajara",
  "state": "Jalisco",
  "country": "México",
  "postalCode": "44100",
  "bio": "Cardióloga especializada en enfermedades del corazón con 15 años de experiencia",
  "specialty": "Cardiólogo"
}
```

### Crear Perfil de Enfermera
```json
{
  "firstName": "Lic. Ana",
  "lastName": "Martínez",
  "dateOfBirth": "1990-11-08",
  "gender": "female",
  "phone": "+1234567894",
  "address": "Calle Juárez 789",
  "city": "Monterrey",
  "state": "Nuevo León",
  "country": "México",
  "postalCode": "64000",
  "bio": "Enfermera especializada en cuidados intensivos y emergencias"
}
``` 