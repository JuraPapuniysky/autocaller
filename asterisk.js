let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let bodyParser = require('body-parser')


var namiConfig = {
    host: "10.109.36.195",
    port: 5038,
    username: "bos",
    secret: "Bthfh[bZ"
};
var namiLib = require("nami");
var nami = new (namiLib.Nami)(namiConfig);
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


nami.on('namiConnected', function (event) {
    io.on('connection', function (socket) {

        socket.on('confbridge-list-req', function (data) {
            var action = new namiLib.Actions.ConfbridgeList(data.conference);
            nami.send(action, function (response) {
                io.emit('confbridge-list-res', {response: response});
            });
        });

        socket.on('originate', function (data) {
           var action = new namiLib.Actions.Originate();
            action.set("Channel", data.channel);
            action.set("Callerid", data.callerid);
            action.set("Exten", data.conference);
            action.set("Context", "from-internal");
            action.set("Codecs", "alaw");
            action.set("Priority", 1);

            nami.send(action, function (response) {
               io.emit('originate-res', {response: response, action: action});
            });
        });

        socket.on('confbridge-mute', function (data) {
            var action = new namiLib.Actions.ConfbridgeMute(data.conference, data.channel);
            nami.send(action, function (response) {
                io.emit('confbridge-mute-res', {response: response});
            });
        });

        socket.on('confbridge-unmute', function (data) {
            var action = new namiLib.Actions.ConfbridgeUnmute(data.conference, data.channel);
            nami.send(action, function (response) {
                io.emit('confbridge-unmute-res', {response: response});
            });
        });

        socket.on('confbrige-kick', function (data) {
           var action = new namiLib.Actions.ConfbridgeKick(data.conference, data.channel);
            nami.send(action, function (response) {
                io.emit('confbridge-kick-res', {response: response});
            });
        });

        socket.on('confbridgeSetSingleVideoSrc', function (data) {
           var name = 'ConfbridgeSetSingleVideoSrc';
            var command = 'confbridge set single video src '+data.conference+' '+data.channel;
           var action = new namiLib.Actions.Command(command);
            //action.set("Conference", data.conference);
            //action.set("Channel", data.channel);

            nami.send(action, function (response) {
               io.emit('confbridgeSetSingleVideoSrc-res', {response: response});
            });
        });

    });
});


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


app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */





http.listen(4242, () => {
    console.log('started on port 4242');
});
