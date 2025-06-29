# Sistema de Permisos por Rol

Este documento describe el sistema de permisos implementado en el servicio de autenticación.

## Roles Disponibles

### 1. Doctor
El rol principal del sistema con permisos para:
- Ver y actualizar su perfil
- Ver pacientes
- Crear, ver, actualizar y eliminar citas
- Ver y actualizar registros médicos
- Prescribir medicamentos
- Ver y actualizar horarios
- Ver reportes y exportar datos

### 2. Admin (Futuro)
Rol de administrador con permisos completos:
- Todos los permisos del doctor
- Gestión completa de usuarios
- Acceso a todos los datos del sistema
- Gestión del sistema

### 3. Patient (Futuro)
Rol de paciente con permisos limitados:
- Ver y actualizar su perfil
- Ver y crear sus propias citas
- Cancelar sus citas
- Ver sus registros médicos y prescripciones

## Permisos Disponibles

### Permisos Básicos
- `canViewProfile`: Ver perfil del usuario
- `canUpdateProfile`: Actualizar perfil del usuario

### Permisos de Pacientes
- `canViewPatients`: Ver lista de pacientes
- `canViewOwnPatients`: Ver pacientes propios (para futuras implementaciones)

### Permisos de Citas
- `canCreateAppointments`: Crear citas
- `canViewAppointments`: Ver citas
- `canUpdateAppointments`: Actualizar citas
- `canDeleteAppointments`: Eliminar citas
- `canViewOwnAppointments`: Ver citas propias
- `canCancelAppointments`: Cancelar citas

### Permisos Médicos
- `canViewMedicalRecords`: Ver registros médicos
- `canUpdateMedicalRecords`: Actualizar registros médicos
- `canViewOwnMedicalRecords`: Ver registros médicos propios
- `canPrescribeMedication`: Prescribir medicamentos
- `canViewOwnPrescriptions`: Ver prescripciones propias

### Permisos de Horarios
- `canViewSchedule`: Ver horarios
- `canUpdateSchedule`: Actualizar horarios

### Permisos Administrativos
- `canViewReports`: Ver reportes
- `canExportData`: Exportar datos
- `canViewAllUsers`: Ver todos los usuarios
- `canCreateUsers`: Crear usuarios
- `canUpdateUsers`: Actualizar usuarios
- `canDeleteUsers`: Eliminar usuarios
- `canManageSystem`: Gestionar el sistema

## Uso en Rutas

### Middleware de Permisos

```javascript
import { requirePermission, requireAnyPermission, requireAllPermissions } from "../middlewares/role.permissions.js";

// Requerir un permiso específico
router.get("/patients", verifyJWT, requirePermission("canViewPatients"), getPatients);

// Requerir al menos uno de varios permisos
router.get("/reports", verifyJWT, requireAnyPermission(["canViewReports", "canManageSystem"]), getReports);

// Requerir todos los permisos especificados
router.post("/medical-records", verifyJWT, requireAllPermissions(["canViewMedicalRecords", "canUpdateMedicalRecords"]), createMedicalRecord);
```

### Ejemplos de Uso

```javascript
// Ruta que requiere permiso para ver perfil
router.get("/profile", verifyJWT, requirePermission("canViewProfile"), getProfile);

// Ruta que requiere permiso para ver pacientes
router.get("/patients", verifyJWT, requirePermission("canViewPatients"), getPatients);

// Ruta que requiere permiso para crear citas
router.post("/appointments", verifyJWT, requirePermission("canCreateAppointments"), createAppointment);
```

## Endpoints de Permisos

### GET /permissions/my-permissions
Obtiene los permisos del usuario autenticado.

**Respuesta:**
```json
{
  "role": "doctor",
  "permissions": {
    "canViewProfile": true,
    "canUpdateProfile": true,
    "canViewPatients": true,
    // ... otros permisos
  },
  "availableRoles": ["doctor", "admin", "patient"]
}
```

### GET /permissions/check/:permission
Verifica si el usuario tiene un permiso específico.

**Respuesta:**
```json
{
  "role": "doctor",
  "permission": "canViewPatients",
  "hasPermission": true
}
```

### GET /permissions/user-info
Obtiene información completa del usuario incluyendo permisos.

**Respuesta:**
```json
{
  "user": {
    "id": "uuid",
    "firstName": "Alejandro",
    "lastName": "Sanchez",
    "email": "alejandro@example.com",
    "role": "doctor",
    "permissions": {
      // ... todos los permisos del rol
    }
  }
}
```

### GET /permissions/all-roles
Obtiene todos los roles y sus permisos (solo para administradores).

## Funciones Utilitarias

### getRolePermissions(role)
Obtiene todos los permisos de un rol específico.

```javascript
import { getRolePermissions } from "../middlewares/role.permissions.js";

const doctorPermissions = getRolePermissions("doctor");
```

### hasPermission(role, permission)
Verifica si un rol tiene un permiso específico.

```javascript
import { hasPermission } from "../middlewares/role.permissions.js";

const canViewPatients = hasPermission("doctor", "canViewPatients"); // true
```

## Agregar Nuevos Permisos

Para agregar nuevos permisos:

1. **Actualizar ROLE_PERMISSIONS** en `middlewares/role.permissions.js`:
```javascript
const ROLE_PERMISSIONS = {
  doctor: {
    // ... permisos existentes
    canNewPermission: true, // nuevo permiso
  },
  // ... otros roles
};
```

2. **Usar en las rutas**:
```javascript
router.get("/new-endpoint", verifyJWT, requirePermission("canNewPermission"), controller);
```

## Agregar Nuevos Roles

Para agregar nuevos roles:

1. **Agregar el rol a ROLE_PERMISSIONS**:
```javascript
const ROLE_PERMISSIONS = {
  // ... roles existentes
  nurse: {
    canViewProfile: true,
    canUpdateProfile: true,
    canViewPatients: true,
    canViewMedicalRecords: true,
    // ... otros permisos específicos del enfermero
  }
};
```

2. **Actualizar el modelo de usuario** si es necesario para incluir el nuevo rol como opción válida.

## Seguridad

- Todos los endpoints de permisos requieren autenticación JWT
- Los permisos se verifican en cada request
- Los errores de permisos devuelven códigos HTTP apropiados (401, 403)
- Los permisos se validan tanto en el middleware como en los controladores 