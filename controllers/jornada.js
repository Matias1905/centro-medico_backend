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
                as: 'turnos',
                attributes: ['fecha_inicio', 'fecha_fin', 'sede', 'estado']
            }, {
                model: Medico,
                as: 'medico',
                attributes: ['nro_matricula'],
                include: [{
                    model: Usuario,
                    as: 'datos',
                    attributes: ['nombre', 'nro_socio', 'genero']
                }]
            }, {
                model: Especialidad,
                as: 'especialidad',
                attributes: ['titulo']
            }],

            order: [
                [{ model: Turno, as: 'turnos' }, 'fecha_inicio', 'asc']
            ]
        }).then(list => res.status(200).send(list)).catch(err => res.status(400).send(err))
    }
}