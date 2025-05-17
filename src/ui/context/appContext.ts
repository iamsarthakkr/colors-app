import React from "react";

export type IAppContext = {

};

export type IAppContextActions = {

};

export const AppContext = React.createContext<IAppContext>(null as unknown as IAppContext);

export const AppContextActions = React.createContext<IAppContextActions>(null as unknown as IAppContextActions);
