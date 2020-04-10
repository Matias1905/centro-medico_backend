const { Jornada, Turno, Medico, Especialidad } = require('../models')

module.exports = {
    create(req, res){
        return Jornada.create({
            fecha_inicio: req.body.fecha_inicio,
            fecha_fin: req.body.fecha_fin,
            sede: req.body.sede,
            medico_id: req.body.medico_id,
            especialidad_id: req.body.especialidad_id
        }).then(obj => res.status(201).send(obj)).catch(err => res.status(400).send(err))
    },

    list(_, res){
        return Jornada.findAll({
            include: [{
                model: Turno,
                as: 'turnos',
                attributes: ['fecha_inicio', 'fecha_fin', 'sede', 'estado']
            },{
                model: Medico,
                as: 'medico',
                attributes: ['nombre', 'nro_socio', 'genero']
            },{
                model: Especialidad,
                as: 'especialidad',
                attributes: ['titulo']
            }]
        }).then(list => res.status(200).send(list)).catch(err => res.status(400).send(err))
    }
}