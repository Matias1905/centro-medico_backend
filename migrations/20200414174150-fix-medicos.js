'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });

      nombre: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    nro_socio: DataTypes.STRING,
    genero: DataTypes.STRING
    */

      return Promise.all([
        queryInterface.addColumn('Medicos', 'usuario_id', {
          type: Sequelize.INTEGER,
          references: {
            model: 'Usuarios',
            key: 'id'
          }
        }),
        queryInterface.addColumn('Medicos', 'nro_matricula', {
          type: Sequelize.STRING
        }),
        queryInterface.removeColumn('Medicos', 'nombre'),
        queryInterface.removeColumn('Medicos', 'username'),
        queryInterface.removeColumn('Medicos', 'password'),
        queryInterface.removeColumn('Medicos', 'nro_socio'),
        queryInterface.removeColumn('Medicos', 'genero')
      ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return Promise.all([
      queryInterface.removeColumn('Medicos', 'usuario_id'),
      queryInterface.removeColumn('Medicos', 'nro_matricula'),
      queryInterface.addColumn('Medicos', 'nombre', { type: Sequelize.STRING }),
      queryInterface.addColumn('Medicos', 'username', { type: Sequelize.STRING }),
      queryInterface.addColumn('Medicos', 'password', { type: Sequelize.STRING }),
      queryInterface.addColumn('Medicos', 'nro_socio', { type: Sequelize.STRING }),
      queryInterface.addColumn('Medicos', 'genero', { type: Sequelize.STRING })
    ])
  }
};
