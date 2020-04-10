'use strict';
module.exports = (sequelize, DataTypes) => {
  const Jornada = sequelize.define('Jornada', {
    fecha_inicio: DataTypes.DATE,
    fecha_fin: DataTypes.DATE,
    sede: DataTypes.STRING
  }, {});
  Jornada.associate = function (models) {
    // associations can be defined here
    Jornada.belongsTo(models.Medico, {
      foreignKey: 'medico_id',
      as: 'medico'
    })

    Jornada.hasMany(models.Turno, {
      foreignKey: 'jornada_id',
      as: 'turnos'
    })

    Jornada.belongsTo(models.Especialidad, {
      foreignKey: 'especialidad_id',
      as: 'especialidad'
    })

  };
  return Jornada;
};