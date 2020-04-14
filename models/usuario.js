'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    nombre: DataTypes.STRING,
    dni: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    nro_socio: DataTypes.STRING,
    fecha_nac: DataTypes.DATE,
    direccion: DataTypes.STRING,
    telefono: DataTypes.STRING,
    genero: DataTypes.STRING
  }, {});
  Usuario.associate = function(models) {
    // associations can be defined here
    Usuario.hasOne(models.Medico, {
      foreignKey: 'usuario_id',
      as: 'medico'
    })

    Usuario.hasOne(models.Paciente, {
      foreignKey: 'usuario_id',
      as: 'paciente'
    })

  };
  return Usuario;
}; 