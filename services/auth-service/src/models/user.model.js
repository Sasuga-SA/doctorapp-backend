// services/auth-service/src/models/user.model.js
import { Model, DataTypes } from "sequelize";

export class User extends Model {
  static initModel(sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: { isEmail: true },
        },
        password: { type: DataTypes.STRING, allowNull: false },

        // optional fields
        specialty: DataTypes.STRING,
        phone: DataTypes.STRING,
        role: { type: DataTypes.STRING, defaultValue: "doctor" },
        organization: DataTypes.STRING,

        // verification and reset
        isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
        verifyTokenHash: DataTypes.STRING(64),
        verifyTokenExpires: DataTypes.DATE,
        resetTokenHash: DataTypes.STRING(64),
        resetTokenExpires: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: "User",
        tableName: "users",
        underscored: true,
        defaultScope: {
          attributes: {
            exclude: ["password", "verifyTokenHash", "resetTokenHash"],
          },
        },
        scopes: {
          full: { attributes: { exclude: [] } },
        },
      },
    );
    return User;
  }
}
