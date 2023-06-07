'use strict'
const IDataBase = require("../AppLogic/Interfaces/IDataBase");

const fs = require('fs');
const Task = require("../Models/Task");

const dbFileName = 'tasks.txt';

class DataBase extends IDataBase {
    Create(task)  {
        let isDbFileExist = this.createFileIfNotExists(dbFileName);
        let escapedValues = [];
        let lastLine = "";
        this.mapObject(task, (v, k, i) =>  {
            if(isDbFileExist)
                lastLine = this.readLastLine(dbFileName);
            task.id = isDbFileExist ? (this.parseLine(lastLine)[0] || 1) : 1
            let escapedValue = `'${this.escapeValue(v.toString())}'`;
            escapedValues.push(escapedValue);
        });
        this.appendFile(dbFileName, escapedValues.join('\t'));
    }
    Read(task)  {
        throw new Error("Method not implemented.");
    }
    ReadAll()  {
        let isDbFileExist = this.createFileIfNotExists(dbFileName);
        if (!isDbFileExist)
            return [];

        let lines = this.readFile(dbFileName);

        let parsedRows = [];

        for (let line of lines) {
            parsedRows.push(this.parseLine(line));
        }

        return parsedRows;
    }
    Update(task)  {
        throw new Error("Method not implemented.");
    }
    Delete(task)  {
        throw new Error("Method not implemented.");
    }
    Search(task)  {
        throw new Error("Method not implemented.");
    }

    createFileIfNotExists(fileName) {
        let isFileExist = fs.existsSync(fileName);
        if (!isFileExist) {
            fs.writeFileSync(fileName, '');
        }
        return isFileExist;
    };

    appendFile(fileName, string) {
        fs.appendFileSync(fileName, `${string}\n`);
    };

    readFile(fileName) {
        const fileContent = fs.readFileSync(fileName, 'utf-8');
        const lines = fileContent.split('\n');

        return lines.filter(line => line.trim() !== '');
    };

    parseLine(line) {
        let values = [];
        let isValue = false;
        let isEscapeChar = false;
        let value = "";
        for (let i = 0; i < line.length; i++){
            let ch = line.charAt(i);
            if(ch === '\'' && isEscapeChar === false) {
                isValue = !isValue;
                if (isValue)
                    value = "";
                else
                    values.push(value);
                continue;
            }
            else if (isValue === false)
                continue;
            if(ch === '\\' && isEscapeChar === false) {
                isEscapeChar = true;
                continue;
            }

            value += ch;

            if(isEscapeChar === true)
                isEscapeChar = false;
        }
        return values;
    }

    escapeValue(value) {
        let result = "";
        for (let i = 0; i < value.length; i++){
            let ch = value.at(i);

            if(ch === '\'' || ch === '\\')
                result += '\\';

            result += ch;
        }
        return result;
    }

    readLastLine(filename) {
        const bufferLength = 1 * 1024; // Визначаємо буферну довжину (64 КБ)

        const fileDescriptor = fs.openSync(filename, 'r');
        const fileSize = fs.statSync(filename).size;

        let buffer = Buffer.alloc(bufferLength);
        let bytesRead;

        let position = fileSize;
        let line = '';

        while (position > 0) {
            const bytesToRead = Math.min(bufferLength, position);
            position -= bytesToRead;

            fs.readSync(fileDescriptor, buffer, 0, bytesToRead, position);
            const partialLine = buffer.toString('utf-8', 0, bytesToRead);

            line = partialLine + line;

            if (line.includes('\n')) {
                line = line.slice(line.lastIndexOf('\n', line.length-2) + 1);
                break;
            }
        }

        fs.closeSync(fileDescriptor);

        return line;
    }

    mapObject(obj, fn) {
        return Object.fromEntries(
            Object.entries(obj).map(
                ([k, v], i) => [k, fn(v, k, i)]
            )
        )
    }
}

module.exports = DataBase;