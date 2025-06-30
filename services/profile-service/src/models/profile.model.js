import { DataTypes, Model } from "sequelize";

export class Profile extends Model {
  static initModel(sequelize) {
    Profile.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
          unique: true,
          references: {
            model: "users",
            key: "id",
          },
        },
        firstName: {
          type: DataTypes.STRING(50),
          allowNull: false,
          validate: {
            len: [2, 50],
          },
        },
        lastName: {
          type: DataTypes.STRING(50),
          allowNull: false,
          validate: {
            len: [2, 50],
          },
        },
        dateOfBirth: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
        gender: {
          type: DataTypes.ENUM("male", "female", "other"),
          allowNull: true,
        },
        phone: {
          type: DataTypes.STRING(20),
          allowNull: true,
          validate: {
            is: /^[\+]?[1-9][\d]{0,15}$/,
          },
        },
        address: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        city: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        state: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        country: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        postalCode: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        profilePicture: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        bio: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        specialty: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        modelName: "Profile",
        tableName: "profiles",
        timestamps: true,
      }
    );
  }

  static associate(models) {
    // Relación con el modelo User (si existe en el mismo servicio)
    // Profile.belongsTo(models.User, { foreignKey: 'userId' });
  }
} 