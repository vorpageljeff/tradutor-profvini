const Translation = require('../models/Translation');
const { sendToQueue } = require('../utils/queue');
const { validarEntrada } = require('../utils/validacao');

async function criarTraducao(req, res) {
    const { text, targetLanguage } = req.body;
    const erro = validarEntrada(text, targetLanguage);
    if (erro) return res.status(400).json({ erro });

    const requestId = require('uuid').v4();
    await Translation.create({ requestId, originalText: text, targetLanguage, status: 'pendente' });
    await sendToQueue({ requestId, text, targetLanguage });

    res.status(202).json({ mensagem: 'Tradução adicionada à fila.', requestId });
}

async function obterTraducao(req, res) {
    const { requestId } = req.params;
    const traducao = await Translation.findOne({ requestId });
    if (!traducao) return res.status(404).json({ erro: 'Tradução não encontrada.' });

    res.json(traducao);
}

module.exports = { criarTraducao, obterTraducao };