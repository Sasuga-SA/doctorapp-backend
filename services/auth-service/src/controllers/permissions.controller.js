import {
  getRolePermissions,
  hasPermission,
  ROLE_PERMISSIONS,
} from "../middlewares/role.permissions.js";
import { getUserProfileService } from "../services/auth.service.js";

/**
 * Gets the permissions of the authenticated user
 */
export const getUserPermissions = async (req, res) => {
  try {
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        error: "User not authenticated or role not defined",
      });
    }
    console.log("Entre Permissions");
    const userRole = req.user.role;
    const permissions = getRolePermissions(userRole);
    console.log("permissions", permissions);
    res.json({
      role: userRole,
      permissions: permissions,
      availableRoles: Object.keys(ROLE_PERMISSIONS),
    });
  } catch (error) {
    console.error("Error getting user permissions:", error);
    res.status(500).json({
      error: "Internal error getting permissions",
    });
  }
};

/**
 * Verifies if the user has a specific permission
 */
export const checkUserPermission = async (req, res) => {
  try {
    const { permission } = req.params;

    if (!req.user || !req.user.role) {
      return res.status(401).json({
        error: "User not authenticated or role not defined",
      });
    }

    if (!permission) {
      return res.status(400).json({
        error: "Permission not specified",
      });
    }

    const userRole = req.user.role;
    const hasUserPermission = hasPermission(userRole, permission);

    res.json({
      role: userRole,
      permission: permission,
      hasPermission: hasUserPermission,
    });
  } catch (error) {
    console.error("Error verifying permission:", error);
    res.status(500).json({
      error: "Internal error verifying permission",
    });
  }
};

/**
 * Gets complete user information including permissions
 */
export const getUserInfoWithPermissions = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        error: "Invalid token or ID not present",
      });
    }

    // Get user information
    const user = await getUserProfileService(req.user.id);

    // Get role permissions
    const userRole = req.user.role;
    const permissions = getRolePermissions(userRole);

    res.json({
      user: {
        ...user,
        role: userRole,
        permissions: permissions,
      },
    });
  } catch (error) {
    console.error("Error getting user information:", error);
    res.status(500).json({
      error: "Internal error getting user information",
    });
  }
};

/**
 * Gets all available roles and their permissions (only for administrators)
 */
export const getAllRolesAndPermissions = async (req, res) => {
  try {
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        error: "User not authenticated",
      });
    }

    // Verify if the user has administrator permissions
    const userRole = req.user.role;
    const hasAdminPermission = hasPermission(userRole, "canManageSystem");

    if (!hasAdminPermission) {
      return res.status(403).json({
        error: "You don't have permission to view this information",
      });
    }

    res.json({
      roles: ROLE_PERMISSIONS,
      totalRoles: Object.keys(ROLE_PERMISSIONS).length,
    });
  } catch (error) {
    console.error("Error getting roles and permissions:", error);
    res.status(500).json({
      error: "Internal error getting roles and permissions",
    });
  }
};
