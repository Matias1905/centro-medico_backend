'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return Promise.all([
      queryInterface.addColumn('Pacientes', 'usuario_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Usuarios',
          key: 'id'
        }
      }),
      queryInterface.addColumn('Pacientes', 'obra_social', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Pacientes', 'plan', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Pacientes', 'os_nro', {
        type: Sequelize.STRING
      }),
      queryInterface.removeColumn('Pacientes', 'nombre'),
      queryInterface.removeColumn('Pacientes', 'username'),
      queryInterface.removeColumn('Pacientes', 'password'),
      queryInterface.removeColumn('Pacientes', 'nro_socio'),
      queryInterface.removeColumn('Pacientes', 'genero'),
      queryInterface.removeColumn('Pacientes', 'fecha_nac')
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
      queryInterface.removeColumn('Pacientes', 'usuario_id'),
      queryInterface.removeColumn('Pacientes', 'obra_social'),
      queryInterface.removeColumn('Pacientes', 'plan'),
      queryInterface.removeColumn('Pacientes', 'os_nro'),
      queryInterface.addColumn('Pacientes', 'nombre', { type: Sequelize.STRING }),
      queryInterface.addColumn('Pacientes', 'username', { type: Sequelize.STRING }),
      queryInterface.addColumn('Pacientes', 'password', { type: Sequelize.STRING }),
      queryInterface.addColumn('Pacientes', 'nro_socio', { type: Sequelize.STRING }),
      queryInterface.addColumn('Pacientes', 'genero', { type: Sequelize.STRING }),
      queryInterface.addColumn('Pacientes', 'fecha_nac', { type: Sequelize.DATE })
    ])
  }
};
