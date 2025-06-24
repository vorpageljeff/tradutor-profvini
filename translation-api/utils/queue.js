const amqp = require('amqplib');

let channel;

async function connectQueue() {
    const connection = await amqp.connect('amqp://localhost');
    channel = await connection.createChannel();
    await channel.assertQueue('translation_queue');
    console.log('Conectado à fila RabbitMQ');
}

async function sendToQueue(message) {
    if (!channel) await connectQueue();
    channel.sendToQueue('translation_queue', Buffer.from(JSON.stringify(message)));
}

module.exports = { connectQueue, sendToQueue };