const { Medico, Paciente, Turno, Especialidad, Jornada, Usuario } = require('../models');

module.exports = {

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
            paciente_id: req.body.paciente_id
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

    getTurnosEspecialidad(req, res) {
        return Especialidad.findOne({
            where: {
                titulo: req.body.titulo
            }
        }).then(esp => {

            if (!esp) {
                return res.status(404).send({ message: "Especialidad no encontrada" })
            }
            return esp.getTurnos({
                where: {
                    paciente_id: null
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
            }).then(list => res.status(200).send(list)).catch(err => res.status(400).send(err))
        }).catch(err => res.status(400).send(err))
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


    cancelarTurno(req, res) {
        Turno.update({
            paciente_id: null,
            estado: 'En espera'
        }, {
            where: {
                id: req.body.turno_id
            },
            returning: true
        }).then(obj => res.status(200).send(obj))
            .catch(err => res.status(404).send(err))
    }

}