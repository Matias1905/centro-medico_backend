const { Medico, Paciente, Turno, Especialidad, Jornada } = require('../models');

module.exports = {
    verificarUsuario(req, res) {
        const paciente = Paciente.findOne({
            where: {
                username: req.body.username,
                password: req.body.password
            }
        })

        const medico = Medico.findOne({
            where: {
                username: req.body.username,
                password: req.body.password
            }
        })

        Promise.all([paciente, medico]).then(responses => {
            if (!responses[0] && !responses[1]) {
                return res.status(404).send({ message: 'Usuario no encontrado' })
            } else if (!responses[1]) {
                console.log(responses[1])
                return res.status(200).send({ paciente: responses[0], medico: null })
            } else if (!responses[0]) {
                return res.status(200).send({ paciente: null, medico: responses[1] })
            } else {
                return res.status(200).send({ paciente: responses[0], medico: responses[1] })
            }
        }).catch(err => res.status(400).send(err))
    },



    getTurnosPaciente(req, res) {
        return Paciente.findByPk(req.body.paciente_id).then(paciente => {
            if (!paciente) {
                return res.status(404).send({ message: 'Paciente no encontrado' })
            }
            return paciente.getTurnos({
                include: [{
                    model: Medico,
                    as: 'medico'
                }, {
                    model: Especialidad,
                    as: 'especialidad'
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
                return res.status(404).send({ message: "Especialidad no encontrada"})
            }
            return esp.getTurnos({
                where: {
                    paciente_id: null
                },
                include: [{
                    model: Medico,
                    as: 'medico'
                }, {
                    model: Especialidad,
                    as: 'especialidad'
                }]
            }).then(list => res.status(200).send(list)).catch(err => res.status(400).send(err))
        }).catch(err => res.status(400).send(err))
    },

    getMedicosEspecialidad(req, res){
        return Especialidad.findOne({
            where: {
                titulo: req.body.titulo
            }
        }).then(esp => {
            if(!esp){
                return res.status(404).send({message: 'Especialidad no encontrada'})
            }
            return esp.getMedicos({
                include: [{
                    model: Turno,
                    as: 'turnos'
                }]
            }).then(list => res.status(200).send(list)).catch(err => res.status(400).send(err))
        }).catch(err => res.status(400).send(err))
    }, 
    

    cancelarTurno(req, res){
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