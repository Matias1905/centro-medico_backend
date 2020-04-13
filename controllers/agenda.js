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
            especialidad_id: req.body.especialidad_id
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
    }

}