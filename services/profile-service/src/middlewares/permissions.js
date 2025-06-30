// services/profile-service/src/middlewares/permissions.js
// Middleware de permisos que reutiliza el sistema centralizado del auth-service

/**
 * Middleware to verify if a user has a specific permission
 * Reutiliza la lógica del auth-service
 * @param {string} permission - The permission to verify
 * @returns {Function} Express middleware
 */
export const requirePermission = (permission) => {
  return (req, res, next) => {
    try {
      // Verify that the user is authenticated
      if (!req.user || !req.user.role) {
        return res.status(401).json({
          success: false,
          message: "Usuario no autenticado o rol no definido",
        });
      }

      const userRole = req.user.role;
      
      // Definir permisos específicos para el profile-service
      const ROLE_PERMISSIONS = {
        doctor: {
          canViewAllUsers: true,      // Puede ver todos los perfiles
          canUpdateUsers: false,      // NO puede actualizar otros perfiles
          canDeleteUsers: false,      // NO puede eliminar otros perfiles
          canSearchUsers: true,       // Puede buscar perfiles
        },
        admin: {
          canViewAllUsers: true,      // Puede ver todos los perfiles
          canUpdateUsers: true,       // Admin SÍ puede actualizar otros perfiles
          canDeleteUsers: true,       // Admin SÍ puede eliminar otros perfiles
          canSearchUsers: true,       // Puede buscar perfiles
        },
        patient: {
          canViewAllUsers: false,     // NO puede ver otros perfiles
          canUpdateUsers: false,      // NO puede actualizar otros perfiles
          canDeleteUsers: false,      // NO puede eliminar otros perfiles
          canSearchUsers: false,      // NO puede buscar perfiles
        },
      };

      const rolePermissions = ROLE_PERMISSIONS[userRole];

      // Verify if the role exists
      if (!rolePermissions) {
        return res.status(403).json({
          success: false,
          message: `Rol '${userRole}' no reconocido`,
        });
      }

      // Verify if the user has the required permission
      if (!rolePermissions[permission]) {
        return res.status(403).json({
          success: false,
          message: `Permiso '${permission}' no concedido para el rol '${userRole}'`,
        });
      }

      next();
    } catch (error) {
      console.error("Error en verificación de permisos:", error);
      return res.status(500).json({
        success: false,
        message: "Error interno en verificación de permisos",
      });
    }
  };
};

/**
 * Middleware to verify if user can access a specific profile
 * Users can always access their own profile, but need permissions for others
 * @returns {Function} Express middleware
 */
export const canAccessProfile = () => {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.role) {
        return res.status(401).json({
          success: false,
          message: "Usuario no autenticado o rol no definido",
        });
      }

      const profileId = req.params.id;
      const userId = req.user.id;

      // Users can always access their own profile
      if (profileId === userId) {
        return next();
      }

      // Check if user has permission to view other profiles
      const hasPermission = req.user.role === 'admin' || req.user.role === 'doctor';
      
      if (!hasPermission) {
        return res.status(403).json({
          success: false,
          message: "No tienes permisos para acceder a este perfil",
        });
      }

      next();
    } catch (error) {
      console.error("Error en verificación de acceso al perfil:", error);
      return res.status(500).json({
        success: false,
        message: "Error interno en verificación de acceso",
      });
    }
  };
};

/**
 * Middleware to verify if user can update a specific profile
 * Users can always update their own profile, but need admin permissions for others
 * @returns {Function} Express middleware
 */
export const canUpdateProfile = () => {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.role) {
        return res.status(401).json({
          success: false,
          message: "Usuario no autenticado o rol no definido",
        });
      }

      const profileId = req.params.id;
      const userId = req.user.id;

      // Users can always update their own profile
      if (profileId === userId) {
        return next();
      }

      // Only admin can update other profiles
      if (req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: "Solo los administradores pueden actualizar otros perfiles",
        });
      }

      next();
    } catch (error) {
      console.error("Error en verificación de actualización de perfil:", error);
      return res.status(500).json({
        success: false,
        message: "Error interno en verificación de acceso",
      });
    }
  };
};

/**
 * Middleware to verify if user can delete a specific profile
 * Only admin can delete profiles
 * @returns {Function} Express middleware
 */
export const canDeleteProfile = () => {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.role) {
        return res.status(401).json({
          success: false,
          message: "Usuario no autenticado o rol no definido",
        });
      }

      // Only admin can delete profiles
      if (req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: "Solo los administradores pueden eliminar perfiles",
        });
      }

      next();
    } catch (error) {
      console.error("Error en verificación de eliminación de perfil:", error);
      return res.status(500).json({
        success: false,
        message: "Error interno en verificación de acceso",
      });
    }
  };
}; 