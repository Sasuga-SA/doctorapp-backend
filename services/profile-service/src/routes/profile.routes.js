import express from "express";
import { ProfileController } from "../controllers/profile.controller.js";
import { verifyToken } from "../middlewares/verify.jwt.js";
import { uploadProfilePicture, handleUploadError } from "../middlewares/upload.middleware.js";
import { requirePermission, canAccessProfile, canUpdateProfile, canDeleteProfile } from "../middlewares/permissions.js";

const router = express.Router();

// Rutas que requieren solo autenticación básica (operaciones propias)
router.post("/", verifyToken, ProfileController.createProfile);
router.get("/me", verifyToken, ProfileController.getMyProfile);
router.put("/me", verifyToken, ProfileController.updateMyProfile);
router.delete("/me", verifyToken, ProfileController.deleteMyProfile);
router.post("/upload-picture", verifyToken, uploadProfilePicture, handleUploadError, ProfileController.uploadProfilePicture);

// Rutas que requieren permisos específicos
router.get("/:id", verifyToken, canAccessProfile(), ProfileController.getProfileById);
router.put("/:id", verifyToken, canUpdateProfile(), ProfileController.updateProfileById);
router.delete("/:id", verifyToken, canDeleteProfile(), ProfileController.deleteProfileById);

// Rutas que requieren permisos de visualización y búsqueda
router.get("/", verifyToken, requirePermission("canViewAllUsers"), ProfileController.getAllProfiles);
router.get("/search", verifyToken, requirePermission("canSearchUsers"), ProfileController.searchProfiles);

export default router; 