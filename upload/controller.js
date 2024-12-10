const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Directories for uploads
const imageDir = path.join(__dirname, "../upload/images");
const pdfDir = path.join(__dirname, "../upload/pdfs");

// Ensure directories exist
if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir, { recursive: true });
if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir, { recursive: true });

// Multer configuration for images
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, imageDir),
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
});
const uploadImageMiddleware = multer({
    storage: imageStorage,
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            return cb(new Error("Only image files are allowed"), false);
        }
        cb(null, true);
    },
});

// Multer configuration for PDFs
const pdfStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, pdfDir),
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
});
const uploadPDFMiddleware = multer({
    storage: pdfStorage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== "application/pdf") {
            return cb(new Error("Only PDF files are allowed"), false);
        }
        cb(null, true);
    },
});

// Controllers
exports.uploadImage = (req, res) => {
    const upload = uploadImageMiddleware.single("image");
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).send({ message: err.message });
        }
        if (!req.file) {
            return res.status(400).send({ message: "Please upload an image." });
        }
        res.send({
            message: "Image uploaded successfully!",
            file: req.file,
        });
    });
};

exports.uploadPDF = (req, res) => {
    const upload = uploadPDFMiddleware.single("pdf");
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).send({ message: err.message });
        }
        if (!req.file) {
            return res.status(400).send({ message: "Please upload a PDF." });
        }
        res.send({
            message: "PDF uploaded successfully!",
            file: req.file,
        });
    });
};
