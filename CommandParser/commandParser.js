'use strict'

const { injectable, inject } = require("inversify");
const ICommands = require("../AppLogic/Interfaces/ICommands");

class CommandParser {
    #commands;

    constructor(commands) {
        this.#commands = commands;
    }
    userCommand(command) {
        switch(command){
            case 'list': 
                getTasksList()
                break;
            case 'late': 
                getLateTasks()
                break;
            case 'create': 
                CreateTask(title, description = "", deadline = "")
                break;
            case 'show': 
                ShowTask(id)
                break;
            case 'udpate': 
                UpdateTask(id, title = "", description = "", deadline = "")  
                break;
            case 'delete':
                DeleteTask(id) 
                break; 
            case 'complete': 
                DeleteTask(id) 
                break;
            default:
                throw new Error("Command does not exist");
        }
    }
}

module.exports = CommandParser;