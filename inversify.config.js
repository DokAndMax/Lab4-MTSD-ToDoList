import { Container } from "inversify";

import ICommands from "./AppLogic/Interfaces/ICommands";
import IDataBase from "./AppLogic/Interfaces/IDataBase";
import AppLogic from "./AppLogic/appLogic";
import DataBase from "./DataBase/dataBase";

const container = new Container();
container.bind(ICommands).to(AppLogic);
container.bind(IDataBase).to(DataBase);

export default container;