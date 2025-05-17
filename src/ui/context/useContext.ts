import React from "react";
import { AppContext, AppContextActions } from "./appContext";

export const useAppContext = () => {
	return React.useContext(AppContext);
};

export const useAppContextActions = () => {
	return React.useContext(AppContextActions);
};
