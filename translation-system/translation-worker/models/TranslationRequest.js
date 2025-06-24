const mongoose = require("mongoose");

const TranslationRequestSchema = new mongoose.Schema({
  requestId: { type: String, unique: true, required: true },
  originalText: { type: String, required: true },
  translatedText: { type: String, default: null },
  status: {
    type: String,
    enum: ["queued", "processing", "completed", "failed"],
    default: "queued",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  targetLanguage: { type: String, default: "en" },
  error: { type: String, default: null }
});

TranslationRequestSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model("TranslationRequest", TranslationRequestSchema);
