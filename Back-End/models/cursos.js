("use strict");

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Cursos extends Model {
    static associate(models) {
      this.belongsTo(models.Categorias, { foreignKey: "categoria_id" });
      this.belongsTo(models.Usuarios, { foreignKey: "usuario_id" });
      this.belongsTo(models.Solicitudes, { foreignKey: "solicitud_id" });

      this.hasMany(models.Valoraciones, { foreignKey: "valoraciones_id" });
    }
  }

  // Inicialización del modelo
  Cursos.init(
    {
      nombre_curso: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true, // El nombre no puede estar vacío
        },
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true, // La descripción no puede estar vacía
        },
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
      solicitud_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // Puede ser opcional si no todas tienen solicitud
        references: {
          model: "Solicitudes", // Nombre de la tabla relacionada
          key: "id",
        },
      },
      valoraciones_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // Puede ser opcional si no todas tienen solicitud
        references: {
          model: "Valoraciones", // Nombre de la tabla relacionada
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Cursos",
      tableName: "cursos", // Opcional, en caso de que uses un nombre diferente en la base de datos
      timestamps: true, // Para incluir campos createdAt y updatedAt
    }
  );

  return Cursos;
};
