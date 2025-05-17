/* For seed colors */
export type IBaseColor = {
	name: string;
	color: string;
};

export type IBasePalette = {
	paletteName: string;
	id: string;
	emoji: string;
	colors: IBaseColor[];
};

/* Main palette */
export type IColorShade = {
	name: string;
	id: string;
	hex: string;
	rgb: string;
	rgba: string;
	weight: number;
};

export type IColor = {
	name: string;
	color: string;
	id: string;
	shades: IColorShade[];
};

export type IPalette = {
	paletteName: string;
	id: string;
	emoji: string;
	colors: IColor[];
};
