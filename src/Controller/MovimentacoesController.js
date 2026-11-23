import { Router } from "express";
import { autenticarToken } from "../Utils/middleware.js";
import * as service from '../Service/movimentacoesService.js';
import { padraoErro } from "../Utils/erroGlobal.js";

const endpoints = Router();

endpoints.post('/registar-entrada', autenticarToken,  async (req, resp) => {

    try {
        let usuario_id = req.usuario.id
        let info = req.body

        let linhasAfetadas = await service.EntradaService(usuario_id, info);
        resp.send({linhasAfetadas});
    } catch (error) {
        resp.status(400).send(padraoErro(error));    
    }

})


export default endpoints