'use strict'

const { injectable, inject } = require("inversify");
const AppLogic = require("../AppLogic/appLogic");
const Command = new AppLogic;
class CommandParser {
/*    #commands;

    constructor(commands) {
        this.#commands = commands;
    } */
    userCommand(command) {
        switch(command){
            case 'list': 
                Command.getTasksList()
                break;
            case 'late': 
                Command.getLateTasks()
                break;
            case 'create': 
                Command.CreateTask(title, description = "", deadline = "")
                break;
            case 'show': 
                Command.ShowTask(id)
                break;
            case 'udpate': 
                Command.UpdateTask(id, title = "", description = "", deadline = "")  
                break;
            case 'delete':
                Command.DeleteTask(id) 
                break; 
            case 'complete': 
                Command.SetCompleteTask(id) 
                break;
            case 'help':
                console.log(`\nThis is a list of supported commands:\n
                list = show all tasks\n
                late = show all overdue tasks\n
                create (title)(description)(deadline) = create a task\n
                show [id] = display task info\n
                update [id] (title)(description)(deadline) = update task info\n
                delete [id] = delete a task\n
                complete [id] = mark the a task as complete`);
                throw new Error("This error is used as a temporary way to terminate the script")
            default:
                console.log("Command does not exist. Use command 'help' to get the list of supported commands");
        }
    }
}

module.exports = CommandParser;