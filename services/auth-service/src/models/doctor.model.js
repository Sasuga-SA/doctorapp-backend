import { Model, DataTypes } from 'sequelize';

export class Doctor extends Model {
  static initModel(sequelize) {
    Doctor.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      specialty: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'doctor',
      },
    }, {
      sequelize,
      modelName: 'Doctor',
      tableName: 'doctors',
      timestamps: true,
    });

    return Doctor;
  }
}
