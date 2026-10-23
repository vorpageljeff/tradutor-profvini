const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const translationRoutes = require('./routes/translationRoutes');
require('./utils/queue').connectQueue();

const app = express();
app.use(bodyParser.json());
app.use('/api/traducoes', translationRoutes);

mongoose.connect('mongodb://localhost:27017/translationdb')
    .then(() => {
        console.log('Conectado ao MongoDB');
        app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
    })
    .catch(err => console.error('Erro ao conectar no MongoDB:', err));