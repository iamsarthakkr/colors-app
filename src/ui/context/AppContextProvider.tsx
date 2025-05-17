"use client";

import React from "react";
import { AppContext, AppContextActions, IAppContext, IAppContextActions } from "./appContext";

interface IProps {
	children: React.ReactElement;
}

export const AppContextProvider: React.FC<IProps> = (props) => {
	const context: IAppContext = React.useMemo(() => {
		return {};
	}, []);

	const contextActions: IAppContextActions = React.useMemo(() => {
		return {};
	}, []);

	return (
		<AppContext.Provider value={context}>
			<AppContextActions.Provider value={contextActions}>{props.children}</AppContextActions.Provider>
		</AppContext.Provider>
	);
};
