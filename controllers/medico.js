const { Medico, Especialidad, Jornada, Turno } = require('../models')

module.exports = {
    create(req, res) {
        return Medico.create({
            nombre: req.body.nombre,
            username: req.body.username,
            password: req.body.password,
            nro_socio: req.body.nro_socio,
            genero: req.body.genero
        }).then(obj => res.status(201).send(obj)).catch(err => res.status(400).send(err))
    },

    list(_, res) {
        return Medico.findAll({
            include: [{
                model: Especialidad,
                as: 'especialidades',
                attributes: ['titulo'],
                through: {
                    attributes: []
                }
            },{
                model: Jornada,
                as: 'jornadas',
                attributes: ['fecha_inicio', 'fecha_fin', 'sede']
            },{
                model: Turno,
                as: 'turnos',
                attributes: ['fecha_inicio', 'fecha_fin', 'sede', 'estado']
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
                            status:true
                        }
                    }).then(obj => res.status(201).send(obj))
                        .catch(err => res.status(400).send(err))
                }).catch(err => res.status(400).send(err))
            }).catch(err => res.status(400).send(err))
    }
}