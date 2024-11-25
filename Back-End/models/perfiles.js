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
          model: "Usuarios", // Nombre de la tabla relacionada
          key: "id",
        },
      },
      biografia: {
        type: DataTypes.STRING,
        allowNull: true, // Puede ser opcional
        validate: {
          len: [0, 500], // Máximo 500 caracteres
        },
      },
      foto_perfil: {
        type: DataTypes.BLOB,
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
