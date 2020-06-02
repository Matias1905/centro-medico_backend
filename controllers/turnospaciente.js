const { Op } = require('sequelize')
const { Turno, Paciente, Medico, Especialidad, Usuario } = require('../models')

module.exports = {
    getTurnosActivosPaciente(req, res) {
        return Paciente.findByPk(req.body.paciente_id).then(paciente => {
            if (!paciente) {
                return res.status(404).send({ message: 'Paciente no encontrado' })
            }
            return paciente.getTurnos({
                where: {
                    fecha_inicio: {
                        [Op.gte]: new Date()
                    }
                },
                include: [{
                    model: Medico,
                    as: 'medico',
                    include: {
                        model: Usuario,
                        as: 'datos'
                    }
                }, {
                    model: Especialidad,
                    as: 'especialidad',
                    attributes: ['titulo']
                }]
            }).then(turnos => {
                if (!turnos) {
                    return res.status(400).send({ message: 'Ha ocurrido un error' })
                }
                return res.status(200).send(turnos)
            }).catch(err => res.status(404).send(err))
        }).catch(err => res.status(404).send(err))
    }
}
