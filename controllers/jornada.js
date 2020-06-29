const { Jornada, Turno, Medico, Especialidad, Usuario } = require('../models')

module.exports = {
    create(req, res) {
        return Jornada.create({
            fecha_inicio: req.body.fecha_inicio,
            fecha_fin: req.body.fecha_fin,
            sede: req.body.sede,
            estado: req.body.estado,
            medico_id: req.body.medico_id,
            especialidad_id: req.body.especialidad_id
        }).then(obj => res.status(201).send(obj)).catch(err => res.status(400).send(err))
    },

    list(_, res) {
        return Jornada.findAll({
            include: [{
                model: Turno,
                as: 'turnos'
            }, {
                model: Medico,
                as: 'medico',
                include: [{
                    model: Usuario,
                    as: 'datos'
                }]
            }, {
                model: Especialidad,
                as: 'especialidad'
            }],

            order: [
                [{ model: Turno, as: 'turnos' }, 'fecha_inicio', 'asc']
            ]
        }).then(list => res.status(200).send(list)).catch(err => res.status(400).send(err))
    },

    eliminarJornada(req, res){
        return Jornada.findByPk(req.body.jornada_id).then(jornada => 
            jornada.destroy().then(() => res.sendStatus(200))
            .catch(err=> res.status(400).send(err)))
            .catch(err=> res.status(400).send(err))
    }
}