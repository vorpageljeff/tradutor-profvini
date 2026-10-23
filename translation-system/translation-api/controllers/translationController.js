const { v4: uuidv4 } = require("uuid");
const TranslationRequest = require("../models/TranslationRequest");
const { sendToQueue } = require("../queue");

const createTranslationRequest = async (req, res) => {
  try {
    const { text, targetLanguage = "en" } = req.body;

    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "O campo 'text' é obrigatório e deve ser uma string." });
    }

    const requestId = uuidv4();

    const newRequest = new TranslationRequest({
      requestId,
      originalText: text,
      status: "queued",
      targetLanguage,
    });

    await newRequest.save();

    sendToQueue({ requestId, text, targetLanguage });

    return res.status(202).json({
      message: "Solicitação de tradução enfileirada com sucesso.",
      requestId,
      status: "queued",
    });
  } catch (error) {
    console.error("Erro ao enfileirar tradução:", error);
    res.status(500).json({ error: "Erro interno ao processar a solicitação." });
  }
};

const getTranslationStatus = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await TranslationRequest.findOne({ requestId });

    if (!request) {
      return res.status(404).json({ error: "Solicitação de tradução não encontrada." });
    }

    res.json({
      requestId: request.requestId,
      status: request.status,
      originalText: request.originalText,
      translatedText: request.translatedText,
      error: request.error,
      createdAt: request.createdAt,
      updatedAt: request.updatedAt,
      targetLanguage: request.targetLanguage,
    });
  } catch (error) {
    console.error("Erro ao buscar status da tradução:", error);
    res.status(500).json({ error: "Erro interno ao buscar status da solicitação." });
  }
};

module.exports = {
  createTranslationRequest,
  getTranslationStatus,
};
