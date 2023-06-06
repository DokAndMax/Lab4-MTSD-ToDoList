'use strict'
const IDataBase = require("../AppLogic/Interfaces/IDataBase");

const fs = require('fs');

class DataBase extends IDataBase {
    Create(task)  {
        throw new Error("Method not implemented.");
    }
    Read(task)  {
        throw new Error("Method not implemented.");
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
}

module.exports = DataBase;