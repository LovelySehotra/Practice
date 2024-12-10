const express = require("express");
const { uploadImage, uploadPDF } = require("./controller.js");

const router = express.Router();

// Routes for uploading files
router.post("/upload/image", uploadImage);
router.post("/upload/pdf", uploadPDF);

module.exports = router;
