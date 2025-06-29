// services/auth-service/src/middlewares/role.permissions.js
// Role permissions definition
const ROLE_PERMISSIONS = {
  doctor: {
    // Basic doctor permissions
    canViewProfile: true,
    canUpdateProfile: true,
    canViewPatients: true,
    canCreateAppointments: true,
    canViewAppointments: true,
    canUpdateAppointments: true,
    canDeleteAppointments: true,
    canViewMedicalRecords: true,
    canUpdateMedicalRecords: true,
    canPrescribeMedication: true,
    canViewSchedule: true,
    canUpdateSchedule: true,
    // Limited administrative permissions
    canViewReports: true,
    canExportData: true,
  },
  admin: {
    // Administrator permissions (for future implementations)
    canViewProfile: true,
    canUpdateProfile: true,
    canViewAllUsers: true,
    canCreateUsers: true,
    canUpdateUsers: true,
    canDeleteUsers: true,
    canViewAllPatients: true,
    canViewAllAppointments: true,
    canViewAllMedicalRecords: true,
    canViewReports: true,
    canExportData: true,
    canManageSystem: true,
  },
  patient: {
    // Patient permissions (for future implementations)
    canViewProfile: true,
    canUpdateProfile: true,
    canViewOwnAppointments: true,
    canCreateAppointments: true,
    canCancelAppointments: true,
    canViewOwnMedicalRecords: true,
    canViewOwnPrescriptions: true,
  },
};

/**
 * Middleware to verify if a user has a specific permission
 * @param {string} permission - The permission to verify
 * @returns {Function} Express middleware
 */
export const requirePermission = (permission) => {
  return (req, res, next) => {
    try {
      // Verify that the user is authenticated
      if (!req.user || !req.user.role) {
        return res.status(401).json({
          error: "User not authenticated or role not defined",
        });
      }

      const userRole = req.user.role;
      const rolePermissions = ROLE_PERMISSIONS[userRole];

      // Verify if the role exists
      if (!rolePermissions) {
        return res.status(403).json({
          error: `Role '${userRole}' not recognized`,
        });
      }

      // Verify if the user has the required permission
      if (!rolePermissions[permission]) {
        return res.status(403).json({
          error: `Permission '${permission}' not granted for role '${userRole}'`,
        });
      }

      next();
    } catch (error) {
      console.error("Error in permission verification:", error);
      return res.status(500).json({
        error: "Internal error in permission verification",
      });
    }
  };
};

/**
 * Middleware to verify if a user has at least one of the specified permissions
 * @param {string[]} permissions - Array of permissions to verify
 * @returns {Function} Express middleware
 */
export const requireAnyPermission = (permissions) => {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.role) {
        return res.status(401).json({
          error: "User not authenticated or role not defined",
        });
      }

      const userRole = req.user.role;
      const rolePermissions = ROLE_PERMISSIONS[userRole];

      if (!rolePermissions) {
        return res.status(403).json({
          error: `Role '${userRole}' not recognized`,
        });
      }

      // Verify if the user has at least one of the permissions
      const hasAnyPermission = permissions.some(
        (permission) => rolePermissions[permission],
      );

      if (!hasAnyPermission) {
        return res.status(403).json({
          error: `At least one of the following permissions is required: ${permissions.join(", ")}`,
        });
      }

      next();
    } catch (error) {
      console.error("Error in permission verification:", error);
      return res.status(500).json({
        error: "Internal error in permission verification",
      });
    }
  };
};

/**
 * Middleware to verify if a user has all the specified permissions
 * @param {string[]} permissions - Array of permissions to verify
 * @returns {Function} Express middleware
 */
export const requireAllPermissions = (permissions) => {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.role) {
        return res.status(401).json({
          error: "User not authenticated or role not defined",
        });
      }

      const userRole = req.user.role;
      const rolePermissions = ROLE_PERMISSIONS[userRole];

      if (!rolePermissions) {
        return res.status(403).json({
          error: `Role '${userRole}' not recognized`,
        });
      }

      // Verify if the user has all the permissions
      const hasAllPermissions = permissions.every(
        (permission) => rolePermissions[permission],
      );

      if (!hasAllPermissions) {
        return res.status(403).json({
          error: `All the following permissions are required: ${permissions.join(", ")}`,
        });
      }

      next();
    } catch (error) {
      console.error("Error in permission verification:", error);
      return res.status(500).json({
        error: "Internal error in permission verification",
      });
    }
  };
};

/**
 * Function to get permissions for a specific role
 * @param {string} role - The user's role
 * @returns {Object} Object with the role's permissions
 */
export const getRolePermissions = (role) => {
  return ROLE_PERMISSIONS[role] || {};
};

/**
 * Function to verify if a role has a specific permission
 * @param {string} role - The user's role
 * @param {string} permission - The permission to verify
 * @returns {boolean} True if it has the permission, false otherwise
 */
export const hasPermission = (role, permission) => {
  const rolePermissions = ROLE_PERMISSIONS[role];
  return rolePermissions ? rolePermissions[permission] : false;
};

// Export permissions for use in other files
export { ROLE_PERMISSIONS };
