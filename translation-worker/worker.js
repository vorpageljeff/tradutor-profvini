const amqp = require('amqplib');
const mongoose = require('mongoose');
const { processarMensagem } = require('./handlers/processadorFila');

mongoose.connect('mongodb://localhost:27017/translationdb')
    .then(() => console.log('Worker conectado ao MongoDB'))
    .catch(err => console.error('Erro ao conectar MongoDB no worker', err));

async function iniciarWorker() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue('translation_queue');
    console.log('Worker ouvindo fila de traduções...');

    channel.consume('translation_queue', async msg => {
        const dados = JSON.parse(msg.content.toString());
        await processarMensagem(dados);
        channel.ack(msg);
    });
}

iniciarWorker();