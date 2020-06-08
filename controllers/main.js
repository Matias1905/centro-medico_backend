const { Op } = require('sequelize')
const { Medico, Paciente, Turno, Especialidad, Jornada, Usuario } = require('../models');

function formatFecha(fecha){
    let fechaInicio = new Date(fecha);
    fechaInicio.setHours(0,0,0,0);
    let fechaFin = new Date(fecha);
    fechaFin.setHours(24,0,0,0)
    return [fechaInicio, fechaFin]
}

module.exports = {

    getEspecialidades(req, res){
        return Especialidad.findAll().then(list => res.status(200).send(list)).catch(err => res.status(400).send(err))
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

    getTurnosPorEspecialidad(req, res){
        return Turno.findAll({
            where: {
                especialidad_id: req.body.especialidad_id,
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
        }).then(list => res.status(200).send(list)).catch(err => res.status(404).send(err))
    },


    getTurnosPorMedico(req, res){
        return Turno.findAll({
            where: {
                especialidad_id: req.body.especialidad_id,
                medico_id: req.body.medico_id,
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
        }).then(list => res.status(200).send(list)).catch(err => res.status(404).send(err))
    },

    getTurnosPorFecha(req, res){
        const [fechaInicio, fechaFin] = formatFecha(req.body.fecha)
        return Turno.findAll({
            where: {
                especialidad_id: req.body.especialidad_id,
                paciente_id: null,
                fecha_inicio:{
                    [Op.between]: [fechaInicio, fechaFin]
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
        }).then(list => res.status(200).send(list)).catch(err => res.status(404).send(err))
    },

    getTurnosPorFechaYMedico(req, res){
        const [fechaInicio, fechaFin] = formatFecha(req.body.fecha)
        return Turno.findAll({
            where: {
                especialidad_id: req.body.especialidad_id,
                medico_id: req.body.medico_id,
                paciente_id: null,
                fecha_inicio:{
                    [Op.between]: [fechaInicio, fechaFin]
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
        }).then(list => res.status(200).send(list)).catch(err => res.status(404).send(err))
    },

    getTurnos(req, res){
        let condiciones = {}
        if(req.body.fecha && req.body.medico_id){
            const [fechaInicio, fechaFin] = formatFecha(req.body.fecha)
            condiciones = {
                where: {
                    especialidad_id: req.body.especialidad_id,
                    medico_id: req.body.medico_id,
                    paciente_id: null,
                    fecha_inicio:{
                        [Op.between]: [fechaInicio, fechaFin]
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
        }else if(req.body.fecha){
            const [fechaInicio, fechaFin] = formatFecha(req.body.fecha)
            condiciones = {
                where: {
                    especialidad_id: req.body.especialidad_id,
                    paciente_id: null,
                    fecha_inicio:{
                        [Op.between]: [fechaInicio, fechaFin]
                    }
                }
            }
        }else if(req.body.medico_id){
            condiciones = {
                where: {
                    especialidad_id: req.body.especialidad_id,
                    medico_id: req.body.medico_id,
                    paciente_id: null
                }
            }
        }else{
            condiciones = {
                where: {
                    especialidad_id: req.body.especialidad_id,
                    paciente_id: null
                }
            }
        }
        condiciones.include = [{
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
        }];
        return Turno.findAll(condiciones).then(list => res.status(200).send(list)).catch(err => res.status(404).send(err))
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