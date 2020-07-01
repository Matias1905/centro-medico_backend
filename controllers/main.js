const { Op } = require('sequelize')
const { Medico, Paciente, Turno, Especialidad, Jornada, Usuario } = require('../models');

function formatFecha(fecha) {
    let fechaInicio = new Date(fecha);
    fechaInicio.setHours(0, 0, 0, 0);
    let fechaFin = new Date(fecha);
    fechaFin.setHours(24, 0, 0, 0)
    return [fechaInicio, fechaFin]
}

module.exports = {

    getEspecialidades(req, res) {
        return Especialidad.findAll({
            include: [{
                model: Medico,
                as: 'medicos',
                attributes: ['id'],
                include: {
                    model: Usuario,
                    as: 'datos',
                    attributes: ['apellido', 'nombre']
                },
                through: {
                    attributes: []
                }
            }],
            order: [
                ['titulo', 'asc'],
                [{ model: Medico, as: 'medicos' }, { model: Usuario, as: 'datos' }, 'apellido', 'asc']
            ]
        }).then(list => res.status(200).send(list)).catch(err => res.status(400).send(err))
    },

    getTurnosPaciente(req, res) {
        return Paciente.findByPk(req.body.paciente_id).then(paciente => {
            if (!paciente) {
                return res.status(404).send({ message: 'Paciente no encontrado' })
            }
            return paciente.getTurnos({
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
    },

    pedirTurno(req, res) {
        Turno.update({
            paciente_id: req.body.paciente_id,
            estado: 'ocupado'
        }, {
            where: {
                id: req.body.turno_id
            },
            returning: true
        }).then(obj => res.status(200).send(obj))
            .catch(err => res.status(404).send(err))
    },


    confirmarTurno(req, res) {
        Turno.update({
            estado: "confirmado"
        }, {
            where: {
                id: req.body.turno_id
            },
            returning: true
        }).then(obj => res.status(200).send(obj))
            .catch(err => res.status(404).send(err))
    },

    cancelarTurnoCM(req, res) {
        Turno.update({
            estado: "canceladoCM"
        }, {
            where: {
                id: req.body.turno_id
            },
            returning: true
        }).then(obj => res.status(200).send(obj))
            .catch(err => res.status(404).send(err))
    },

    getMedicosEspecialidad(req, res) {
        return Especialidad.findOne({
            where: {
                titulo: req.body.titulo
            }
        }).then(esp => {
            if (!esp) {
                return res.status(404).send({ message: 'Especialidad no encontrada' })
            }
            return esp.getMedicos({
                include: [{
                    model: Turno,
                    as: 'turnos'
                }, {
                    model: Usuario,
                    as: 'datos'
                }]
            }).then(list => res.status(200).send(list)).catch(err => res.status(400).send(err))
        }).catch(err => res.status(400).send(err))
    },


    getTurnos(req, res) {
        let condiciones = {}
        if (req.body.fecha && req.body.medico_id) {
            const [fechaInicio, fechaFin] = formatFecha(req.body.fecha)
            condiciones = {
                where: {
                    especialidad_id: req.body.especialidad_id,
                    medico_id: req.body.medico_id,
                    paciente_id: null,
                    fecha_inicio: {
                        [Op.between]: [fechaInicio, fechaFin],
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
            }
        } else if (req.body.fecha) {
            const [fechaInicio, fechaFin] = formatFecha(req.body.fecha)
            condiciones = {
                where: {
                    especialidad_id: req.body.especialidad_id,
                    paciente_id: null,
                    fecha_inicio: {
                        [Op.between]: [fechaInicio, fechaFin],
                        [Op.gte]: new Date()
                    }
                }
            }
        } else if (req.body.medico_id) {
            condiciones = {
                where: {
                    especialidad_id: req.body.especialidad_id,
                    medico_id: req.body.medico_id,
                    paciente_id: null,
                    fecha_inicio: {
                        [Op.gte]: new Date()
                    }
                }
            }
        } else {
            condiciones = {
                where: {
                    especialidad_id: req.body.especialidad_id,
                    paciente_id: null,
                    fecha_inicio: {
                        [Op.gte]: new Date()
                    }
                }
            }
        }
        condiciones.include = [{
            model: Medico,
            as: 'medico',
            include: {
                model: Usuario,
                as: 'datos',
                attributes: ['id', 'apellido', 'nombre', 'genero']
            }
        }, {
            model: Especialidad,
            as: 'especialidad',
            attributes: ['titulo']
        }]
        condiciones.order = [['fecha_inicio', 'ASC']];
        return Turno.findAll(condiciones).then(list => res.status(200).send(list)).catch(err => res.status(404).send(err))
    },

    cancelarTurno(req, res) {
        Turno.update({
            paciente_id: null,
            estado: 'disponible'
        }, {
            where: {
                id: req.body.turno_id
            },
            returning: true
        }).then(obj => res.status(200).send(obj))
            .catch(err => res.status(404).send(err))
    }

}