"use client";

import React from "react";
import { Drawer } from "../components/Drawer";
import { NewPaletteColorForm } from "./NewPaletteColorForm";
import { getId } from "@/utils/palette";
import { IBaseColor } from "@/types/palette";
import { Palette } from "./Palette";
import { Modal } from "../components/Modal";
import { NewPaletteForm } from "./NewPaletteForm";
import { useAppContext, useAppContextActions } from "../context/useContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const NewPalette = () => {
	const [colors, setColors] = React.useState<IBaseColor[]>([]);
	const [showNewPaletteForm, setShowNewPaletteForm] = React.useState(false);

	const { palettes } = useAppContext();
	const actions = useAppContextActions();
	const router = useRouter();

	const colorNameValidator = React.useCallback(
		(name: string) => {
			if (name.trim() === "") {
				return "Name can't be empty!";
			}
			if (colors.some((color) => getId(name) === color.id)) {
				return "Color already in palette";
			}
			return "";
		},
		[colors]
	);

	const colorValidator = React.useCallback(
		(colorStr: string) => {
			if (colorStr.trim() === "") {
				return "Color has to be valid!";
			}
			if (colors.some((color) => color.color === colorStr)) {
				return "Color already in palette";
			}
			return "";
		},
		[colors]
	);

	const paletteNameValidator = React.useCallback(
		(paletteName: string) => {
			if (paletteName.trim() === "") {
				return "Palette name is required!";
			}
			if (palettes.some((palette) => getId(paletteName) === palette.id)) {
				return "Palette with same name already present!";
			}
			return "";
		},
		[palettes]
	);

	const handleAddColor = React.useCallback((color: string, name: string) => {
		setColors((prev) => {
			return prev.map((c) => ({ ...c })).concat({ color, name, id: getId(name) });
		});
	}, []);

	const handleDeleteColor = React.useCallback((color: IBaseColor) => {
		setColors((prev) => {
			return prev.filter((c) => c.id !== color.id).map((c) => ({ ...c }));
		});
	}, []);

	const handleColorSort = React.useCallback((colors: IBaseColor[]) => {
		setColors(colors);
	}, []);

	const handleShowNewPaletteForm = React.useCallback(() => {
		setShowNewPaletteForm(true);
	}, []);

	const handleHideNewPaletteForm = React.useCallback(() => {
		setShowNewPaletteForm(false);
	}, []);

	const handleSaveNewPalette = React.useCallback(
		(paletteName: string, emoji: string) => {
			setShowNewPaletteForm(false);
			actions.addPalette(paletteName, emoji, colors);
			toast("Palette saved successfully!", {
				position: "bottom-left",
				autoClose: 3000,
			});
			router.push("/");
		},
		[actions, colors, router]
	);

	return (
		<main className="h-full w-full">
			<Modal open={showNewPaletteForm} onClose={handleHideNewPaletteForm}>
				<NewPaletteForm paletteNameValidator={paletteNameValidator} onCancel={handleHideNewPaletteForm} onSave={handleSaveNewPalette} />
			</Modal>
			<Drawer>
				<Drawer.Drawer className="h-full">
					<NewPaletteColorForm onAddColor={handleAddColor} colorNameValidator={colorNameValidator} colorValidator={colorValidator} />
				</Drawer.Drawer>
				<Drawer.Header>
					<div className="w-full flex justify-end px-5">
						<button className="d-btn d-btn-secondary" onClick={handleShowNewPaletteForm}>
							Save Palette
						</button>
					</div>
				</Drawer.Header>
				<Drawer.Main>
					<Palette colors={colors} onDeleteColor={handleDeleteColor} onColorSort={handleColorSort} />
				</Drawer.Main>
			</Drawer>
		</main>
	);
};
