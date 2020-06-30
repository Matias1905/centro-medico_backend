const { Paciente, Turno, Usuario } = require('../models')

module.exports = {
    create(req, res) {
        return Usuario.findOrCreate({
            where: {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
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
                os_nro: req.body.os_nro,
                turnos_cancelados: []
            }).then(obj => res.status(201).send(obj))
                .catch(err => res.status(400).send(err))
        }).catch(err => res.status(400).send(err))
    },

    list(_, res) {
        return Paciente.findAll({
            include: [{
                model: Usuario,
                as: 'datos'
            }, {
                model: Turno,
                as: 'turnos'
            }]
        }).then(list => res.status(200).send(list)).catch(err => res.status(400).send(err))
    },


    registrarDeuda(req, res){
        actualizarArray(req, res)
    }

}

const actualizarArray = async (req, res) => {
    try {
        const paciente = await Paciente.findByPk(req.body.paciente_id);


        if (Array.isArray(paciente.turnos_cancelados)) {
            console.log(paciente.turnos_cancelados)
            const array = paciente.turnos_cancelados
            array.push({
                id: req.body.turno_id,
                fecha: new Date()
            });
            paciente.turnos_cancelados = array;
        } else {
            paciente.turnos_cancelados = [{
                id: req.body.turno_id,
                fecha: new Date()
            }]
        }

        const response = await paciente.save();

        return res.status(200).send(response)
    } catch (e) {
        return res.status(400).send(e);
    }


}