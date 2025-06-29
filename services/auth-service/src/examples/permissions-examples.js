// services/auth-service/src/examples/permissions-examples.js
// This file contains examples of how to use the permission system in future routes

import express from "express";
import { verifyJWT } from "../middlewares/verify.jwt.js";
import {
  requirePermission,
  requireAnyPermission,
  requireAllPermissions,
} from "../middlewares/role.permissions.js";

const router = express.Router();

// Example 1: Route that requires a specific permission
router.get(
  "/patients",
  verifyJWT,
  requirePermission("canViewPatients"),
  (req, res) => {
    // Only doctors can view the patient list
    res.json({ message: "Patient list", patients: [] });
  },
);

// Example 2: Route that requires at least one of several permissions
router.get(
  "/reports",
  verifyJWT,
  requireAnyPermission(["canViewReports", "canManageSystem"]),
  (req, res) => {
    // Doctors can view reports, admins too
    res.json({ message: "System reports", reports: [] });
  },
);

// Example 3: Route that requires all specified permissions
router.post(
  "/medical-records",
  verifyJWT,
  requireAllPermissions(["canViewMedicalRecords", "canUpdateMedicalRecords"]),
  (req, res) => {
    // Only doctors can create medical records
    res.json({ message: "Medical record created" });
  },
);

// Example 4: Route to create appointments
router.post(
  "/appointments",
  verifyJWT,
  requirePermission("canCreateAppointments"),
  (req, res) => {
    // Doctors can create appointments
    res.json({ message: "Appointment created successfully" });
  },
);

// Example 5: Route to prescribe medications
router.post(
  "/prescriptions",
  verifyJWT,
  requirePermission("canPrescribeMedication"),
  (req, res) => {
    // Only doctors can prescribe medications
    res.json({ message: "Medication prescribed" });
  },
);

// Example 6: Route to manage users (admin only)
router.get(
  "/users",
  verifyJWT,
  requirePermission("canViewAllUsers"),
  (req, res) => {
    // Only admins can view all users
    res.json({ message: "User list", users: [] });
  },
);

// Example 7: Route to export data
router.get(
  "/export",
  verifyJWT,
  requireAnyPermission(["canExportData", "canManageSystem"]),
  (req, res) => {
    // Doctors and admins can export data
    res.json({ message: "Data exported", data: [] });
  },
);

// Example 8: Route to manage system (admin only)
router.post(
  "/system/config",
  verifyJWT,
  requirePermission("canManageSystem"),
  (req, res) => {
    // Only admins can configure the system
    res.json({ message: "System configuration updated" });
  },
);

// Example 9: Route for patients to view their own appointments
router.get(
  "/my-appointments",
  verifyJWT,
  requirePermission("canViewOwnAppointments"),
  (req, res) => {
    // Patients can view their own appointments
    res.json({ message: "Your appointments", appointments: [] });
  },
);

// Example 10: Route to cancel appointments
router.delete(
  "/appointments/:id",
  verifyJWT,
  requireAnyPermission(["canDeleteAppointments", "canCancelAppointments"]),
  (req, res) => {
    // Doctors can delete appointments, patients can cancel them
    res.json({ message: "Appointment cancelled/deleted" });
  },
);

export default router;
