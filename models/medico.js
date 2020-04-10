'use strict';
module.exports = (sequelize, DataTypes) => {
  const Medico = sequelize.define('Medico', {
    nombre: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    nro_socio: DataTypes.STRING,
    genero: DataTypes.STRING
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
  };
  return Medico;
};