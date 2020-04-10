'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Medico_especialidads', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      medico_id:{
        type: Sequelize.INTEGER,
        references: {
          model: 'Medicos',
          key: 'id',
          as: 'medico_id'
        }
      },
      especialidad_id:{
        type: Sequelize.INTEGER,
        references: {
          model: 'Especialidads',
          key: 'id',
          as: 'especialidad_id'
        }
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Medico_especialidads');
  }
};