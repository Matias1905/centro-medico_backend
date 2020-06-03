'use strict';
module.exports = (sequelize, DataTypes) => {
  const Paciente = sequelize.define('Paciente', {
    es_deudor: DataTypes.BOOLEAN,
    obra_social: DataTypes.STRING,
    plan: DataTypes.STRING,
    os_nro: DataTypes.STRING
  }, {});
  Paciente.associate = function(models) {
    // associations can be defined here
    Paciente.hasMany(models.Turno, {
      foreignKey: 'paciente_id',
      as: 'turnos'
    })

    Paciente.belongsTo(models.Usuario, {
      foreignKey: 'usuario_id',
      as: 'datos'
    })
  };
  return Paciente;
};