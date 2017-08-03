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
    //io.emit('new-message', { message: event});
});
nami.on('namiEventConfbridgeStart', function (event) {
    io.emit('ConfbridgeStart-event', { event: event});
});
nami.on('namiEventConfbridgeJoin', function (event) {
    io.emit('ConfbridgeJoin-event', { event: event});
});
nami.on('namiEventConfbridgeLeave', function (event) {
    io.emit('ConfbridgeLeave-event', { event: event});
});
nami.on('namiEventConfbridgeEnd', function (event) {
    io.emit('ConfbridgeEnd-event', { event: event});
});
nami.on('namiEventConfbridgeTalking', function (event) {
    io.emit('ConfbridgeTalking-event', { event: event});
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