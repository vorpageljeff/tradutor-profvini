const mongoose = require("mongoose");
const {
  connectQueue,
  consumeQueue,
  ackMessage,
} = require("./queue");
const TranslationRequest = require("./models/TranslationRequest");

function mockTranslate(text, targetLanguage) {
  if (targetLanguage === "es") {
    return text.replace(/hello/gi, "olá");
  }
  return `[${targetLanguage}] ${text}`;
}

async function processMessage(msg) {
  if (msg === null) return;

  const content = JSON.parse(msg.content.toString());
  const { requestId, text, targetLanguage = "en" } = content;

  try {
    await TranslationRequest.findOneAndUpdate(
      { requestId },
      { status: "processing", updatedAt: new Date() }
    );

    const translatedText = mockTranslate(text, targetLanguage);

    await TranslationRequest.findOneAndUpdate(
      { requestId },
      {
        status: "completed",
        translatedText,
        updatedAt: new Date(),
        error: null,
      }
    );

    ackMessage(msg);
    console.log(`Request ${requestId} processed successfully.`);
  } catch (error) {
    console.error(`Error processing request ${requestId}:`, error);

    await TranslationRequest.findOneAndUpdate(
      { requestId },
      {
        status: "failed",
        error: error.message,
        updatedAt: new Date(),
      }
    );

    ackMessage(msg);
  }
}

async function startWorker() {
  try {
    await mongoose.connect("mongodb://localhost:27017/translation_db");
    console.log("MongoDB connected");

    await connectQueue();
    consumeQueue(processMessage);

    console.log("Worker listening to queue");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

startWorker();
