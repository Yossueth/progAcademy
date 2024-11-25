"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Valoraciones extends Model {
    static associate(models) {
      this.belongsTo(models.Usuarios, { foreignKey: "usuario_id" });
      this.belongsTo(models.Cursos, { foreignKey: "curso_id" });
    }
  }

  Valoraciones.init(
    {
      calificacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          min: 1, // Calificación mínima
          max: 5, // Calificación máxima
        },
      },
      comentario: {
        type: DataTypes.STRING,
        allowNull: true, // Puede ser opcional
        validate: {
          len: [0, 500], // Máximo 500 caracteres
        },
      },
      fecha_valoracion: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true, // Validar que sea una fecha válida
          notEmpty: true,
        },
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Usuarios", // Nombre de la tabla relacionada
          key: "id",
        },
      },
      curso_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Cursos", // Nombre de la tabla relacionada
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Valoraciones",
      tableName: "valoraciones", // Nombre de la tabla en la base de datos
      timestamps: true, // Para incluir campos createdAt y updatedAt
    }
  );

  return Valoraciones;
};
