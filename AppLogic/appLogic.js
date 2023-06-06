'use strict'

import createInterface from 'readline';

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
        const input = async (text, rl) => {
            const question = (text) => new Promise((arg) => rl.question(text, arg));
            let task = null;
            let deadline = null;
            while (true) {
                task = await question(text);
                if (task = null) {
                  console.log(`${task} is empty. Input valid task.`);
                } else {
                  break;
                }
              }
            while (true) {
                deadline = await question(text);
                if (deadline = null) {
                  console.log(`${deadline} is empty. Input valid deadlne.`);
                } else if(deadline != Date) {
                    console.log(`${deadline} is not in date format. Please input valid format.`)
                } else {
                  break;
                }
              }
            return task;
            return deadline;
            }
            const interactiveMode = async () => {
                const rl = createInterface({
                  input: process.stdin,
                  output: process.stdout,
                });
              
                let name = NaN;
                while (true) {
                  name = await input('name = ', rl);
                  if (name === 0) {
                    console.log('Name cannot be 0. Try again.');
                  } else {
                    break;
                  }
                }
              
                const description = await input('description = ', rl);
                let deadline = null;
                while (true) {
                  deadline = await input('deadline = ', rl);
                  if (deadline === 0) {
                    console.log('Deadline cannot be 0. Try again.');
                  } else if(deadline != Date) {
                    console.log('Deadline is the wrong format. Try again.');
                  }else{
                    break;
                  }
                }
              
                rl.close();
                console.log(name, description, deadline);
              };
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