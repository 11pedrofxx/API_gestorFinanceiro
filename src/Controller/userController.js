import { Router } from "express";
import * as db from '../Service/userService.js';
import { padraoErro } from "../Utils/erroGlobal.js";

const endpoints = Router();

endpoints.post('/user', async (req, resp) => {

    try {
        console.log('comecou')
        let usuario = req.body;
        let linhasAfetadas = await db.CriarContaService(usuario);
        resp.send({ linhasAfetadas });

    } catch (error) {
        resp.status(400).send(padraoErro(error));
    }

})

endpoints.post('/login', async (req, resp) => {
    try {

        let info = req.body;
        let token = await db.LoginService(info);
        resp.send(token)

    } catch (error) {

        resp.status(400).send(padraoErro(error));

    }
})

export default endpoints