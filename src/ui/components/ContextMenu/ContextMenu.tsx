"use client";

import React from "react";
import { ContextMenuEvent, Coord, MenuItem } from "./types";
import { withinNode } from "./utils";
import { useEventService } from "../EventService";
import { SHOW_CONTEXT_MENU } from "@/events";

type Props<T = unknown> = {
	children?: React.ReactNode;
	contextItemsProvider?: (arg?: T) => MenuItem[];
	contextItemsProviderArgs?: T;
};

const ContextMenuProvider = <T, >(props: Props<T>) => {
	const { children, contextItemsProvider, contextItemsProviderArgs } = props;

	const ref = React.useRef<HTMLDivElement>(null);
	const contextItemsRef = React.useRef({ contextItemsProvider, contextItemsProviderArgs });

	const eventService = useEventService();

	React.useEffect(() => {
		contextItemsRef.current.contextItemsProvider = contextItemsProvider;
		contextItemsRef.current.contextItemsProviderArgs = contextItemsProviderArgs;
	}, [contextItemsProvider, contextItemsProviderArgs]);

	const handleShowContextMenu = React.useCallback(
		(e: MouseEvent) => {
			const node = ref.current;
			const coord: Coord = { x: e.clientX, y: e.clientY };

			if (!node || !withinNode(coord, node.getBoundingClientRect()) || !contextItemsRef.current.contextItemsProvider) return;

			e.preventDefault();
			// emit event
			const contextItems = contextItemsRef.current.contextItemsProvider(contextItemsRef.current.contextItemsProviderArgs);
			eventService.emit<ContextMenuEvent>(SHOW_CONTEXT_MENU, { contextItems, position: coord });
		},
		[eventService]
	);

	React.useEffect(() => {
		document.addEventListener("contextmenu", handleShowContextMenu);

		return () => {
			document.removeEventListener("contextmenu", handleShowContextMenu);
		};
	}, [handleShowContextMenu]);

	return (
		<div className="w-full h-full" ref={ref}>
			{children}
		</div>
	);
};


export const ContextMenu = () => {
	const [pos, setPos] = React.useState<Coord | null>(null);
	const [contextItems, setContextItems] = React.useState<MenuItem[]>([]);
	const menuRef = React.useRef<HTMLDivElement>(null);

	const eventService = useEventService();

	const handleHideContextMenu = React.useCallback((e: MouseEvent) => {
		const menuNode = menuRef.current;
		const coord: Coord = { x: e.clientX, y: e.clientY };

		if (menuNode && withinNode(coord, menuNode.getBoundingClientRect())) return;
		setPos(null);
	}, []);
	
	const handleClickContextMenu = React.useCallback((e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
	}, []);
	
	React.useEffect(() => {
		eventService.subscribe<ContextMenuEvent>(SHOW_CONTEXT_MENU, (e) => {
			const { contextItems, position } = e.message;
			setContextItems(contextItems);
			setPos(position);
		});
	}, [eventService]);

	React.useEffect(() => {
		document.addEventListener("click", handleHideContextMenu);

		return () => {
			document.removeEventListener("click", handleHideContextMenu);
		};
	}, [handleClickContextMenu, handleHideContextMenu]);

	const menuItems = React.useMemo(() => {
		return contextItems.map((item, id) => {
			const onClick = () => {
				item.action();
				setPos(null);
			};
			return (
				<div className="cursor-pointer text-white text-sm mb-0 px-3 py-2 font-semibold hover:bg-gray-200/8" onClick={onClick} key={id}>
					{item.name}
				</div>
			);
		}); 
	}, [contextItems]); 

	const styles: React.CSSProperties = pos ? { top: pos.y, left: pos.x, display: "block" } : { display: "none" };
	const overlayStyles: React.CSSProperties = pos ? { display: "block" } : { display: "none" };

	return (
		<>
			<div className="fixed inset-0 z-9998 pointer-events-none bg-transparent perspective-origin-center" style={overlayStyles} />
			<div
				ref={menuRef}
				className="fixed z-9999 cursor-auto overflow-hidden bg-gray-700/98 h-[250px] w-[220px] py-3 rounded-sm shadow-2xl border-solid"
				style={styles}
				onClick={handleClickContextMenu}
			>
				{menuItems}
			</div>
		</>
	);
};

ContextMenu.Provider = ContextMenuProvider;
