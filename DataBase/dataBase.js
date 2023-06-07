'use strict'
const IDataBase = require("../AppLogic/Interfaces/IDataBase");

const fs = require('fs');
const Task = require("../Models/Task");

const dbFileName = 'tasks.txt';

class DataBase extends IDataBase {
    Create(task) {
        let isDbFileExist = this.createFileIfNotExists(dbFileName);
        let lastLine = "";
        if(isDbFileExist)
            lastLine = this.readLastLine(dbFileName);
        task.id = isDbFileExist ? (this.parseLine(lastLine)[0] || 1) : 1;
        let escapedValues = this.escapeObj(task);

        this.appendFile(dbFileName, escapedValues.join('\t'));
    }
    Read(task)  {
        if(!task.id)
            throw new Error();

        return this.getLineWithIdFromFile(task.id, dbFileName);
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
    Update(task) {
        if(!task.id)
            throw new Error();

        let fileRows = fs.readFileSync(dbFileName).toString().split('\n');
        for(let [i, fileRow] of fileRows.entries())
        {
            if(this.parseLine(fileRow)[0] === task.id.toString())
            {
                fileRows.splice(i, 1, this.escapeObj(task).join('\t'));
                break;
            }
        }
        fs.writeFileSync(dbFileName, fileRows.join('\n'));
    }
    Delete(task)  {
        if(!task.id)
            throw new Error();

        let fileRows = fs.readFileSync(dbFileName).toString().split('\n');
        for(let [i, fileRow] of fileRows.entries())
        {
            if(this.parseLine(fileRow)[0] === task.id.toString())
            {
                fileRows.splice(i, 1);
                break;
            }
        }
        fs.writeFileSync(dbFileName, fileRows.join('\n'));
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

    escapeObj(obj) {
        let escapedValues = [];
        this.mapObject(obj, (v, k, i) =>  {
            let escapedValue = `'${this.escapeValue(v.toString())}'`;
            escapedValues.push(escapedValue);
        });
        return escapedValues;
    }

    getLineWithIdFromFile(id, fileName) {
        const buffer = Buffer.alloc(1); // Буфер для зберігання даних
        const fileDescriptor = fs.openSync(fileName, 'r'); // Відкриття файлу в режимі читання

        let position = 0;
        let bytesRead;
        let values = [];
        let isValue = false;
        let isEscapeChar = false;
        let isNextLine = false;
        let value = "";
        while (true){
            bytesRead = fs.readSync(fileDescriptor, buffer, 0, buffer.length, position);
            position += bytesRead;
            if (bytesRead === 0) {
                break; // Кінець файлу
            }

            const ch = buffer.toString('utf8', 0, bytesRead);

            if(ch === '\'' && isEscapeChar === false && !isNextLine) {
                isValue = !isValue;
                if (isValue)
                    value = "";
                else
                {
                    values.push(value);
                    if(values[0] !== id.toString())
                        isNextLine = !isNextLine;
                }
                continue;
            }
            else if (ch === '\n')
            {
                if(isNextLine) {
                    isNextLine = false;
                    values = [];
                }
                else
                    break;
            }
            if (isValue === false)
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
        const bufferLength = 1 * 1024;

        const fileDescriptor = fs.openSync(filename, 'r');
        const fileSize = fs.statSync(filename).size;

        let buffer = Buffer.alloc(bufferLength);

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