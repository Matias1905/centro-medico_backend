# Centro Médico Arduino

## Back-end application

***

### Base de Datos

Usamos una base de datos SQL con el siguiente formato.



***

### Servicios REST:

URL: `localhost:8000/api`

***


#### Verificar Usuario

`POST` - `/verificarUsuario`

Verifica las credenciales de un usuario para su login en el sistema.

* **Parámetros**

`username`, `password`

* **Devuelve**

Mensaje de éxito: `200 - OK` - `{medico: Medico || null, paciente: Paciente || null}`

Mensaje de error: `404 - Not found`

***

#### Obtener turnos del paciente

`POST`- `/getTurnosPaciente`

Devuelve la lista de turnos solicitados por un paciente determinado.

* **Parámetros**

`paciente_id`

* **Devuelve**

Mensaje de éxito: `200 - OK` - `{turnos: Turno[]}`

Mensaje de error: `404 - Not found`

***

#### Pedir turno

`POST`- `/pedirTurno`

Genera la conexión entre un turno y un paciente.

* **Parámetros**

`turno_id`,`paciente_id`

* **Devuelve**

Mensaje de éxito: `200 - OK`

Mensaje de error: `404 - Not found`

***

#### Confirmar turno

`POST`- `/confirmarTurno`

Cambia el estado de un turno determinado a "confirmado".

* **Parámetros**

`turno_id`

* **Devuelve**

Mensaje de éxito: `200 - OK`

Mensaje de error: `404 - Not found`

***

#### Cancelar turno

`POST`- `/cancelarTurno`

Cambia el estado de un turno determinado a "cancelado".

* **Parámetros**

`turno_id`

* **Devuelve**

Mensaje de éxito: `200 - OK`

Mensaje de error: `404 - Not found`

***

#### Obtener turnos de una Especialidad

`POST`- `/getTurnosEspecialidad`

Devuelve la lista de turnos asignados a una Especialidad determinada.

* **Parámetros**

`titulo`

* **Devuelve**

Mensaje de éxito: `200 - OK` - `{turnos: Turno[]}`

Mensaje de error: `404 - Not found` - `{message: "Especialidad no encontrada"}`

***

#### Obtener médicos de una Especialidad

`POST`- `/getMedicosEspecialidad`

Devuelve la lista de médicos asignados a una Especialidad determinada.

* **Parámetros**

`título`

* **Devuelve**

Mensaje de éxito: `200 - OK` - `{turnos: Turno[]}`

Mensaje de error: `404 - Not found` - `{message: "Especialidad no encontrada"}`

***



