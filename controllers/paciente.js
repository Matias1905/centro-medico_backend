const {Paciente, Turno, Usuario} = require('../models')

module.exports = {
    create(req, res){
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
            Paciente.create({
                usuario_id: response[0].dataValues.id,
                es_deudor: req.body.es_deudor,
                obra_social: req.body.obra_social,
                plan: req.body.plan,
                os_nro: req.body.os_nro
            }).then(obj => res.status(201).send(obj))
            .catch(err => res.status(400).send(err))
        }).catch(err => res.status(400).send(err))
    },

    list(_, res){
        return Paciente.findAll({
            include: [{
                model: Usuario,
                as: 'datos',
                attributes: ['nombre', 'email', 'nro_socio', 'genero']
            },{
                model: Turno,
                as: 'turnos',
                attributes: ['fecha_inicio', 'fecha_fin', 'sede', 'estado']
            }]
        }).then(list => res.status(200).send(list)).catch(err => res.status(400).send(err))
    },


}