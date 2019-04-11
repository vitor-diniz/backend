const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();

const BoxController = require("./controllers/BoxController");
const FileController = require("./controllers/FileController");


// API rest => GET/POST/PUT/DELETE
routes.post('/boxes', BoxController.store);
routes.get('/boxes/:id', BoxController.show);
// Id refers to current box id, becoming easier to recognize which box is being used
routes.post('/boxes/:id/files', multer(multerConfig).single('file'), FileController.store);

module.exports = routes;
