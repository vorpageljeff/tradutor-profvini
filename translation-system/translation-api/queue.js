const amqp = require("amqplib");

let channel;

async function connectQueue() {
  const connection = await amqp.connect("amqp://localhost");
  channel = await connection.createChannel();
  await channel.assertQueue("translation_requests", { durable: true });
  return channel;
}

function sendToQueue(msg) {
  if (!channel) throw new Error("Queue channel not connected");
  channel.sendToQueue("translation_requests", Buffer.from(JSON.stringify(msg)), {
    persistent: true,
  });
}

module.exports = { connectQueue, sendToQueue };
