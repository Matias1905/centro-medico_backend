'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Jornadas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha_inicio: {
        type: Sequelize.DATE
      },
      fecha_fin: {
        type: Sequelize.DATE
      },
      sede: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.STRING
      },
      medico_id:{
        type: Sequelize.INTEGER,
        references: {
          model: 'Medicos',
          key: 'id',
          as: 'medico'
        }
      },
      especialidad_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Especialidads',
          key: 'id',
          as: 'especialidad'
        }
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
    return queryInterface.dropTable('Jornadas');
  }
};