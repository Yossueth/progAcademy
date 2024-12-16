("use strict");

const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Cursos extends Model {
    static associate(models) {
      this.belongsTo(models.Categorias, {
        foreignKey: "categoria_id",
        as: "categorias",
      });
      this.belongsTo(models.Usuarios, {
        foreignKey: "usuario_id",
        as: "usuarios",
      });
      this.hasMany(models.Valoraciones, { foreignKey: "curso_id" });
      this.hasMany(models.Pagos, { foreignKey: "curso_id", as: "cursos" });
    }
  }

  // Inicialización del modelo
  Cursos.init(
    {
      nombre_curso: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      archivo: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      miniatura: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      precio: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoria_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Categorias", // Nombre de la tabla relacionada
          key: "id",
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
    },
    {
      sequelize,
      modelName: "Cursos",
      tableName: "Cursos", // Opcional, en caso de que uses un nombre diferente en la base de datos
      timestamps: true, // Para incluir campos createdAt y updatedAt
    }
  );

  return Cursos;
};
