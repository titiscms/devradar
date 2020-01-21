const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const routes = require('./routes');
const { setupWebSocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebSocket(server);

mongoose.connect('mongodb+srv://root:root@cluster0-wdten.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);


// Métodos HTTP: GET, POST, PUT, DELETE

// Tipos de parâmentros:

// Query Params: request.query(Filtros, ordenação, paginação...)
// Route Params: request.params(Identificar um recurso na alteração ou remoção)
// Body: request.body(Dados para criação ou alteração de um registro)

// MongoDB (Não-Relacional)

// app.use(cors({ origin: 'http://localhost:3000' })); assim é especifico
// app.use(cors()); //assim libera acesso para todo tipo de aplicação