"use client";

import React from "react";
import { Drawer } from "../../components";
import { PaletteEditorColorForm } from "./PaletteEditorColorForm";
import { getId } from "@/utils/common";
import { IBaseColor, IBasePalette } from "@/types/palette";
import { Palette } from "./Palette";
import { Modal } from "../../components/Modal";
import { PaletteEditorForm } from "./PaletteEditorForm";
import { useAppContextActions } from "../../context/useContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useValidators } from "./useValidators";

type Props = {
	paletteId?: string;
};

export const PaletteEditor = (props: Props) => {
	const { paletteId } = props;

	const [palette, setPalette] = React.useState<IBasePalette>({
		paletteName: "",
		emoji: "🎨",
		colors: [],
		id: "",
	});
	const [editing, setEditing] = React.useState(false);
	const [editingColor, setEditingColor] = React.useState<IBaseColor | undefined>();

	const [showNewPaletteForm, setShowNewPaletteForm] = React.useState(false);

	const actions = useAppContextActions();
	const router = useRouter();
	const validators = useValidators(palette.colors, editingColor, paletteId);

	React.useEffect(() => {
		const palette = actions.getPalette(paletteId || "");
		if (!palette) {
			return;
		}

		// set the initial
		setPalette({ ...palette });
		setEditing(true);
	}, [actions, paletteId]);

	const handleAddColor = React.useCallback(
		(newColor: IBaseColor) => {
			setPalette((prev) => {
				let newColors: IBaseColor[] = [];
				if (editingColor) {
					newColors = prev.colors.map((color) => {
						if (color.id === newColor.id) {
							return { ...newColor };
						}
						return { ...color };
					});
					setEditingColor(undefined);
				} else {
					newColors = prev.colors.map((c) => ({ ...c })).concat({ ...newColor });
				}
				return {
					...prev,
					colors: newColors,
				};
			});
		},
		[editingColor]
	);

	const handleDeleteColor = React.useCallback((color: IBaseColor) => {
		setPalette((prev) => {
			return {
				...prev,
				colors: prev.colors.filter((c) => c.id !== color.id).map((c) => ({ ...c })),
			};
		});
	}, []);

	const handleEditColor = React.useCallback((color: IBaseColor) => {
		setEditingColor(color);
	}, []);

	const handleCancleEditColor = React.useCallback(() => {
		setEditingColor(undefined);
	}, []);

	const handleColorSort = React.useCallback((colors: IBaseColor[]) => {
		setPalette((prev) => ({ ...prev, colors }));
	}, []);

	const handleClearPalette = React.useCallback(() => {
		setPalette((prev) => ({ ...prev, colors: [] }));
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
			const toSave: IBasePalette = {
				...palette,
				paletteName,
				emoji,
				id: getId(paletteName),
			};

			if (editing && paletteId) {
				actions.updatePalette(toSave, paletteId);
			} else {
				actions.addPalette(toSave);
			}

			toast(`Palette ${editing ? "updated" : "added"} successfully!`, {
				position: "bottom-left",
				autoClose: 3000,
			});
			router.push("/");
		},
		[actions, editing, palette, paletteId, router]
	);

	return (
		<main className="h-full w-full">
			<Modal open={showNewPaletteForm} onClose={handleHideNewPaletteForm}>
				<PaletteEditorForm
					defaultPaletteName={palette.paletteName}
					defaultEmoji={palette.emoji}
					validators={validators}
					onCancel={handleHideNewPaletteForm}
					onSave={handleSaveNewPalette}
				/>
			</Modal>
			<Drawer>
				<Drawer.Drawer className="h-full">
					<PaletteEditorColorForm
						editingColor={editingColor}
						onCancel={handleCancleEditColor}
						onAddColor={handleAddColor}
						validators={validators}
					/>
				</Drawer.Drawer>
				<Drawer.Header>
					<div className="w-full flex justify-end gap-2 px-5">
						<button className="d-btn d-btn-primary text-xs" onClick={handleClearPalette}>
							Clear Palette
						</button>
						<button className="d-btn d-btn-secondary text-xs" onClick={handleShowNewPaletteForm}>
							Save Palette
						</button>
					</div>
				</Drawer.Header>
				<Drawer.Main>
					<Palette colors={palette.colors} onDeleteColor={handleDeleteColor} onColorSort={handleColorSort} onEditColor={handleEditColor} />
				</Drawer.Main>
			</Drawer>
		</main>
	);
};
