'use strict'

import { injectable, inject } from "inversify";

import ICommands from "./Interfaces/ICommands";
import IDataBase from "./Interfaces/IDataBase";

@injectable()
export default class AppLogic extends ICommands {
    #dataBase;

    constructor(@inject(IDataBase) dataBase) {
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