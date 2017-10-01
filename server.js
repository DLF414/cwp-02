// server.js
const net = require('net');
const fs = require('fs');
const port = 3001;

const clientReqString = 'QA';
const serverResStringOK = 'ACK';
const serverResStringErr = 'DEC';
const qaPath = "./qa.json";

let questions = [];
let seed = 0;

const server = net.createServer(function (client) {

    client.setEncoding('utf8');

    client.on('end', () =>
        console.log('Client disconnected'));


    client.on('data', (data, err) => {

        if (data === clientReqString) {
            console.log(data.toString());
            client.write(serverResStringOK);
        } else if (err) {
            client.write(serverResStringErr);
            client.write(err);
        }
        else {
            let question_obj = searchQuestionObj(data);
            client.write(question_obj[(Math.random() < 0.5) ? "corr" : "incorr"].toString());
            console.log(data);
        }
    });
});

server.listen(port, 'localhost', () => {
    console.log("start server");

    fs.readFile(qaPath, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            questions = JSON.parse(data);
        }
    });
});


function searchQuestionObj(question) {
    for (let i = 0; i < questions.length; i++) {
        console.log(questions[i]);
        if (questions[i].question === question) {
            return questions[i];
        }
    }
    return null;
}

function getUniqId() {
    return Date.now() + seed++;
}