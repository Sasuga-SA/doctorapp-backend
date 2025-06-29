# Sistema de Permisos por Rol - Auth Service

## Resumen

Se ha implementado un sistema completo de permisos por rol en el servicio de autenticación. El sistema permite controlar el acceso a diferentes funcionalidades basándose en el rol del usuario autenticado.

## Características Implementadas

### ✅ Middleware de Permisos
- **`requirePermission(permission)`**: Verifica un permiso específico
- **`requireAnyPermission(permissions)`**: Verifica al menos uno de varios permisos
- **`requireAllPermissions(permissions)`**: Verifica todos los permisos especificados

### ✅ Roles Definidos
- **`doctor`**: Rol principal con permisos médicos completos
- **`admin`**: Rol de administrador con permisos del sistema
- **`patient`**: Rol de paciente con permisos limitados

### ✅ Endpoints de Permisos
- **`GET /permissions/my-permissions`**: Obtiene permisos del usuario
- **`GET /permissions/check/:permission`**: Verifica un permiso específico
- **`GET /permissions/user-info`**: Información completa del usuario con permisos
- **`GET /permissions/all-roles`**: Todos los roles (solo admin)

### ✅ Funciones Utilitarias
- **`getRolePermissions(role)`**: Obtiene permisos de un rol
- **`hasPermission(role, permission)`**: Verifica si un rol tiene un permiso

## Archivos Creados/Modificados

### Nuevos Archivos
- `src/middlewares/role.permissions.js` - Sistema principal de permisos
- `src/controllers/permissions.controller.js` - Controladores de permisos
- `src/routes/permissions.routes.js` - Rutas de permisos
- `src/examples/permissions-examples.js` - Ejemplos de uso
- `test/permissions.test.js` - Pruebas unitarias
- `PERMISSIONS.md` - Documentación completa
- `README-PERMISSIONS.md` - Este archivo

### Archivos Modificados
- `src/routes/auth.routes.js` - Agregado middleware de permisos
- `src/routes/index.js` - Incluidas rutas de permisos

## Uso Inmediato

### 1. Verificar Permisos en Rutas Existentes
La ruta `/auth/profile` ahora requiere el permiso `canViewProfile`:

```javascript
router.get("/profile", verifyJWT, requirePermission("canViewProfile"), getProfile);
```

### 2. Nuevos Endpoints Disponibles
```bash
# Obtener permisos del usuario actual
GET /permissions/my-permissions
Authorization: Bearer <token>

# Verificar un permiso específico
GET /permissions/check/canViewPatients
Authorization: Bearer <token>

# Información completa del usuario
GET /permissions/user-info
Authorization: Bearer <token>
```

### 3. Ejemplos de Respuestas

**GET /permissions/my-permissions**
```json
{
  "role": "doctor",
  "permissions": {
    "canViewProfile": true,
    "canUpdateProfile": true,
    "canViewPatients": true,
    "canCreateAppointments": true,
    "canViewAppointments": true,
    "canUpdateAppointments": true,
    "canDeleteAppointments": true,
    "canViewMedicalRecords": true,
    "canUpdateMedicalRecords": true,
    "canPrescribeMedication": true,
    "canViewSchedule": true,
    "canUpdateSchedule": true,
    "canViewReports": true,
    "canExportData": true
  },
  "availableRoles": ["doctor", "admin", "patient"]
}
```

## Permisos del Rol Doctor

El rol `doctor` tiene los siguientes permisos habilitados:

### Permisos Básicos
- ✅ `canViewProfile` - Ver perfil
- ✅ `canUpdateProfile` - Actualizar perfil

### Permisos de Pacientes
- ✅ `canViewPatients` - Ver lista de pacientes

### Permisos de Citas
- ✅ `canCreateAppointments` - Crear citas
- ✅ `canViewAppointments` - Ver citas
- ✅ `canUpdateAppointments` - Actualizar citas
- ✅ `canDeleteAppointments` - Eliminar citas

### Permisos Médicos
- ✅ `canViewMedicalRecords` - Ver registros médicos
- ✅ `canUpdateMedicalRecords` - Actualizar registros médicos
- ✅ `canPrescribeMedication` - Prescribir medicamentos

### Permisos de Horarios
- ✅ `canViewSchedule` - Ver horarios
- ✅ `canUpdateSchedule` - Actualizar horarios

### Permisos Administrativos
- ✅ `canViewReports` - Ver reportes
- ✅ `canExportData` - Exportar datos

### Permisos NO Disponibles
- ❌ `canManageSystem` - Gestionar sistema
- ❌ `canViewAllUsers` - Ver todos los usuarios
- ❌ `canCreateUsers` - Crear usuarios

## Próximos Pasos

### 1. Implementar en Otros Microservicios
El sistema está diseñado para ser fácilmente extensible a otros microservicios:

```javascript
// En otro microservicio
import { requirePermission } from "auth-service/middlewares/role.permissions.js";

router.get("/patients", verifyJWT, requirePermission("canViewPatients"), getPatients);
```

### 2. Agregar Nuevos Roles
Para agregar un nuevo rol (ej: enfermero):

```javascript
// En role.permissions.js
const ROLE_PERMISSIONS = {
  // ... roles existentes
  nurse: {
    canViewProfile: true,
    canUpdateProfile: true,
    canViewPatients: true,
    canViewMedicalRecords: true,
    canViewAppointments: true,
    // ... otros permisos específicos
  }
};
```

### 3. Agregar Nuevos Permisos
Para agregar un nuevo permiso:

```javascript
// En role.permissions.js
const ROLE_PERMISSIONS = {
  doctor: {
    // ... permisos existentes
    canNewPermission: true,
  }
};

// En las rutas
router.get("/new-endpoint", verifyJWT, requirePermission("canNewPermission"), controller);
```

## Pruebas

Ejecutar las pruebas del sistema de permisos:

```bash
cd services/auth-service
npm test permissions.test.js
```

## Seguridad

- ✅ Todos los endpoints requieren autenticación JWT
- ✅ Los permisos se verifican en cada request
- ✅ Manejo de errores apropiado (401, 403)
- ✅ Validación de roles y permisos
- ✅ Documentación completa de permisos

## Compatibilidad

El sistema es completamente compatible con el código existente y no rompe ninguna funcionalidad actual. Solo agrega una capa adicional de seguridad y control de acceso. 