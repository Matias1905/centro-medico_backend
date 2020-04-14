const { medico, paciente, jornada, turno, main, agenda, usuario } = require('../controllers')

module.exports = (app) => {
    app.get('/api', (req, res) => {
        res.status(200).send({message: 'Api is working correctly'})
    });

    app.post('/api/insertarMedico', medico.create),
    app.get('/api/getMedicos', medico.list),
    app.post('/api/addEspecialidadMedico', medico.addEspecialidad)


    app.post('/api/insertarPaciente', paciente.create),
    app.get('/api/getPacientes', paciente.list)

    app.post('/api/insertarJornada', jornada.create),
    app.get('/api/getJornadas', jornada.list)

    app.post('/api/insertarTurno', turno.create),
    app.get('/api/getTurnos', turno.list)


    //ENDPOINTS REQUIRED BY FRONT-END APP
    app.post('/api/verificarUsuario', usuario.verificarUsuario)
    app.post('/api/verificarCuenta', usuario.verificarCuenta)
    app.post('/api/updatePassword', usuario.updatePassword)



    app.post('/api/getTurnosPaciente', main.getTurnosPaciente)  //Tested!
    app.post('/api/pedirTurno', main.pedirTurno)  //Tested!
    app.post('/api/confirmarTurno', main.confirmarTurno)  //Tested!
    app.post('/api/getTurnosEspecialidad', main.getTurnosEspecialidad)  //Tested!
    app.post('/api/getMedicosEspecialidad', main.getMedicosEspecialidad) //Tested!
    app.post('/api/cancelarTurno', main.cancelarTurno)


    //ENDPOINTS AGENDA
    app.post('/api/generarJornada', agenda.generarJornada)  //Tested!
}