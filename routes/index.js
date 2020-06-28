const { medico, paciente, jornada, turno, main, agenda, usuario, turnospaciente } = require('../controllers')

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
    app.post('/api/verificarUsuario', usuario.verificarUsuario)                         //Tested!
    app.post('/api/verificarCuenta', usuario.verificarCuenta)                           //Tested!
    app.post('/api/updatePassword', usuario.updatePassword)                             //Tested!


    app.get('/api/getEspecialidades', main.getEspecialidades)                           //Tested!
    app.post('/api/getTurnosPaciente', main.getTurnosPaciente)                          //Tested! (eliminar si no se usa)
    app.post('/api/pedirTurno', main.pedirTurno)                                        //Tested!
    app.post('/api/confirmarTurno', main.confirmarTurno)                                //Tested!
    app.post('/api/getMedicosEspecialidad', main.getMedicosEspecialidad)                //Tested! (eliminar si no se usa)
    app.post('/api/cancelarTurno', main.cancelarTurno)                                  //Tested!

    app.post('/api/cancelarTurnoCentroMedico', main.cancelarTurnoCM)                    //Tested!

    app.post('/api/getTurnosActivosPaciente', turnospaciente.getTurnosActivosPaciente)  //Tested!
    app.post('/api/getHistorialPaciente', turnospaciente.getTurnosHistorialPaciente)    //Tested!

    app.post('/api/getTurnos', main.getTurnos)                                          //Tested!
    app.post('/api/getJornadasMedico', medico.getJornadasMedico)                        //Tested!

    //ENDPOINTS AGENDA
    app.post('/api/generarJornada', agenda.generarJornada)                              //Tested!
    app.post('/api/generarJornadaSemanal', agenda.generarJornadaPorSemana)              //Tested!

    app.post('/api/agregarTurnos', agenda.agregarTurnos)                                //Tested!
    app.post('/api/eliminarTurnos', agenda.eliminarTurnos)                              //Tested! (eliminar si no se usa)
    app.post('/api/eliminarTurnosById', agenda.eliminarTurnosById)                      //Tested!

}