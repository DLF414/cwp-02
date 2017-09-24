// client.js
const clientReqest = "QA";
const serverAccept = "ACK";
const serverDecline = "DEC";
const fs = require('fs');
const net = require('net');
const qaFile = "./qa.json";
const port = 8124;

const client = new net.Socket();

client.setEncoding('utf8');
fs.readFile(qaFile, function (err, data) {
    if (err) {
        console.log(err);
    }
    else {
        questions = JSON.parse(data);
        randomize();
        console.log(questions);
    }
});
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
function randomize() {
    let counter = questions.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let buf = questions[counter];
        questions[counter] = questions[index];
        questions[index] = buf;
    }
}