/* For seed colors */
export interface IBaseColor {
	name: string;
	color: string;
	id: string;
};

export interface IBasePalette {
	paletteName: string;
	id: string;
	emoji: string;
	colors: IBaseColor[];
};

/* Main palette */
export interface IColorShade  {
	name: string;
	id: string;
	hex: string;
	rgb: string;
	rgba: string;
	weight: number;
};

export interface IColor extends IBaseColor {
	shades: IColorShade[];
};

export interface IPalette extends IBasePalette {
	colors: IColor[];
};
