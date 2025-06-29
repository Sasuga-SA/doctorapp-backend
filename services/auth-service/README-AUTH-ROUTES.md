# Rutas de Autenticación - Auth Service

## Resumen

Este documento describe todas las rutas de autenticación disponibles en el servicio de autenticación. Las rutas están organizadas en dos categorías: **rutas públicas** (sin autenticación) y **rutas protegidas** (requieren autenticación y permisos).

## Estructura de Rutas

### Rutas Públicas (Sin Autenticación)
Estas rutas no requieren token JWT y están disponibles para todos los usuarios:

### Rutas Protegidas (Con Autenticación)
Estas rutas requieren token JWT válido y pueden requerir permisos específicos.

## Endpoints Detallados

### 🔓 Rutas Públicas

#### 1. POST `/auth/register/`
**Registrar un nuevo usuario**

**Descripción:** Crea una nueva cuenta de usuario en el sistema.

**Middleware aplicado:**
- `validateRegisterUser` - Valida los datos de registro

**Body (JSON):**
```json
{
  "firstName": "Alejandro",
  "lastName": "Sanchez",
  "email": "alejandro@example.com",
  "password": "password123",
  "role": "doctor"
}
```

**Respuesta exitosa (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "firstName": "Alejandro",
    "lastName": "Sanchez",
    "email": "alejandro@example.com",
    "role": "doctor",
    "isVerified": false
  }
}
```

**Respuesta de error (400):**
```json
{
  "error": "Email already exists"
}
```

---

#### 2. POST `/auth/login`
**Iniciar sesión**

**Descripción:** Autentica un usuario y devuelve un token JWT.

**Middleware aplicado:**
- `rateLimiter` - Limita intentos de login

**Body (JSON):**
```json
{
  "email": "alejandro@example.com",
  "password": "password123"
}
```

**Respuesta exitosa (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Respuesta de error (401):**
```json
{
  "error": "Invalid credentials"
}
```

---

#### 3. GET `/auth/verify-email`
**Verificar email**

**Descripción:** Verifica la cuenta de usuario usando un token enviado por email.

**Query Parameters:**
- `token` (string, requerido) - Token de verificación

**URL de ejemplo:**
```
GET /auth/verify-email?token=abc123def456
```

**Respuesta exitosa (200):**
```json
{
  "message": "Account verified, you can now log in!"
}
```

**Respuesta de error (400):**
```json
{
  "message": "Invalid or expired token"
}
```

---

#### 4. POST `/auth/forgot-password`
**Solicitar restablecimiento de contraseña**

**Descripción:** Envía un email con un enlace para restablecer la contraseña.

**Body (JSON):**
```json
{
  "email": "alejandro@example.com"
}
```

**Respuesta exitosa (200):**
```json
{
  "message": "If the email exists, a link will be sent."
}
```

**Respuesta en desarrollo (200):**
```json
{
  "message": "If the email exists, a link will be sent.",
  "resetToken": "abc123def456"
}
```

---

#### 5. POST `/auth/reset-password`
**Restablecer contraseña**

**Descripción:** Cambia la contraseña usando un token de restablecimiento.

**Body (JSON):**
```json
{
  "token": "abc123def456",
  "password": "newpassword123"
}
```

**Respuesta exitosa (200):**
```json
{
  "message": "Password updated. Please log in."
}
```

**Respuesta de error (400):**
```json
{
  "message": "Invalid or expired token"
}
```

---

### 🔒 Rutas Protegidas

#### 6. GET `/auth/profile`
**Obtener perfil del usuario**

**Descripción:** Obtiene la información del perfil del usuario autenticado.

**Middleware aplicado:**
- `verifyJWT` - Verifica token JWT
- `requirePermission("canViewProfile")` - Requiere permiso para ver perfil

**Headers requeridos:**
```
Authorization: Bearer <token>
```

**Respuesta exitosa (200):**
```json
{
  "user": {
    "id": "uuid",
    "firstName": "Alejandro",
    "lastName": "Sanchez",
    "email": "alejandro@example.com",
    "role": "doctor",
    "isVerified": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Respuesta de error (401):**
```json
{
  "error": "Invalid token or ID not present"
}
```

**Respuesta de error (403):**
```json
{
  "error": "Insufficient permissions"
}
```

## Middlewares Utilizados

### Autenticación
- **`verifyJWT`**: Verifica que el token JWT sea válido y extrae la información del usuario

### Validación
- **`validateRegisterUser`**: Valida los datos de registro (email, contraseña, etc.)

### Seguridad
- **`rateLimiter`**: Limita el número de intentos de login para prevenir ataques de fuerza bruta

### Permisos
- **`requirePermission("canViewProfile")`**: Verifica que el usuario tenga permiso para ver su perfil

## Códigos de Estado HTTP

### Éxito
- **200**: Operación exitosa
- **201**: Recurso creado exitosamente

### Errores del Cliente
- **400**: Datos incorrectos o incompletos
- **401**: No autenticado o token inválido
- **403**: Sin permisos suficientes
- **404**: Recurso no encontrado

### Errores del Servidor
- **500**: Error interno del servidor

## Ejemplos de Uso

### Registro de Usuario
```bash
curl -X POST http://localhost:3000/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Alejandro",
    "lastName": "Sanchez",
    "email": "alejandro@example.com",
    "password": "password123",
    "role": "doctor"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alejandro@example.com",
    "password": "password123"
  }'
```

### Obtener Perfil (Protegido)
```bash
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Verificar Email
```bash
curl -X GET "http://localhost:3000/auth/verify-email?token=abc123def456"
```

### Solicitar Restablecimiento de Contraseña
```bash
curl -X POST http://localhost:3000/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alejandro@example.com"
  }'
```

### Restablecer Contraseña
```bash
curl -X POST http://localhost:3000/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "token": "abc123def456",
    "password": "newpassword123"
  }'
