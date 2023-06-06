'use strict'

import container from "./inversify.config.js";
import CommandParser from "./CommandParser/commandParser";

const commandParser = container.resolve(CommandParser);