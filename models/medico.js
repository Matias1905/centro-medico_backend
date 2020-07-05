'use strict';
module.exports = (sequelize, DataTypes) => {
  const Medico = sequelize.define('Medico', {
    nro_matricula: DataTypes.STRING,
    foto_carnet: DataTypes.STRING,
    lista_espera: {
      type: DataTypes.TEXT,
        get: function() {
          return JSON.parse(this.getDataValue("lista_espera"));
        },
        set: function(value) {
          return this.setDataValue("lista_espera", JSON.stringify(value));
        }
    }
  }, {});
  Medico.associate = function(models) {
    // associations can be defined here
    Medico.belongsToMany(models.Especialidad, {
      through: models.Medico_especialidad,
      foreignKey: 'medico_id',
      as: 'especialidades'
    })

    Medico.hasMany(models.Jornada, {
      foreignKey: 'medico_id',
      as: 'jornadas'
    })

    Medico.hasMany(models.Turno, {
      foreignKey: 'medico_id',
      as: 'turnos'
    })

    Medico.belongsTo(models.Usuario, {
      foreignKey: 'usuario_id',
      as: 'datos'
    })
  };
  return Medico;
};