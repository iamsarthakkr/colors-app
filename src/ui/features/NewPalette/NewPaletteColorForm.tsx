"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ColorChangeHandler } from "react-color";
const SketchPicker = dynamic(() => import("react-color").then((mod) => mod.SketchPicker), { ssr: false });

import { isDark } from "@/utils/colors";


type Props = {
	onAddColor: (color: string, name: string) => void;
	colorNameValidator: (name: string) => string;
	colorValidator: (color: string) => string;
};

export const NewPaletteColorForm = (props: Props) => {
	const [color, setColor] = React.useState("#ff0000");
	const [name, setName] = React.useState("");
	const [nameError, setNameError] = React.useState("");
	const [colorError, setColorError] = React.useState("");

	const [buttonStyles, setButtonStyles] = React.useState<React.CSSProperties>({});
	const { onAddColor, colorNameValidator, colorValidator } = props;

	React.useEffect(() => {
		const dark = isDark(color);
		setButtonStyles({
			background: color,
			color: dark ? "white" : "black",
		});
	}, [color]);

	const handleValidateColor: ColorChangeHandler = React.useCallback(
		(color) => {
			setColorError(colorValidator(color.hex));
		},
		[colorValidator]
	);

	const handleColorChange: ColorChangeHandler = React.useCallback((color) => {
		setColor(color.hex);
	}, []);

	const handleNameChange = React.useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;
			setName(value);
			const err = colorNameValidator(value);
			setNameError(err);
		},
		[colorNameValidator]
	);

	const handleAddColor = React.useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();
			const colorErr = colorValidator(color),
				nameErr = colorNameValidator(name);
			setNameError(nameErr);
			setColorError(colorErr);
			if (colorErr || nameErr) {
				return;
			}
			onAddColor(color, name);
		},
		[color, name, colorValidator, colorNameValidator, onAddColor]
	);

	return (
		<div className="h-full w-full flex flex-col justify-center items-center">
			<h1 className="text-xl tracking-wider uppercase text-center mb-10 font-semibold text-cyan-700">
				Choose Color for your Palette
			</h1>
			<div className="flex gap-3">
				<button className="d-btn d-btn-primary">Clear Palette</button>
				<button className="d-btn d-btn-secondary">Random Color</button>
			</div>
			<form className="flex flex-col justify-center items-center">
				<div
					role="alert"
					className={`text-sm mt-10 text-rose-700 ${colorError ? "opacity-100" : "opacity-0"} h-5`}
				>
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
				<button
					className="d-btn border-0 d-btn-xl mt-4 rounded-lg"
					style={buttonStyles}
					onClick={handleAddColor}
				>
					Add Color
				</button>
			</form>
		</div>
	);
};
