"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Categorias extends Model {
    static associate(models) {
      this.hasMany(models.Cursos, { foreignKey: "categoria_id" });
    }
  }
  Categorias.init(
    {
      nombre_categoria: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true, // El nombre de la categoría no puede estar vacío
        },
      },
    },
    {
      sequelize,
      modelName: "Categorias",
      tableName: "categorias",
      timestamps: false,
    }
  );

  return Categorias;
};
