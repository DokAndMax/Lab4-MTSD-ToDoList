'use strict'

const container = require("./inversify.config.js");
const CommandParser = require( "./CommandParser/commandParser");

const commandParser = container.resolve(CommandParser);
