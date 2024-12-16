"use strict";

const { Model, DataTypes} = require("sequelize");

module.exports = (sequelize) => {
  class Perfiles extends Model {
    static associate(models) {
      this.belongsTo(models.Usuarios, { foreignKey: "usuario_id" });
    }
  }

  Perfiles.init(
    {
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Usuarios", 
          key: "id",
        },
      },
      biografia: {
        type: DataTypes.STRING,
        allowNull: true, 
      },
      foto_perfil: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Perfiles",
      tableName: "perfiles", // Nombre de la tabla en la base de datos
      timestamps: true, // Para incluir campos createdAt y updatedAt
    }
  );

  return Perfiles;
};
