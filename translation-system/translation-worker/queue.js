const amqp = require("amqplib");

let channel;

async function connectQueue() {
  const connection = await amqp.connect("amqp://localhost");
  channel = await connection.createChannel();
  await channel.assertQueue("translation_requests", { durable: true });
  return channel;
}

function consumeQueue(onMessage) {
  if (!channel) throw new Error("Queue channel not connected");
  channel.consume("translation_requests", onMessage, { noAck: false });
}

function ackMessage(msg) {
  channel.ack(msg);
}

module.exports = { connectQueue, consumeQueue, ackMessage };
