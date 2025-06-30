import { ProfileService } from "../services/profile.service.js";

export class ProfileController {
  // Create a new profile
  static async createProfile(req, res) {
    try {
      const profileData = {
        ...req.body,
        userId: req.user.id, // Get from JWT token
      };

      const result = await ProfileService.createProfile(profileData);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Get authenticated user's profile
  static async getMyProfile(req, res) {
    try {
      const result = await ProfileService.getProfileByUserId(req.user.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Get profile by ID
  static async getProfileById(req, res) {
    try {
      const { id } = req.params;
      const result = await ProfileService.getProfileById(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Update authenticated user's profile
  static async updateMyProfile(req, res) {
    try {
      const updateData = req.body;
      
      // If an image was uploaded, add the path
      if (req.file) {
        updateData.profilePicture = req.file.path;
      }

      const result = await ProfileService.updateProfileByUserId(
        req.user.id,
        updateData
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Update profile by ID (admin only)
  static async updateProfileById(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      // Verificación adicional de seguridad
      if (req.user.role !== 'admin' && req.user.id !== id) {
        return res.status(403).json({
          success: false,
          message: "No tienes permisos para actualizar este perfil",
        });
      }
      
      // If an image was uploaded, add the path
      if (req.file) {
        updateData.profilePicture = req.file.path;
      }

      const result = await ProfileService.updateProfile(id, updateData);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Delete authenticated user's profile
  static async deleteMyProfile(req, res) {
    try {
      const profile = await ProfileService.getProfileByUserId(req.user.id);
      const result = await ProfileService.deleteProfile(profile.data.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Delete profile by ID (admin only)
  static async deleteProfileById(req, res) {
    try {
      const { id } = req.params;
      
      // Verificación adicional de seguridad
      if (req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: "Solo los administradores pueden eliminar perfiles",
        });
      }
      
      const result = await ProfileService.deleteProfile(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Get all profiles (with pagination) - requires permissions
  static async getAllProfiles(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      
      // Verificación adicional de permisos
      if (!req.user.role || (req.user.role !== 'admin' && req.user.role !== 'doctor')) {
        return res.status(403).json({
          success: false,
          message: "No tienes permisos para ver todos los perfiles",
        });
      }
      
      const result = await ProfileService.getAllProfiles(
        parseInt(page),
        parseInt(limit)
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Search profiles by name - requires permissions
  static async searchProfiles(req, res) {
    try {
      const { q, page = 1, limit = 10 } = req.query;
      
      if (!q) {
        return res.status(400).json({
          success: false,
          message: "Search term required",
        });
      }

      // Verificación adicional de permisos
      if (!req.user.role || (req.user.role !== 'admin' && req.user.role !== 'doctor')) {
        return res.status(403).json({
          success: false,
          message: "No tienes permisos para buscar perfiles",
        });
      }

      const result = await ProfileService.searchProfilesByName(
        q,
        parseInt(page),
        parseInt(limit)
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Upload profile picture
  static async uploadProfilePicture(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      const updateData = {
        profilePicture: req.file.path,
      };

      const result = await ProfileService.updateProfileByUserId(
        req.user.id,
        updateData
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
} 