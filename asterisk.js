let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

var namiConfig = {
    host: "10.109.36.195",
    port: 5038,
    username: "bos",
    secret: "Bthfh[bZ"
};
var namiLib = require('nami');
var nami = new (require("nami").Nami)(namiConfig);
nami.on('namiEvent', function (event) {
    console.log('/////////////////////////////////////////////////////////////////////////////////////////////////////')
    console.log(event.lines[0]);
    console.log(event.lines[1]);
    console.log(event.lines[2]);
    io.emit('new-message', { message: event});

});
nami.on('namiEventDial', function (event) { });
nami.on('namiEventVarSet', function (event) { });
nami.on('namiEventHangup', function (event) { });
process.on('SIGINT', function () {
    nami.close();
    process.exit();
});

nami.open();

// socket io
io.on('connection', function (socket) {
    console.log('User connected');

    socket.on('disconnect', function() {
        console.log('User disconnected');
    });
    socket.on('save-message', function (data) {
        console.log(data);
        io.emit('new-message', { message: data });
    });
});

http.listen(4242, () => {
    console.log('started on port 4242');
});