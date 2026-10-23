const Translation = require('../models/Translation');

async function processarMensagem(message) {
    const { requestId, text, targetLanguage } = message;
    try {
        await Translation.findOneAndUpdate({ requestId }, { status: 'processando' });
        const traducao = text.split('').reverse().join('') + ` (${targetLanguage})`;
        await Translation.findOneAndUpdate({ requestId }, {
            translatedText: traducao,
            status: 'concluída',
            updatedAt: new Date()
        });
    } catch (err) {
        await Translation.findOneAndUpdate({ requestId }, { status: 'falhou' });
    }
}

module.exports = { processarMensagem };