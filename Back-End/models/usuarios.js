"use strict";

const { Model,  DataTypes} = require("sequelize");

module.exports = (sequelize) => {
  class Usuarios extends Model {
    static associate(models) {
      this.belongsTo(models.Roles, { foreignKey: "rol_id" });
      this.belongsTo(models.Especialidad, { foreignKey: "especialidad_id" });


      this.hasOne(models.Perfiles, { foreignKey: "usuario_id" });

      this.hasMany(models.Cursos, { foreignKey: "usuario_id" });
      this.hasMany(models.Pagos, { foreignKey: "usuario_id" });
      this.hasMany(models.Solicitudes, { foreignKey: "usuario_id" });
      this.hasMany(models.Valoraciones, { foreignKey: "usuario_id" });
    }
  }

  Usuarios.init(
    {
      nombre_usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      apellido: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Garantiza correos únicos
        validate: {
          isEmail: true, // Verifica que sea un correo válido
          notEmpty: true,
        },
      },
      contrasena: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [8, 100], // Contraseña mínima de 8 caracteres
        },
      },
      fecha_registro: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true, // Valida que sea una fecha
          notEmpty: true,
        },
      },
      rol_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Roles", // Tabla relacionada
          key: "id",
        },
      },
      especialidad_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Especialidades", // Tabla relacionada
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Usuarios",
      tableName: "usuarios", // Nombre de la tabla en la base de datos
      timestamps: true, // Incluye createdAt y updatedAt
    }
  );

  return Usuarios;
};
