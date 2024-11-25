"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class SesionActiva extends Model {
    static associate(models) {
      this.belongsTo(models.Usuarios, { foreignKey: "usuario_id" });
    }
  }
  SesionActiva.init(
    {
      fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      fecha_expiracion: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "SesionActiva",
    }
  );
  return SesionActiva;
};
