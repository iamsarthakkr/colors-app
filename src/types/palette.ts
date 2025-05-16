export type IColor = {
	name: string;
	color: string;
};

export type IPalette = {
	paletteName: string;
	id: string;
	emoji: string;
	colors: IColor[];
};
