// client.js
const clientReqest = "QA";
const serverAccept = "ACK"
const serverDecline = "DEC"
const net = require('net');
const port = 8124;

const client = new net.Socket();

client.setEncoding('utf8');

client.connect(port, function() {
    console.log('Connected');
    client.write(clientReqest);
});

client.on('data', function(data) {
    if (data === serverAccept) {
       //que
    }
    else if (data === serverDecline) {
        console.log(data);
        client.destroy();
    } else if (data !== serverAccept) {
        //que
            client.destroy();
    }
    client.destroy();
});

client.on('close', function() {
    console.log('Connection closed');
});