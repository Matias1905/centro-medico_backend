'use strict';
module.exports = (sequelize, DataTypes) => {
  const Especialidad = sequelize.define('Especialidad', {
    titulo: DataTypes.STRING
  }, {});
  Especialidad.associate = function(models) {
    // associations can be defined here
    Especialidad.belongsToMany(models.Medico, {
      through: models.Medico_especialidad,
      foreignKey: 'especialidad_id',
      as: 'medicos'
    })

    Especialidad.hasMany(models.Turno, {
      foreignKey: 'especialidad_id',
      as: 'turnos'
    })
  };
  return Especialidad;
};