# Centro Médico Arduino

## Back-end application

***

### Base de Datos

Usamos una base de datos SQL con el siguiente formato.



***

### Servicios REST:

URL: `localhost:8000/api`


#### Insertar Médico

`POST` - `/insertarMedico`

Inserta un médico en la base de datos.

* **Parámetros**

`nombre`, `username`, `password`, `nro_socio`, `genero`

* **Devuelve**

En caso de terminar correctamente, el método devuelve un código `201: Created` y el objeto creado como se encuentra en la base de datos.
En caso de error, el método devuelve un código `400: Bad Request` y el mensaje de error correspondiente.

