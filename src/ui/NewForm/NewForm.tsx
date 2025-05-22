"use client";

import React from "react";
import { Drawer } from "../components/Drawer";
import ColorPicker, { Color } from '@rc-component/color-picker';


export const NewForm = () => {

	const handleColorChange = React.useCallback((color:Color) => {
		console.log({ color: color.toHexString() });
	}, []);

	return (
		<main className="h-full w-full">
			<Drawer>
				<Drawer.Drawer className="h-full w-full flex flex-col justify-center items-center">
					<h1 className="text-xl tracking-wider uppercase text-center mb-10 font-semibold text-cyan-700">
						Choose Color for your Palette
					</h1>
					<div className="flex gap-3">
						<button className="d-btn d-btn-primary">Clear Palette</button>
						<button className="d-btn d-btn-secondary">Random Color</button>
					</div>
					<ColorPicker disabledAlpha className="my-8" onChangeComplete={handleColorChange}/>
					<input
						type="text"
						id="color-name"
						placeholder="Color Name"
						className="px-2.5 py-3.5 outline-rose-700 border-1 focus:border-transparent rounded-xl w-[70%]"
					/>
					<button className="d-btn d-btn-secondary d-btn-lg mt-4 rounded-lg">Add Color</button>
				</Drawer.Drawer>
				<Drawer.Header></Drawer.Header>
				<Drawer.Main></Drawer.Main>
			</Drawer>
		</main>
	);
};
