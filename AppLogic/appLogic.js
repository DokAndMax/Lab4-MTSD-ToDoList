'use strict'

import createInterface from 'readline';

import ICommands from "./Interfaces/ICommands";

export default class AppLogic extends ICommands {
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
              
                let a = NaN;
                while (true) {
                  a = await input('a = ', rl);
                  if (a === 0) {
                    console.log('A cannot be 0. Try again.');
                  } else {
                    break;
                  }
                }
              
                const b = await input('b = ', rl);
                let c = null;
                while (true) {
                  c = await input('c = ', rl);
                  if (c === 0) {
                    console.log('C cannot be 0. Try again.');
                  } else if(c != Date) {
                    console.log('C is the wrong format. Try again.');
                  }else{
                    break;
                  }
                }
              
                rl.close();
                console.log(a, b, c);
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