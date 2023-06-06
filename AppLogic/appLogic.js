'use strict'

const { injectable, inject } = require("inversify");

const ICommands = require("./Interfaces/ICommands");
const IDataBase = require("./Interfaces/IDataBase");

class AppLogic extends ICommands {
    #dataBase;

    constructor(dataBase) {
        super();
        this.#dataBase = dataBase;
    }
    getTasksList() {
        throw new Error("Method not implemented.");
    }
    getLateTasks()  {
        throw new Error("Method not implemented.");
    }
    CreateTask(title, description = "", deadline = "")  {
        throw new Error("Method not implemented.");
    }
    ShowTask(id)  {
        throw new Error("Method not implemented.");
    }
    UpdateTask(id, title = "", description = "", deadline = "")  {
        throw new Error("Method not implemented.");
    }
    DeleteTask(id)  {
        throw new Error("Method not implemented.");
    }
    SetCompleteTask(id)  {
        throw new Error("Method not implemented.");
    }
}

module.exports = AppLogic;