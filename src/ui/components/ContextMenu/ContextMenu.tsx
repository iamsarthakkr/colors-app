import React from "react";
import { Coord, MenuItem } from "./types";
import { withinNode } from "./utils";


type Props = {
	ref: React.RefObject<HTMLElement | null>;
	contextItemsProvider: () => MenuItem[];
};

export const ContextMenu = (props: Props) => {
	const [pos, setPos] = React.useState<Coord | null>(null);
	const menuRef = React.useRef<HTMLDivElement>(null);

	const { ref, contextItemsProvider } = props;

	const handleShowContextMenuRef = React.useCallback(
		(e: MouseEvent) => {
			const node = ref.current;
			const coord: Coord = { x: e.clientX, y: e.clientY };

			if (!node || !withinNode(coord, node.getBoundingClientRect())) return setPos(null);

			e.preventDefault();
			setPos(coord);
		},
		[ref]
	);

	const handleHideContextMenuRef = React.useCallback((e: MouseEvent) => {
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
		const menuNode = menuRef.current;
		if(!menuNode) return;

		// menuNode.addEventListener("click", handleClickContextMenu);
		document.addEventListener("contextmenu", handleShowContextMenuRef);
		document.addEventListener("click", handleHideContextMenuRef);

		return () => {
			// menuNode.removeEventListener("click", handleClickContextMenu);
			document.removeEventListener("contextmenu", handleShowContextMenuRef);
			document.removeEventListener("click", handleHideContextMenuRef);
		};
	}, [handleClickContextMenu, handleHideContextMenuRef, handleShowContextMenuRef]);

	const menuItems = contextItemsProvider().map((item, id) => {
		return (
			<div className="cursor-pointer text-white text-sm mb-1 font-semibold" onClick={item.action} key={id}>
				{item.name}
			</div>
		);
	}); 

	const styles: React.CSSProperties = pos ? { top: pos.y, left: pos.x, display: "block" } : { display: "none" };
	const overlayStyles: React.CSSProperties = pos ? { display: "block" } : { display: "none" };

	return (
		<>
			<div className="fixed inset-0 z-9998 pointer-events-none bg-transparent perspective-origin-center" style={overlayStyles} />
			<div
				ref={menuRef}
				className="fixed z-9999 cursor-auto overflow-hidden bg-[#383838]/98 h-[250px] w-[200px] px-4 py-3 rounded-sm shadow-2xl border-solid"
				style={styles}
				onClick={handleClickContextMenu}
			>
				{menuItems}
			</div>
		</>
	);
};
