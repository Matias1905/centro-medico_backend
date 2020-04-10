'use strict';
module.exports = (sequelize, DataTypes) => {
  const Paciente = sequelize.define('Paciente', {
    nombre: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    nro_socio: DataTypes.STRING,
    fecha_nac: DataTypes.DATE,
    genero: DataTypes.STRING,
    es_deudor: DataTypes.BOOLEAN
  }, {});
  Paciente.associate = function(models) {
    // associations can be defined here
    Paciente.hasMany(models.Turno, {
      foreignKey: 'paciente_id',
      as: 'turnos'
    })
  };
  return Paciente;
};