"use strict";

const { Model, DataTypes} = require("sequelize");

module.exports = (sequelize) => {
  class Pagos extends Model {
    static associate(models) {
      this.belongsTo(models.Usuarios, { foreignKey: "usuario_id" });

      this.belongsTo(models.Cursos, { foreignKey: "curso_id" });
    }
  }

  Pagos.init(
    {
      cantidad: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          isDecimal: true, // Validar que sea un número decimal
          notEmpty: true, // No puede estar vacío
        },
      },
      fecha_pago: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true, // Validar que sea una fecha
          notEmpty: true, // No puede estar vacío
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
      modelName: "Pagos",
      tableName: "pagos", // Nombre de la tabla en la base de datos
      timestamps: true, // Para incluir campos createdAt y updatedAt
    }
  );

  return Pagos;
};
