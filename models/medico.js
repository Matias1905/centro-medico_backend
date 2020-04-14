'use strict';
module.exports = (sequelize, DataTypes) => {
  const Medico = sequelize.define('Medico', {
    nro_matricula: DataTypes.STRING
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