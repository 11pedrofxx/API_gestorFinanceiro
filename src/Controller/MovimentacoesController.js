import { response, Router } from "express";
import { autenticarToken } from "../Utils/middleware.js";
import * as service from '../Service/movimentacoesService.js';
import { padraoErro } from "../Utils/erroGlobal.js";
import { buscarMovimentacao } from "../Repository/movimentacoesRepository.js";

const endpoints = Router();

endpoints.post('/registrar-entrada', autenticarToken,  async (req, resp) => {

    try {
        let usuario_id = req.usuario.id
        let info = req.body

        let linhasAfetadas = await service.EntradaService(usuario_id, info);
        resp.send({linhasAfetadas});
    } catch (error) {
        resp.status(400).send(padraoErro(error));
    }

})

endpoints.post('/registrar-saida', autenticarToken, async (req, resp) => {

    try {
        let usuario_id = req.usuario.id
        let info = req.body

        let linhasAfetadas = await service.SaidaService(usuario_id, info);
        resp.send({linhasAfetadas});
    } catch (error) {
        resp.status(400).send(padraoErro(error));
    }

})

endpoints.get('/consulta-saldo' , autenticarToken, async (req, resp) => {

    try {
        
        let id = req.usuario.id;
        let saldo = await service.ConsultaSaldoService(id);
        resp.send(saldo);

    } catch (error) {
        resp.status(400).send(padraoErro(error));
    }

})

endpoints.delete('/deletar-movimentacao', autenticarToken, async (req, resp) => {
    try {
        const usuarioId = req.usuario.id;
        const { idMovimentacao } = req.body;

        const linhasAfetadas = await service.DeletarMovimentacaoService(idMovimentacao, usuarioId);
        resp.send({ linhasAfetadas });
    } catch (error) {
        resp.status(400).send(padraoErro(error));
    }
});

export default endpoints