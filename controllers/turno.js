const {Turno, Medico, Especialidad, Paciente, Usuario} = require('../models')

module.exports = {
    create(req, res){
        return Turno.create({
            fecha_inicio: req.body.fecha_inicio,
            fecha_fin: req.body.fecha_fin,
            sede: req.body.sede,
            estado:req.body.estado,
            medico_id: req.body.medico_id,
            especialidad_id: req.body.especialidad_id,
            jornada_id: req.body.jornada_id
        }).then(obj => res.status(201).send(obj)).catch(err => res.status(400).send(err))
    },

    list(_, res){
        return Turno.findAll({
            include: [{
                model: Medico,
                as: 'medico',
                attributes: { exclude: ['lista_espera'] },
                include: [{
                    model: Usuario,
                    as: 'datos'
                }]
            },{
                model: Especialidad,
                as: 'especialidad'
            },{
                model: Paciente,
                as: 'paciente',
                include: [{
                    model: Usuario,
                    as: 'datos'
                }]
            }]
        }).then(list => res.status(200).send(list)).catch(err => res.status(400).send(err))
    }
}