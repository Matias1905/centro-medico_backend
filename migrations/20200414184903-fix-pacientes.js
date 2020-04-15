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
     queryInterface.addColumn('pacientes', 'usuario_id', {
       type: Sequelize.INTEGER,
       references: {
         model: 'Usuarios',
         key: 'id'
       }
     }),
     queryInterface.removeColumn('pacientes', 'nombre'),
     queryInterface.removeColumn('pacientes', 'username'),
     queryInterface.removeColumn('pacientes', 'password'),
     queryInterface.removeColumn('pacientes', 'nro_socio'),
     queryInterface.removeColumn('pacientes', 'genero'),
     queryInterface.removeColumn('pacientes', 'fecha_nac')     
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
     queryInterface.removeColumn('pacientes', 'usuario_id'),
     queryInterface.addColumn('pacientes', 'nombre', { type: Sequelize.STRING }),
     queryInterface.addColumn('pacientes', 'username', { type: Sequelize.STRING }),
     queryInterface.addColumn('pacientes', 'password', { type: Sequelize.STRING }),
     queryInterface.addColumn('pacientes', 'nro_socio', { type: Sequelize.STRING }),
     queryInterface.addColumn('pacientes', 'genero', { type: Sequelize.STRING }),
     queryInterface.addColumn('pacientes', 'fecha_nac', { type: Sequelize.DATE })
   ])
  }
};
