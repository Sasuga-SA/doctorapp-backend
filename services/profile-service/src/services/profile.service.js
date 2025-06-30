import { Profile } from "../models/profile.model.js";
import { Op } from "sequelize";

export class ProfileService {
  // Create a new profile
  static async createProfile(profileData) {
    try {
      const profile = await Profile.create(profileData);
      return {
        success: true,
        data: profile,
        message: "Profile created successfully",
      };
    } catch (error) {
      throw new Error(`Error creating profile: ${error.message}`);
    }
  }

  // Get profile by ID
  static async getProfileById(profileId) {
    try {
      const profile = await Profile.findByPk(profileId);
      if (!profile) {
        throw new Error("Profile not found");
      }
      return {
        success: true,
        data: profile,
      };
    } catch (error) {
      throw new Error(`Error getting profile: ${error.message}`);
    }
  }

  // Get profile by userId
  static async getProfileByUserId(userId) {
    try {
      const profile = await Profile.findOne({
        where: { userId, isActive: true },
      });
      if (!profile) {
        throw new Error("Profile not found");
      }
      return {
        success: true,
        data: profile,
      };
    } catch (error) {
      throw new Error(`Error getting profile: ${error.message}`);
    }
  }

  // Update profile
  static async updateProfile(profileId, updateData) {
    try {
      const profile = await Profile.findByPk(profileId);
      if (!profile) {
        throw new Error("Profile not found");
      }

      await profile.update(updateData);
      return {
        success: true,
        data: profile,
        message: "Profile updated successfully",
      };
    } catch (error) {
      throw new Error(`Error updating profile: ${error.message}`);
    }
  }

  // Update profile by userId
  static async updateProfileByUserId(userId, updateData) {
    try {
      const profile = await Profile.findOne({
        where: { userId, isActive: true },
      });
      if (!profile) {
        throw new Error("Profile not found");
      }

      await profile.update(updateData);
      return {
        success: true,
        data: profile,
        message: "Profile updated successfully",
      };
    } catch (error) {
      throw new Error(`Error updating profile: ${error.message}`);
    }
  }

  // Delete profile (soft delete)
  static async deleteProfile(profileId) {
    try {
      const profile = await Profile.findByPk(profileId);
      if (!profile) {
        throw new Error("Profile not found");
      }

      await profile.update({ isActive: false });
      return {
        success: true,
        message: "Profile deleted successfully",
      };
    } catch (error) {
      throw new Error(`Error deleting profile: ${error.message}`);
    }
  }

  // Get all profiles (with pagination)
  static async getAllProfiles(page = 1, limit = 10) {
    try {
      const offset = (page - 1) * limit;
      const { count, rows } = await Profile.findAndCountAll({
        where: { isActive: true },
        limit,
        offset,
        order: [["createdAt", "DESC"]],
      });

      return {
        success: true,
        data: {
          profiles: rows,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            totalItems: count,
            itemsPerPage: limit,
          },
        },
      };
    } catch (error) {
      throw new Error(`Error getting profiles: ${error.message}`);
    }
  }

  // Search profiles by name
  static async searchProfilesByName(searchTerm, page = 1, limit = 10) {
    try {
      const offset = (page - 1) * limit;
      const { count, rows } = await Profile.findAndCountAll({
        where: {
          isActive: true,
          [Op.or]: [
            { firstName: { [Op.iLike]: `%${searchTerm}%` } },
            { lastName: { [Op.iLike]: `%${searchTerm}%` } },
          ],
        },
        limit,
        offset,
        order: [["createdAt", "DESC"]],
      });

      return {
        success: true,
        data: {
          profiles: rows,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            totalItems: count,
            itemsPerPage: limit,
          },
        },
      };
    } catch (error) {
      throw new Error(`Error searching profiles: ${error.message}`);
    }
  }
} 