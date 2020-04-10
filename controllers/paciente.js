const {Paciente, Turno} = require('../models')

module.exports = {
    create(req, res){
        return Paciente.create({
            nombre: req.body.nombre,
            username: req.body.username,
            password: req.body.password,
            nro_socio: req.body.nro_socio,
            fecha_nac: req.body.fecha_nac,
            genero: req.body.genero,
            es_deudor: req.body.es_deudor
        }).then(obj => res.status(201).send(obj)).catch(err => res.status(400).send(err))
    },

    list(_, res){
        return Paciente.findAll({
            include: {
                model: Turno,
                as: 'turnos',
                attributes: ['fecha_inicio', 'fecha_fin', 'sede', 'estado']
            }
        }).then(list => res.status(200).send(list)).catch(err => res.status(400).send(err))
    },


}