const { Especialidad } = require('../models')

module.exports = {

    registrarListaEspera(req, res){
        actualizarArray(req, res);
    }

}

const actualizarArray = async (req, res) => {
    try {
        const espec = await Especialidad.findByPk(req.body.especialidad_id);


        if (Array.isArray(espec.lista_espera)) {
            const array = espec.lista_espera
            array.push({
                id: req.body.paciente_id,
                fecha: new Date()
            });
            espec.lista_espera = array;
        } else {
            espec.lista_espera = [{
                id: req.body.paciente_id,
                fecha: new Date()
            }]
        }

        const response = await espec.save();

        return res.status(200).send(response)
    } catch (e) {
        return res.status(400).send(e);
    }
}