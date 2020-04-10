'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Turnos', {
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
      jornada_id:{
        type: Sequelize.INTEGER,
        references: {
          model: 'Jornadas',
          key: 'id',
          as: 'jornada'
        }
      },
      paciente_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Pacientes',
          key: 'id',
          as: 'paciente'
        }
      },
      estado: {
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
    return queryInterface.dropTable('Turnos');
  }
};