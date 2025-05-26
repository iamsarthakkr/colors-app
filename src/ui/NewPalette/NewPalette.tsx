"use client";

import React from "react";
import { Drawer } from "../components/Drawer";
import { NewPaletteColorForm } from "./NewPaletteColorForm";
import { IBaseColor } from "@/types/palette";
import { Palette } from "./Palette";
import { Modal } from "../components/Modal";
import { NewPaletteForm } from "./NewPaletteForm";

export const NewPalette = () => {
	const [colors, setColors] = React.useState<IBaseColor[]>([]);
	const [showNewPaletteForm, setShowNewPaletteForm] = React.useState(false);

	const nameValidator = React.useCallback(
		(name: string) => {
			if (name === "") {
				return "Name can't be empty!";
			}
			if (colors.some((color) => color.name === name)) {
				return "Color already in palette";
			}
			return "";
		},
		[colors]
	);

	const colorValidator = React.useCallback(
		(colorStr: string) => {
			if (colorStr === "") {
				return "Color has to be valid!";
			}
			if (colors.some((color) => color.color === colorStr)) {
				return "Color already in palette";
			}
			return "";
		},
		[colors]
	);

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

	const handleShowNewPaletteForm = React.useCallback(() => {
		setShowNewPaletteForm(true);
	}, []);

	const handleHideNewPaletteForm = React.useCallback(() => {
		setShowNewPaletteForm(false);
	}, []);

	const handleSaveNewPalette = React.useCallback(
		(name: string, emoji: string) => {
			setShowNewPaletteForm(false);
			console.log({ name, emoji });
		},
		[]
	);

	return (
		<main className="h-full w-full">
			<Modal open={showNewPaletteForm} onClose={handleHideNewPaletteForm}>
				<NewPaletteForm onCancel={handleHideNewPaletteForm} onSave={handleSaveNewPalette} />
			</Modal>
			<Drawer>
				<Drawer.Drawer className="h-full">
					<NewPaletteColorForm
						onAddColor={handleAddColor}
						nameValidator={nameValidator}
						colorValidator={colorValidator}
					/>
				</Drawer.Drawer>
				<Drawer.Header>
					<div className="w-full flex justify-end px-5">
						<button className="d-btn d-btn-secondary" onClick={handleShowNewPaletteForm}>
							Save Palette
						</button>
					</div>
				</Drawer.Header>
				<Drawer.Main>
					<Palette colors={colors} onDeleteColor={handleDeleteColor} />
				</Drawer.Main>
			</Drawer>
		</main>
	);
};
