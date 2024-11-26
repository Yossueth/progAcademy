"use strict";
const { Model,  DataTypes} = require("sequelize");
module.exports = (sequelize) => {
  class Solicitudes extends Model {
    static associate(models) {
      this.hasMany(models.Cursos, { foreignKey: "solicitud_id", as: 'solicitudes'});
      this.belongsTo(models.Usuarios, { foreignKey: "usuario_id" });
    }
  }
  Solicitudes.init(
    {
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Usuarios',
          key: 'id'
        }
      },
      fecha_solicitud: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      estado: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Solicitudes",
    }
  );
  return Solicitudes;
};
