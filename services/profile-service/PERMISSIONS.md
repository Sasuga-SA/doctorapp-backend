# 🔒 Sistema de Permisos - Profile Service

## 📋 Descripción General

El servicio de perfiles implementa un sistema de permisos basado en roles que controla el acceso a diferentes funcionalidades según el tipo de usuario.

## 🏗️ Arquitectura

### ✅ **Sistema Centralizado**
- Los permisos se definen en el **auth-service** (`services/auth-service/src/middlewares/role.permissions.js`)
- El **profile-service** reutiliza la lógica centralizada
- Middleware wrapper específico para lógica de dominio

### ✅ **Middleware de Permisos**
- `services/profile-service/src/middlewares/permissions.js`
- Implementa lógica específica para perfiles
- Reutiliza el sistema centralizado

## 👥 Roles y Permisos

### 👨‍⚕️ **DOCTOR**
```javascript
{
  canViewOwnProfile: true,        // Ver su propio perfil
  canUpdateOwnProfile: true,      // Actualizar su propio perfil
  canViewOtherProfiles: true,     // Ver perfiles de otros
  canViewAllProfiles: true,       // Ver todos los perfiles
  canSearchProfiles: true,        // Buscar perfiles
  canUpdateOtherProfiles: false,  // NO actualizar otros perfiles
  canDeleteOtherProfiles: false,  // NO eliminar otros perfiles
}
```

### 👨‍💼 **ADMIN**
```javascript
{
  canViewOwnProfile: true,        // Ver su propio perfil
  canUpdateOwnProfile: true,      // Actualizar su propio perfil
  canViewOtherProfiles: true,     // Ver perfiles de otros
  canViewAllProfiles: true,       // Ver todos los perfiles
  canSearchProfiles: true,        // Buscar perfiles
  canUpdateOtherProfiles: true,   // Actualizar cualquier perfil
  canDeleteOtherProfiles: true,   // Eliminar cualquier perfil
}
```

### 👤 **PATIENT**
```javascript
{
  canViewOwnProfile: true,        // Ver su propio perfil
  canUpdateOwnProfile: true,      // Actualizar su propio perfil
  canViewOtherProfiles: false,    // NO ver otros perfiles
  canViewAllProfiles: false,      // NO ver todos los perfiles
  canSearchProfiles: false,       // NO buscar perfiles
  canUpdateOtherProfiles: false,  // NO actualizar otros perfiles
  canDeleteOtherProfiles: false,  // NO eliminar otros perfiles
}
```

## 🛡️ Middlewares de Seguridad

### 1. **requirePermission(permission)**
Verifica si el usuario tiene un permiso específico.

```javascript
router.get("/", verifyToken, requirePermission("canViewAllUsers"), ProfileController.getAllProfiles);
```

### 2. **canAccessProfile()**
Permite acceso a perfiles propios, verifica permisos para otros.

```javascript
router.get("/:id", verifyToken, canAccessProfile(), ProfileController.getProfileById);
```

### 3. **canUpdateProfile()**
Permite actualizar perfiles propios, solo admin puede actualizar otros.

```javascript
router.put("/:id", verifyToken, canUpdateProfile(), ProfileController.updateProfileById);
```

### 4. **canDeleteProfile()**
Solo admin puede eliminar perfiles.

```javascript
router.delete("/:id", verifyToken, canDeleteProfile(), ProfileController.deleteProfileById);
```

## 📍 Endpoints y Permisos

| Endpoint | Método | Autenticación | Permisos Requeridos |
|----------|--------|---------------|-------------------|
| `/profiles` | POST | ✅ | Ninguno (crea su propio perfil) |
| `/profiles/me` | GET | ✅ | Ninguno (su propio perfil) |
| `/profiles/me` | PUT | ✅ | Ninguno (su propio perfil) |
| `/profiles/me` | DELETE | ✅ | Ninguno (su propio perfil) |
| `/profiles/:id` | GET | ✅ | `canViewOtherProfiles` o ser el propietario |
| `/profiles/:id` | PUT | ✅ | `canUpdateOtherProfiles` o ser el propietario |
| `/profiles/:id` | DELETE | ✅ | `canDeleteOtherProfiles` (solo admin) |
| `/profiles` | GET | ✅ | `canViewAllUsers` |
| `/profiles/search` | GET | ✅ | `canSearchUsers` |
| `/profiles/upload-picture` | POST | ✅ | Ninguno (su propio perfil) |

## 🔍 Verificaciones de Seguridad

### ✅ **Nivel de Middleware**
- Verificación de token JWT
- Verificación de rol de usuario
- Verificación de permisos específicos

### ✅ **Nivel de Controlador**
- Verificaciones adicionales de seguridad
- Validación de propiedad del recurso
- Manejo de errores específicos

### ✅ **Nivel de Servicio**
- Validación de datos
- Verificación de existencia de recursos
- Lógica de negocio segura

## 🚨 Códigos de Error

| Código | Descripción | Causa |
|--------|-------------|-------|
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Permisos insuficientes |
| 404 | Not Found | Recurso no encontrado |
| 400 | Bad Request | Datos inválidos |
| 500 | Internal Server Error | Error interno del servidor |

## 🧪 Pruebas de Permisos

### ✅ **Casos de Éxito**
- Usuario accede a su propio perfil
- Admin accede a cualquier perfil
- Doctor ve todos los perfiles
- Admin actualiza/elimina perfiles

### ❌ **Casos de Error**
- Usuario sin token
- Token inválido
- Permisos insuficientes
- Acceso a recursos ajenos

## 📝 Ejemplos de Uso

### 🔑 **Obtener Token**
```bash
POST /api/v1/auth/login
{
  "email": "doctor@example.com",
  "password": "password123"
}
```

### 👤 **Acceder a Perfil Propio**
```bash
GET /api/v1/profiles/me
Authorization: Bearer <token>
```

### 👥 **Listar Todos los Perfiles (Doctor/Admin)**
```bash
GET /api/v1/profiles
Authorization: Bearer <token>
```

### 🔍 **Buscar Perfiles (Doctor/Admin)**
```bash
GET /api/v1/profiles/search?q=nombre
Authorization: Bearer <token>
```

### ✏️ **Actualizar Perfil de Otro (Solo Admin)**
```bash
PUT /api/v1/profiles/{id}
Authorization: Bearer <token>
{
  "firstName": "Nuevo Nombre"
}
```

## 🔧 Configuración

### ✅ **Variables de Entorno**
```env
JWT_SECRET=your_jwt_secret_here
```

### ✅ **Dependencias**
- `jsonwebtoken` para verificación de tokens
- Middleware de permisos del auth-service

## 📚 Referencias

- [Auth Service Permissions](../auth-service/src/middlewares/role.permissions.js)
- [Profile Routes](./src/routes/profile.routes.js)
- [Profile Controller](./src/controllers/profile.controller.js)
- [Permissions Middleware](./src/middlewares/permissions.js) 