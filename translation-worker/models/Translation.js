const mongoose = require('mongoose');

const TranslationSchema = new mongoose.Schema({
    requestId: String,
    originalText: String,
    translatedText: String,
    targetLanguage: String,
    status: String,
    createdAt: Date,
    updatedAt: Date
});

module.exports = mongoose.model('Translation', TranslationSchema);