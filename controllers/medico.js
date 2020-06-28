const { Usuario, Medico, Especialidad, Jornada, Turno } = require('../models')

module.exports = {
    create(req, res) {
        return Usuario.findOrCreate({
            where: {
                nombre: req.body.nombre,
                dni: req.body.dni,
                email: req.body.email,
                password: req.body.password,
                nro_socio: req.body.nro_socio,
                fecha_nac: new Date(req.body.fecha_nac),
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                genero: req.body.genero
            }
        }).then(response => {
            Medico.create({
                usuario_id: response[0].dataValues.id,
                nro_matricula: req.body.nro_matricula,
                foto_carnet: req.body.foto_carnet
            }).then(obj => res.status(201).send(obj))
                .catch(err => res.status(400).send(err))
        }).catch(err => res.status(400).send(err))
    },

    list(_, res) {
        return Medico.findAll({
            include: [{
                model: Usuario,
                as: 'datos'
            }, {
                model: Especialidad,
                as: 'especialidades',
                through: {
                    attributes: []
                }
            }, {
                model: Jornada,
                as: 'jornadas'
            }, {
                model: Turno,
                as: 'turnos'
            }]
        }).then(list => res.status(200).send(list)).catch(err => res.status(400).send(err))
    },

    addEspecialidad(req, res) {
        const espec = Especialidad.findOrCreate({
            where: {
                titulo: req.body.especialidad
            }
        })

        Promise.all([espec])
            .then(response => {
                Medico.findByPk(req.body.medico_id).then(medico => {
                    if (!medico) {
                        return res.status(400).send({ message: 'Médico no encontrado' })
                    }
                    response[0][0].addMedico(medico, {
                        through: {
                            status: true
                        }
                    }).then(obj => res.status(201).send(obj))
                        .catch(err => res.status(400).send(err))
                }).catch(err => res.status(400).send(err))
            }).catch(err => res.status(400).send(err))
    },

    getJornadasMedico(req, res) {
        return Medico.findByPk(req.body.medico_id).then(medico => {
            return medico.getJornadas({
                include: [{
                    model: Turno,
                    as: 'turnos',
                    attributes: ['fecha_inicio', 'fecha_fin', 'sede', 'estado']
                }, {
                    model: Especialidad,
                    as: 'especialidad',
                    attributes: ['titulo']
                }],
                order: [
                    ['fecha_inicio', 'asc'],
                    [{ model: Turno, as: 'turnos' }, 'fecha_inicio', 'asc']
                ]
            }).then(jornadas => {
                if (!jornadas) {
                    return res.status(404).send({ message: 'Ha ocurrido un error' })
                }
                return res.status(200).send(jornadas)
            }).catch(err => res.status(404).send(err))
        }).catch(err => res.status(404).send(err))
    },


}