'use strict'

const container = require("./inversify.config.js");
const CommandParser = require( "./CommandParser/commandParser");

const commandParser = container.get(CommandParser);

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

if(process.argv[2] !== undefined) {
    commandParser.userCommand(process.argv[2]);
}
else {
    waitForCommand();
}

function waitForCommand() {
    readline.question('Введіть команду:\n', command => {
        commandParser.userCommand(command);
        waitForCommand();
        readline.close();
    });
}
