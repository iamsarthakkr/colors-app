"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ColorChangeHandler } from "react-color";
const SketchPicker = dynamic(() => import("react-color").then((mod) => mod.SketchPicker), { ssr: false });
import { isDark } from "@/utils/colors";
import { Modal } from "@/ui/components";
import { ColorsPreset } from "./ColorsPreset";
import { IBaseColor } from "@/types/palette";
import { IPaletteValidators } from "./useValidators";


type Props = {
	onAddColor: (color: string, name: string) => void;
	validators: IPaletteValidators;
};

export const PaletteEditorColorForm = (props: Props) => {
	const [color, setColor] = React.useState("#ff0000");
	const [name, setName] = React.useState("");
	const [nameError, setNameError] = React.useState("");
	const [colorError, setColorError] = React.useState("");

	const [showPresets, setShowPresets] = React.useState(false);

	const [buttonStyles, setButtonStyles] = React.useState<React.CSSProperties>({});
	const { onAddColor, validators } = props;

	React.useEffect(() => {
		const dark = isDark(color);
		setButtonStyles({
			background: color,
			color: dark ? "white" : "black",
		});
	}, [color]);

	const handleValidateColor: ColorChangeHandler = React.useCallback(
		(color) => {
			setColorError(validators.colorValidator(color.hex));
		},
		[validators]
	);

	const handleColorChange: ColorChangeHandler = React.useCallback((color) => {
		setColor(color.hex);
	}, []);

	const handleNameChange = React.useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;
			setName(value);
			const err = validators.colorNameValidator(value);
			setNameError(err);
		},
		[validators]
	);

	const handleAddColor = React.useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();
			const colorErr = validators.colorValidator(color),
				nameErr = validators.colorNameValidator(name);
			setNameError(nameErr);
			setColorError(colorErr);
			if (colorErr || nameErr) {
				return;
			}
			onAddColor(color, name);
		},
		[validators, color, name, onAddColor]
	);

	const handleShowPresets = React.useCallback(() => {
		setShowPresets(true);
	}, []);

	const handleHidePresets = React.useCallback(() => {
		setShowPresets(false);
	}, []);

	const handleSelectPreset = React.useCallback((color: IBaseColor) => {
		setColor(color.color);
		setName(color.name);
		setShowPresets(false);
	}, []);

	return (
		<>
			<Modal className="w-[80%] h-[90%]" open={showPresets} onClose={handleHidePresets}>
				<ColorsPreset onCancel={handleHidePresets} onSelectPreset={handleSelectPreset} />
			</Modal>
			<div className="h-full w-full flex flex-col justify-center items-center">
				<h1 className="text-xl tracking-wider uppercase text-center mb-10 font-semibold text-cyan-700">Choose Color for your Palette</h1>
				<div className="flex gap-3">
					<button className="d-btn d-btn-secondary text-xs" onClick={handleShowPresets}>
						Choose from preset
					</button>
				</div>
				<form className="flex flex-col justify-center items-center">
					<div role="alert" className={`text-sm mt-10 text-rose-700 ${colorError ? "opacity-100" : "opacity-0"} h-5`}>
						<span>{colorError}</span>
					</div>
					<SketchPicker
						width="70%"
						color={color}
						onChange={handleColorChange}
						onChangeComplete={handleValidateColor}
						className="mb-10"
						disableAlpha
					/>
					<div role="alert" className={`text-sm text-rose-700 ${nameError ? "opacity-100" : "opacity-0"} h-5`}>
						<span>{nameError}</span>
					</div>
					<input
						type="text"
						id="color-name"
						placeholder="Color Name"
						value={name}
						onChange={handleNameChange}
						className={`px-2.5 py-3.5 outline-rose-700 border-1 focus:border-transparent rounded-xl w-[70%] ${
							nameError ? "border-rose-700" : ""
						}`}
					/>
					<button className="d-btn border-0 d-btn-lg mt-4 rounded-lg" style={buttonStyles} onClick={handleAddColor}>
						Add Color
					</button>
				</form>
			</div>
		</>
	);
};
