'use strict';
module.exports = (sequelize, DataTypes) => {
  const Turno = sequelize.define('Turno', {
    fecha_inicio: DataTypes.DATE,
    fecha_fin: DataTypes.DATE,
    sede: DataTypes.STRING,
    estado: DataTypes.STRING
  }, {});
  Turno.associate = function(models) {
    // associations can be defined here
    Turno.belongsTo(models.Jornada, {
      foreignKey: 'jornada_id',
      as: 'jornada'
    })

    Turno.belongsTo(models.Paciente, {
      foreignKey: 'paciente_id',
      as: 'paciente'
    })

    Turno.belongsTo(models.Medico, {
      foreignKey: 'medico_id',
      as: 'medico'
    })

    Turno.belongsTo(models.Especialidad, { 
      foreignKey: 'especialidad_id',
      as: 'especialidad'
    })
  };
  return Turno;
};