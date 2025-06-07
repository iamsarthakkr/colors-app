"use client";

import React from "react";
import { Drawer } from "../../components";
import { PaletteEditorColorForm } from "./PaletteEditorColorForm";
import { getId } from "@/utils/common";
import { IBaseColor } from "@/types/palette";
import { Palette } from "./Palette";
import { Modal } from "../../components/Modal";
import { PaletteEditorForm } from "./PaletteEditorForm";
import { useAppContextActions } from "../../context/useContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useValidators } from "./useValidators";

type Props = {
	paletteId?: string;
}

export const PaletteEditor = (props: Props) => {
	const { paletteId } = props;

	const [paletteName, setPaletteName] = React.useState("");
	const [paletteEmoji, setPaletteEmoji] = React.useState("🎨");
	const [colors, setColors] = React.useState<IBaseColor[]>([]);
	const [editing, setEditing] = React.useState(false);

	const [showNewPaletteForm, setShowNewPaletteForm] = React.useState(false);

	const actions = useAppContextActions();
	const router = useRouter();
	const validators = useValidators(colors, paletteId);
	
	React.useEffect(() => {
		const palette = actions.getPalette(paletteId || '');
		if(!palette) {
			return;
		}

		// set the initial
		setPaletteName(palette.paletteName);
		setPaletteEmoji(palette.emoji);
		setColors(palette.colors);
		setEditing(true);
	}, [actions, paletteId]);

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

	const handleClearPalette = React.useCallback(() => {
		setColors([]);
		toast("Palette cleared!", {
			position: "bottom-left",
			autoClose: 3000,
		});
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

			if (editing && paletteId) {
				actions.updatePalette(paletteId, paletteName, emoji, colors);
			} else {
				actions.addPalette(paletteName, emoji, colors);
			}
			
			toast(`Palette ${editing ? "updated" : "added"} successfully!`, {
				position: "bottom-left",
				autoClose: 3000,
			});
			router.push("/");
		},
		[actions, colors, editing, paletteId, router]
	);

	return (
		<main className="h-full w-full">
			<Modal open={showNewPaletteForm} onClose={handleHideNewPaletteForm}>
				<PaletteEditorForm
					defaultPaletteName={paletteName}
					defaultEmoji={paletteEmoji}
					validators={validators}
					onCancel={handleHideNewPaletteForm}
					onSave={handleSaveNewPalette}
				/>
			</Modal>
			<Drawer>
				<Drawer.Drawer className="h-full">
					<PaletteEditorColorForm onAddColor={handleAddColor} validators={validators} />
				</Drawer.Drawer>
				<Drawer.Header>
					<div className="w-full flex justify-end gap-2 px-5">
						<button className="d-btn d-btn-primary" onClick={handleClearPalette}>
							Clear Palette
						</button>
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
