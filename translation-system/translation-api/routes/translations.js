const express = require("express");
const router = express.Router();
const {
  createTranslationRequest,
  getTranslationStatus,
} = require("../controllers/translationController");

router.post("/", createTranslationRequest);
router.get("/:requestId", getTranslationStatus);

module.exports = router;
