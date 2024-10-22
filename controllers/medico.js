const { Op } = require('sequelize')
const { Usuario, Medico, Especialidad, Jornada, Turno, Paciente } = require('../models')


function formatFecha(fecha) {
    let fechaInicio = new Date(fecha);
    fechaInicio.setHours(0, 0, 0, 0);
    let fechaFin = new Date(fecha);
    fechaFin.setHours(24, 0, 0, 0)
    return [fechaInicio, fechaFin]
}


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
            Medico.create({
                usuario_id: response[0].dataValues.id,
                nro_matricula: req.body.nro_matricula,
                foto_carnet: req.body.foto_carnet,
                lista_espera: []
            }).then(obj => res.status(201).send(obj))
                .catch(err => res.status(400).send(err))
        }).catch(err => res.status(400).send(err))
    },

    list(_, res) {
        return Medico.findAll({
            include: [{
                model: Usuario,
                as: 'datos'
            }, {
                model: Especialidad,
                as: 'especialidades',
                attributes: { exclude: ['lista_espera'] },
                through: {
                    attributes: []
                }
            }, {
                model: Jornada,
                as: 'jornadas'
            }, {
                model: Turno,
                as: 'turnos'
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
                            status: true
                        }
                    }).then(obj => res.status(201).send(obj))
                        .catch(err => res.status(400).send(err))
                }).catch(err => res.status(400).send(err))
            }).catch(err => res.status(400).send(err))
    },

    getJornadasMedico(req, res) {
        return Medico.findByPk(req.body.medico_id).then(medico => {
            if(!medico){
                return res.status(404).send({message: 'Médico no encontrado'})
            }
            return medico.getJornadas({
                include: [{
                    model: Turno,
                    as: 'turnos',
                    attributes: ['id', 'fecha_inicio', 'fecha_fin', 'sede', 'estado', 'paciente_id'],
                    include: [
                        {
                            model: Paciente,
                            as: 'paciente',
                            attributes: ['id', 'obra_social', 'plan', 'os_nro'],
                            include: [{
                                model: Usuario,
                                as: 'datos',
                                attributes: ['nombre', 'apellido']
                            }]
                        }
                    ]
                }, {
                    model: Especialidad,
                    as: 'especialidad',
                    attributes: ['id', 'titulo']
                }],
                order: [
                    ['fecha_inicio', 'asc'],
                    [{ model: Turno, as: 'turnos' }, 'fecha_inicio', 'asc']
                ]
            }).then(jornadas => {
                if (!jornadas) {
                    return res.status(404).send({ message: 'Ha ocurrido un error' })
                }
                return res.status(200).send(jornadas)
            }).catch(err => res.status(404).send(err))
        }).catch(err => res.status(404).send(err))
    },

    getJornadaDeHoy(req, res){
        return Medico.findByPk(req.body.medico_id).then(medico => {
            const [fechaInicio, fechaFin] = formatFecha(new Date());
            if(!medico){
                return res.status(404).send({message: 'Médico no encontrado'})
            }
            return medico.getJornadas({
                where: {
                    fecha_inicio:{
                        [Op.between]: [fechaInicio, fechaFin]
                    }
                },
                include: [{
                    model: Turno,
                    as: 'turnos',
                    attributes: ['id', 'fecha_inicio', 'fecha_fin', 'sede', 'estado', 'paciente_id'],
                    include: [
                        {
                            model: Paciente,
                            as: 'paciente',
                            attributes: ['id', 'obra_social', 'plan', 'os_nro'],
                            include: [{
                                model: Usuario,
                                as: 'datos',
                                attributes: ['nombre', 'apellido']
                            }]
                        }
                    ]
                }, {
                    model: Especialidad,
                    as: 'especialidad',
                    attributes: ['id', 'titulo']
                }],
                order: [
                    ['fecha_inicio', 'asc'],
                    [{ model: Turno, as: 'turnos' }, 'fecha_inicio', 'asc']
                ]
            }).then(jornadas => {
                if (!jornadas) {
                    return res.status(404).send({ message: 'Ha ocurrido un error' })
                }
                return res.status(200).send(jornadas)
            }).catch(err => res.status(404).send(err))
        })
    },


    registrarListaEspera(req, res){
        actualizarArray(req, res)
    }

    
    

}

const actualizarArray = async (req, res) => {
    try {
        const medico = await Medico.findByPk(req.body.medico_id);


        if (Array.isArray(medico.lista_espera)) {
            const array = medico.lista_espera
            array.push({
                id: req.body.paciente_id,
                fecha: new Date()
            });
            medico.lista_espera = array;
        } else {
            medico.lista_espera = [{
                id: req.body.paciente_id,
                fecha: new Date()
            }]
        }

        const response = await medico.save();

        return res.status(200).send(response)
    } catch (e) {
        return res.status(400).send(e);
    }
}