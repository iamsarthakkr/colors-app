"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ColorChangeHandler } from "react-color";
const SketchPicker = dynamic(() => import("react-color").then((mod) => mod.SketchPicker), { ssr: false });

import { isDark } from "@/utils/color";

export const NewPaletteForm = () => {
	const [color, setColor] = React.useState("#ff0000");
	const [buttonStyles, setButtonStyles] = React.useState<React.CSSProperties>({});

	React.useEffect(() => {
		const dark = isDark(color);
		setButtonStyles({
			background: color,
			color: dark ? "white" : "black"
		})
	}, [color]);
	
	const handleColorChange:ColorChangeHandler = React.useCallback((color) => {
		setColor(color.hex);		
	}, []);

	return (
		<div className="h-full w-full flex flex-col justify-center items-center">
			<h1 className="text-xl tracking-wider uppercase text-center mb-10 font-semibold text-cyan-700">
				Choose Color for your Palette
			</h1>
			<div className="flex gap-3">
				<button className="d-btn d-btn-primary">Clear Palette</button>
				<button className="d-btn d-btn-secondary">Random Color</button>
			</div>
			<SketchPicker width="70%" color={color} onChange={handleColorChange} className="my-10" disableAlpha />
			<input
				type="text"
				id="color-name"
				placeholder="Color Name"
				className="px-2.5 py-3.5 outline-rose-700 border-1 focus:border-transparent rounded-xl w-[70%]"
			/>
			<button className="d-btn border-0 d-btn-xl mt-4 rounded-lg" style={buttonStyles}>
				Add Color
			</button>
		</div>
	);
};
