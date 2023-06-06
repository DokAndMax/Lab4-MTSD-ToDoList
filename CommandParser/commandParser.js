'use strict'

const { injectable, inject } = require("inversify");
const ICommands = require("../AppLogic/Interfaces/ICommands");

class CommandParser {
    #commands;

    constructor(commands) {
        this.#commands = commands;
    }
}

module.exports = CommandParser;