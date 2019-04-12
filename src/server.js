const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require('cors');

const app = express();

// Lets any user access that application
app.use(cors());

// Allow server to receive websocket requests
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Everytime user establish a new connection it is isolated from other users connection in his own box
io.on("connection", socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    })
});

mongoose.connect('mongodb+srv://vitordiniz:sophia12@cluster0-mhtlw.mongodb.net/omnistack?retryWrites=true', {
    useNewUrlParser: true
});

app.use((req, res, next) => {
    // Makes io accessible to any request in application
    req.io = io;

    // Let the middleware continue its other processes
    return next();
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(require('./routes'));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

server.listen(process.env.PORT || 3333);
