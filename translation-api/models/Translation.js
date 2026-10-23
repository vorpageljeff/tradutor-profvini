const mongoose = require('mongoose');

const TranslationSchema = new mongoose.Schema({
    requestId: String,
    originalText: String,
    translatedText: String,
    targetLanguage: String,
    status: { type: String, enum: ['pendente', 'processando', 'concluída', 'falhou'] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Translation', TranslationSchema);