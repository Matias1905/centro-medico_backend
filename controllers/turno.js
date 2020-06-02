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
                attributes: ['id', 'nro_matricula'],
                include: [{
                    model: Usuario,
                    as: 'datos',
                    attributes: ['nombre', 'nro_socio', 'genero', 'fecha_nac']
                }]
            },{
                model: Especialidad,
                as: 'especialidad',
                attributes: ['titulo']
            },{
                model: Paciente,
                as: 'paciente',
                attributes: ['id', 'es_deudor'],
                include: [{
                    model: Usuario,
                    as: 'datos',
                    attributes: ['nombre', 'nro_socio', 'genero', 'fecha_nac']
                }]
            }]
        }).then(list => res.status(200).send(list)).catch(err => res.status(400).send(err))
    }
}