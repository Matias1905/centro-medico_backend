const { Jornada, Turno, Medico, Especialidad, Paciente } = require('../models')

function fraccionarHorario(inicio, fin) {
    let horarios = [];

    let dInicio = new Date(inicio)
    let dFin = new Date(fin)

    let d = new Date(dInicio)
    while (dInicio < dFin) {
        d = new Date(dInicio)
        horarios.push(d)
        dInicio.setMinutes(dInicio.getMinutes() + 30)
    }

    return horarios
}

function generarDiasJornada(inicio, fin) {
    let dias = [];

    let dInicio = new Date(inicio)
    let dFin = new Date(fin)
    let mes = dInicio.getMonth()

    let d1 = new Date(dInicio)

    while (dInicio.getMonth() <= mes) {
        d1 = new Date(dInicio)
        d2 = new Date(dFin)
        dias.push({ fecha_inicio: d1, fecha_fin: d2 })
        dInicio.setDate(dInicio.getDate() + 7)
        dFin.setDate(dFin.getDate() + 7)
    }
    return dias
}

module.exports = {

    generarJornada(req, res) {
        let horarios = fraccionarHorario(req.body.fecha_inicio, req.body.fecha_fin)

        let dInicio = new Date(req.body.fecha_inicio)
        let dFin = new Date(req.body.fecha_fin)

        console.log(dInicio);

        return Jornada.create({
            fecha_inicio: dInicio,
            fecha_fin: dFin,
            sede: req.body.sede,
            medico_id: req.body.medico_id,
            especialidad_id: req.body.especialidad_id,
            estado: "disponible"
        }).then(jor => {
            let turnos = horarios.map((horaIni) => {
                let horaFin = new Date(horaIni)
                horaFin.setMinutes(horaIni.getMinutes() + 30)

                return {
                    fecha_inicio: horaIni,
                    fecha_fin: horaFin,
                    medico_id: req.body.medico_id,
                    especialidad_id: req.body.especialidad_id,
                    sede: req.body.sede,
                    estado: "en espera",
                    jornada_id: jor.id
                }
            })

            Turno.bulkCreate(turnos, { returning: true }).then(obj => res.status(201).send(obj)).catch(err => res.status(400).send(err))
        }).catch(err => res.status(400).send(err))
    },


    generarJornadaPorSemana(req, res) {

        let dias = generarDiasJornada(req.body.fecha_inicio, req.body.fecha_fin);

        let jornadas = dias.map((dia) => {
            return {
                fecha_inicio: dia.fecha_inicio,
                fecha_fin: dia.fecha_fin,
                sede: req.body.sede,
                medico_id: req.body.medico_id,
                especialidad_id: req.body.especialidad_id,
                estado: "disponible"
            }
        })

        Jornada.bulkCreate(jornadas, { returning: true }).then(jornadas => {

            let turnos = []

            jornadas.forEach((jornada) => {
                let horarios = fraccionarHorario(jornada.fecha_inicio, jornada.fecha_fin);

                let turnosDia = horarios.map((horaIni) => {
                    let horaFin = new Date(horaIni)
                    horaFin.setMinutes(horaIni.getMinutes() + 30)

                    return {
                        fecha_inicio: horaIni,
                        fecha_fin: horaFin,
                        sede: req.body.sede,
                        medico_id: req.body.medico_id,
                        especialidad_id: req.body.especialidad_id,
                        estado: "en espera",
                        jornada_id: jornada.id
                    }
                })
                turnos = turnos.concat(turnosDia)
            })

            Turno.bulkCreate(turnos, { returning: true }).then(obj => res.status(201).send(obj)).catch(err => res.status(400).send(err))
        }).catch(err => res.status(400).send(err))
    }
}