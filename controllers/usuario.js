const { Usuario, Medico, Paciente, Especialidad } = require('../models');

module.exports = {
    verificarUsuario(req, res) {
        Usuario.findOne({
            where: {
                email: req.body.email,
                password: req.body.password
            },
            include: [{
                model: Medico,
                as: 'medico',
                include: {
                    model: Especialidad,
                    as: 'especialidades',
                    through: {
                        attributes: []
                    }
                }
            }, {
                model: Paciente,
                as: 'paciente'
            }],
            order: [
                [{model: Medico, as: 'medico'},{model:Especialidad, as: 'especialidades'}, 'titulo', 'asc']
            ]
        }).then(usuario => {
            if (!usuario) {
                return res.status(404).send({ message: 'Usuario no encontrado' })
            } else {
                return res.status(200).send(usuario)
            }
        })
    },

    verificarCuenta(req, res){
        Usuario.findOne({
            where: {
                email: req.body.email,
                dni: req.body.dni,
                nro_socio: req.body.nro_socio
            },
            include: [{
                model: Medico,
                as: 'medico',
                include: {
                    model: Especialidad,
                    as: 'especialidades',
                    through: {
                        attributes: []
                    }
                }
            }, {
                model: Paciente,
                as: 'paciente'
            }],
            order: [
                [{model: Medico, as: 'medico'},{model:Especialidad, as: 'especialidades'}, 'titulo', 'asc']
            ]
        }).then(usuario => {
            if (!usuario) {
                return res.status(404).send({ message: 'Usuario no encontrado' })
            } else {
                return res.status(200).send(usuario)
            }
        })
    },

    updatePassword(req, res){
        Usuario.update({
            password: req.body.password
        },{
            where: {
                id: req.body.usuario_id
            }
        }).then(obj => {
            if(obj[0] != 0){
                return Usuario.findByPk(req.body.usuario_id, {
                    include: [{
                        model: Medico,
                        as: 'medico',
                        include: {
                            model: Especialidad,
                            as: 'especialidades',
                            through: {
                                attributes: []
                            }
                        }
                    }, {
                        model: Paciente,
                        as: 'paciente'
                    }],
                    order: [
                        [{model: Medico, as: 'medico'},{model:Especialidad, as: 'especialidades'}, 'titulo', 'asc']
                    ]
                }).then(user => res.status(200).send(user)).catch(err => res.status(404).send(err))
            }else{
                return res.status(400).send({message: 'No se pudo actualizar la contraseña'})
            }
        }).catch(err => res.status(404).send(err))
    }
}