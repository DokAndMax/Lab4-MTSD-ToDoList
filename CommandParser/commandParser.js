'use strict'

import { injectable, inject } from "inversify";
import ICommands from "../AppLogic/Interfaces/ICommands";

@injectable()
export default class CommandParser {
    #commands;

    constructor(@inject(ICommands) commands) {
        this.#commands = commands;
    }
}