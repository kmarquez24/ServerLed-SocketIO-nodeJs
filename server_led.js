var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var five = require("johnny-five");





var PORT = process.env.PORT || 8080;


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/led_control.html');

});
var led;
var board = new five.Board();
board.on("ready", function() {
    led = new five.Led(13);
});

io.on('connection', function(socket) {
    //this.pinMode(13, five.Pin.OUTPUT);
    socket.on('turn_on', function(msj) {
        //this.digitalWrite(13, 1);
        led.on();
        socket.emit('status', 'Led Encendido');
        console.log('on');
    });
    socket.on('turn_off', function(msj) {
        //this.digitalWrite(13, 0);
        led.off();
        socket.emit('status', 'Led Apagado');
        console.log('off');
    });
});


http.listen(PORT, function() {
    console.log('el servidor esta escuchando el puerto %s', PORT);
});