export type Coord = {
	x: number;
	y: number;
};

export type MenuItem = {
	name: string;
	action: () => void;
};

export type ContextItemsProvider = () => MenuItem[];

export type ContextMenuEvent = {
	contextItems: MenuItem[];
	position: Coord;
};
