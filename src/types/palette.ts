export type IColor = {
	name: string;
	color: string;
};

export type IColorShade = IColor & {
	id: string;
	hex: string;
	rgb: string;
	rgba: string;
	weight: number;
};

export type IBasePalette = {
	paletteName: string;
	id: string;
	emoji: string;
	colors: IColor[];
};

export type IPalette = IBasePalette & {
	colors: IColorShade[][];
}
