"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Especialidad extends Model {
    static associate(models) {
      this.hasOne(models.Usuarios, { foreignKey: "especialidad_id" });
    }
  }
  Especialidad.init(
    {
      nombre_especialidad: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true, // El nombre no puede estar vacío
        },
      },
    },
    {
      sequelize,
      modelName: "Especialidad",
      tableName: "especialidades", 
      timestamps: true, // Para incluir campos createdAt y updatedAt
    }
  );
  return Especialidad;
};
