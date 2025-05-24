"use client";

import React from "react";
import { Drawer } from "../components/Drawer";
import { NewPaletteForm } from "./NewPaletteForm";
import { IBaseColor } from "@/types/palette";
import { Palette } from "./Palette";

export const NewPalette = () => {
	const [colors, setColors] = React.useState<IBaseColor[]>([]);

	const nameValidator = React.useCallback((name: string) => {
		if (name === "") {
			return "Name can't be empty!";
		}
		if(colors.some(color => color.name === name)) {
			return "Name already in palette";
		}
		return "";
	}, [colors]);

	const colorValidator = React.useCallback((colorStr: string) => {
		if (colorStr === "") {
			return "Color has to be valid!";
		}
		if(colors.some(color => color.color === colorStr)) {
			return "Color already in palette";
		}
		return "";
	}, [colors])

	const handleAddColor = React.useCallback((color: string, name: string) => {
		setColors((prev) => {
			return prev.map((c) => ({ ...c })).concat({ color, name, id: color.toLocaleLowerCase() });
		});
	}, []);


	const handleDeleteColor = React.useCallback((color: IBaseColor) => {
		setColors((prev) => {
			return prev.filter((c) => c.id !== color.id).map((c) => ({ ...c }));
		});
	}, []);

	return (
		<main className="h-full w-full">
			<Drawer>
				<Drawer.Drawer className="h-full">
					<NewPaletteForm
						onAddColor={handleAddColor}
						nameValidator={nameValidator}
						colorValidator={colorValidator}
					/>
				</Drawer.Drawer>
				<Drawer.Header></Drawer.Header>
				<Drawer.Main>
					<Palette colors={colors} onDeleteColor={handleDeleteColor} />
				</Drawer.Main>
			</Drawer>
		</main>
	);
};
