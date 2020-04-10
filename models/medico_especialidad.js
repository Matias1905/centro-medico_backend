'use strict';
module.exports = (sequelize, DataTypes) => {
  const Medico_especialidad = sequelize.define('Medico_especialidad', {
    status: DataTypes.STRING
  }, {});
  Medico_especialidad.associate = function(models) {
    // associations can be defined here
  };
  return Medico_especialidad;
};