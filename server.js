// server.js
const net = require('net');
const port = 8124;
const clientReqest = "QA";
const serverAccept = "ACK";
const serverDecline = "DEC";
let seed=5;
const server = net.createServer((client) => {
    console.log('Client connected');

client.setEncoding('utf8');

client.on('data', (data) => {
    console.log(data);
client.write('\r\nHello!\r\nRegards,\r\nServer\r\n');
    console.log('Client id: ' + getUniqId());
    if (data === clientReqest) {
                    console.log(data.toString());
                    client.write(serverAccept);
    } else {
        client.write(serverDecline);
    }
});
client.on('end', () => console.log('Client disconnected'));
});

server.listen(port, () => {
    console.log(`Server listening on localhost:${port}`);
});

function getUniqId() {
        return Date.now() + seed++;
    }