import { describe, it, expect, beforeEach } from "vitest";
import {
  requirePermission,
  requireAnyPermission,
  requireAllPermissions,
  getRolePermissions,
  hasPermission,
  ROLE_PERMISSIONS,
} from "../src/middlewares/role.permissions.js";

describe("Permission System", () => {
  let mockReq;
  let mockRes;
  let mockNext;

  beforeEach(() => {
    mockReq = {
      user: {
        id: "test-user-id",
        role: "doctor",
      },
    };

    mockRes = {
      status: (code) => ({
        json: (data) => ({ statusCode: code, data }),
      }),
    };

    mockNext = () => {};
  });

  describe("ROLE_PERMISSIONS", () => {
    it("should have defined permissions for doctor role", () => {
      expect(ROLE_PERMISSIONS.doctor).toBeDefined();
      expect(ROLE_PERMISSIONS.doctor.canViewProfile).toBe(true);
      expect(ROLE_PERMISSIONS.doctor.canViewPatients).toBe(true);
    });

    it("should have defined permissions for admin role", () => {
      expect(ROLE_PERMISSIONS.admin).toBeDefined();
      expect(ROLE_PERMISSIONS.admin.canManageSystem).toBe(true);
    });

    it("should have defined permissions for patient role", () => {
      expect(ROLE_PERMISSIONS.patient).toBeDefined();
      expect(ROLE_PERMISSIONS.patient.canViewOwnAppointments).toBe(true);
    });
  });

  describe("getRolePermissions", () => {
    it("should return doctor role permissions", () => {
      const permissions = getRolePermissions("doctor");
      expect(permissions.canViewProfile).toBe(true);
      expect(permissions.canViewPatients).toBe(true);
      expect(permissions.canCreateAppointments).toBe(true);
    });

    it("should return empty object for non-existent role", () => {
      const permissions = getRolePermissions("invalid-role");
      expect(permissions).toEqual({});
    });
  });

  describe("hasPermission", () => {
    it("should return true if role has permission", () => {
      expect(hasPermission("doctor", "canViewProfile")).toBe(true);
      expect(hasPermission("doctor", "canViewPatients")).toBe(true);
    });

    it("should return false if role doesn't have permission", () => {
      expect(hasPermission("doctor", "canManageSystem")).toBe(false);
    });

    it("should return false for non-existent role", () => {
      expect(hasPermission("invalid-role", "canViewProfile")).toBe(false);
    });
  });

  describe("requirePermission", () => {
    it("should allow access if user has permission", () => {
      const middleware = requirePermission("canViewProfile");
      const result = middleware(mockReq, mockRes, mockNext);
      expect(result).toBeUndefined(); // next() was called
    });

    it("should deny access if user doesn't have permission", () => {
      const middleware = requirePermission("canManageSystem");
      const result = middleware(mockReq, mockRes, mockNext);
      expect(result.data.error).toContain("not granted");
    });

    it("should deny access if user is not authenticated", () => {
      mockReq.user = null;
      const middleware = requirePermission("canViewProfile");
      const result = middleware(mockReq, mockRes, mockNext);
      expect(result.data.error).toContain("not authenticated");
    });

    it("should deny access if role is not defined", () => {
      mockReq.user = { id: "test-id" }; // without role
      const middleware = requirePermission("canViewProfile");
      const result = middleware(mockReq, mockRes, mockNext);
      expect(result.data.error).toContain("role not defined");
    });

    it("should deny access if role is not recognized", () => {
      mockReq.user.role = "invalid-role";
      const middleware = requirePermission("canViewProfile");
      const result = middleware(mockReq, mockRes, mockNext);
      expect(result.data.error).toContain("not recognized");
    });
  });

  describe("requireAnyPermission", () => {
    it("should allow access if user has at least one permission", () => {
      const middleware = requireAnyPermission([
        "canViewProfile",
        "canManageSystem",
      ]);
      const result = middleware(mockReq, mockRes, mockNext);
      expect(result).toBeUndefined(); // next() was called
    });

    it("should deny access if user doesn't have any permission", () => {
      const middleware = requireAnyPermission([
        "canManageSystem",
        "canCreateUsers",
      ]);
      const result = middleware(mockReq, mockRes, mockNext);
      expect(result.data.error).toContain(
        "At least one of the following permissions is required",
      );
    });
  });

  describe("requireAllPermissions", () => {
    it("should allow access if user has all permissions", () => {
      const middleware = requireAllPermissions([
        "canViewProfile",
        "canViewPatients",
      ]);
      const result = middleware(mockReq, mockRes, mockNext);
      expect(result).toBeUndefined(); // next() was called
    });

    it("should deny access if user doesn't have all permissions", () => {
      const middleware = requireAllPermissions([
        "canViewProfile",
        "canManageSystem",
      ]);
      const result = middleware(mockReq, mockRes, mockNext);
      expect(result.data.error).toContain("All the following permissions are required");
    });
  });

  describe("Specific doctor use cases", () => {
    it("should allow doctor to view profile", () => {
      expect(hasPermission("doctor", "canViewProfile")).toBe(true);
    });

    it("should allow doctor to view patients", () => {
      expect(hasPermission("doctor", "canViewPatients")).toBe(true);
    });

    it("should allow doctor to create appointments", () => {
      expect(hasPermission("doctor", "canCreateAppointments")).toBe(true);
    });

    it("should allow doctor to view medical records", () => {
      expect(hasPermission("doctor", "canViewMedicalRecords")).toBe(true);
    });

    it("should allow doctor to prescribe medication", () => {
      expect(hasPermission("doctor", "canPrescribeMedication")).toBe(true);
    });

    it("should NOT allow doctor to manage system", () => {
      expect(hasPermission("doctor", "canManageSystem")).toBe(false);
    });
  });

  describe("Specific admin use cases", () => {
    it("should allow admin to manage system", () => {
      expect(hasPermission("admin", "canManageSystem")).toBe(true);
    });

    it("should allow admin to view all users", () => {
      expect(hasPermission("admin", "canViewAllUsers")).toBe(true);
    });

    it("should allow admin to create users", () => {
      expect(hasPermission("admin", "canCreateUsers")).toBe(true);
    });
  });

  describe("Specific patient use cases", () => {
    it("should allow patient to view profile", () => {
      expect(hasPermission("patient", "canViewProfile")).toBe(true);
    });

    it("should allow patient to view own appointments", () => {
      expect(hasPermission("patient", "canViewOwnAppointments")).toBe(true);
    });

    it("should allow patient to cancel appointments", () => {
      expect(hasPermission("patient", "canCancelAppointments")).toBe(true);
    });

    it("should NOT allow patient to view all patients", () => {
      expect(hasPermission("patient", "canViewPatients")).toBe(false);
    });
  });
});
