'use strict'

const container = require("./inversify.config.js");
const CommandParser = require( "./CommandParser/commandParser");

const commandParser = container.get(CommandParser);

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

if(process.argv[2] !== undefined) {
    waitForCommand(...process.argv.slice(2));
}

waitForCommand();
function waitForCommand() {
    readline.question('Введіть команду:\n', command => {
        //console.log(`${command}!`);
        waitForCommand();
        readline.close();
    });
}