```

## Flujo de Autenticación Completo

### 1. Registro
1. Usuario se registra con `POST /auth/register/`
2. Sistema envía email de verificación
3. Usuario verifica email con `GET /auth/verify-email`

### 2. Login
1. Usuario inicia sesión con `POST /auth/login`
2. Sistema devuelve token JWT
3. Usuario usa token para acceder a rutas protegidas

### 3. Acceso a Recursos
1. Usuario incluye token en header `Authorization`
2. Middleware `verifyJWT` valida el token
3. Middleware de permisos verifica acceso
4. Controlador procesa la solicitud

### 4. Recuperación de Contraseña
1. Usuario solicita restablecimiento con `POST /auth/forgot-password`
2. Sistema envía email con token
3. Usuario restablece contraseña con `POST /auth/reset-password`

## Seguridad

### ✅ Implementado
- Validación de datos de entrada
- Rate limiting en login
- Tokens JWT seguros
- Verificación de email
- Restablecimiento seguro de contraseñas
- Middleware de permisos
- Manejo de errores apropiado

### 🔒 Características de Seguridad
- Contraseñas hasheadas con bcrypt
- Tokens de verificación con expiración
- Rate limiting para prevenir ataques
- Validación de permisos por rol
- Respuestas genéricas para evitar enumeration

## Próximos Pasos

### Funcionalidades Futuras
- [ ] Refresh tokens
- [ ] Logout con invalidación de token
- [ ] Cambio de contraseña para usuarios autenticados
- [ ] Autenticación de dos factores (2FA)
- [ ] Historial de sesiones
- [ ] Bloqueo de cuenta por intentos fallidos

### Mejoras de Seguridad
- [ ] Auditoría de login/logout
- [ ] Detección de actividad sospechosa
- [ ] Notificaciones de login desde nuevos dispositivos
- [ ] Política de contraseñas más estricta 