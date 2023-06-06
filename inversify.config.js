const inversify = require("inversify");
require("reflect-metadata");

const ICommands = require("./AppLogic/Interfaces/ICommands");
const IDataBase = require( "./AppLogic/Interfaces/IDataBase");
const AppLogic = require( "./AppLogic/appLogic");
const DataBase = require( "./DataBase/dataBase");
const CommandParser = require( "./CommandParser/commandParser");

const container = new inversify.Container();

// Declare as injectable and its dependencies
inversify.decorate(inversify.injectable(), ICommands);
inversify.decorate(inversify.injectable(), IDataBase);
inversify.decorate(inversify.injectable(), AppLogic);
inversify.decorate(inversify.injectable(), CommandParser);
inversify.decorate(inversify.injectable(), DataBase);
inversify.decorate(inversify.inject(ICommands), CommandParser, 0);
inversify.decorate(inversify.inject(IDataBase), AppLogic, 0);

container.bind(ICommands).to(AppLogic);
container.bind(IDataBase).to(DataBase);

module.exports = container;