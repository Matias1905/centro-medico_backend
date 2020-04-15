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
        queryInterface.addColumn('medicos', 'usuario_id', {
          type: Sequelize.INTEGER,
          references: {
            model: 'Usuarios',
            key: 'id'
          }
        }),
        queryInterface.addColumn('medicos', 'nro_matricula', {
          type: Sequelize.STRING
        }),
        queryInterface.removeColumn('medicos', 'nombre'),
        queryInterface.removeColumn('medicos', 'username'),
        queryInterface.removeColumn('medicos', 'password'),
        queryInterface.removeColumn('medicos', 'nro_socio'),
        queryInterface.removeColumn('medicos', 'genero')
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
      queryInterface.removeColumn('medicos', 'usuario_id'),
      queryInterface.removeColumn('medicos', 'nro_matricula'),
      queryInterface.addColumn('medicos', 'nombre', { type: Sequelize.STRING }),
      queryInterface.addColumn('medicos', 'username', { type: Sequelize.STRING }),
      queryInterface.addColumn('medicos', 'password', { type: Sequelize.STRING }),
      queryInterface.addColumn('medicos', 'nro_socio', { type: Sequelize.STRING }),
      queryInterface.addColumn('medicos', 'genero', { type: Sequelize.STRING })
    ])
  }
};
