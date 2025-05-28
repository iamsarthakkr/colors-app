"use client";

import React from "react";
import presetColors from "@/data/seedColors.json";
import { ColorBox } from "../ColorBox";
import { IBaseColor } from "@/types/palette";
import { toast } from "react-toastify";

type Props = {
	onSelectPreset: (color: IBaseColor) => void;
	onCancel: () => void;
};

export const ColorsPreset = (props: Props) => {
	const [selectedColor, setSelectedColor] = React.useState<IBaseColor | null>(null);

	const { onSelectPreset, onCancel } = props;

	const handleSelectColor = React.useCallback((color: IBaseColor) => {
		setSelectedColor(color);
	}, []);

	const handleAddToPalette = React.useCallback(() => {
		if (!selectedColor) {
			return toast("Please Select a color!", {
				position: "bottom-left",
				autoClose: 3000,
			});
		}
		onSelectPreset(selectedColor);
	}, [onSelectPreset, selectedColor]);

	return (
		<div className="w-full h-full flex flex-col">
			<h2 className="text-center text-2xl text-cyan-700 mb-4">Choose from preset colors</h2>
			<div className="w-full flex-1 flex justify-center items-center overflow-y-scroll pt-2">
				<div className="w-full h-full grid grid-cols-[repeat(auto-fill,50px)] grid-rows-[repeat(auto-fill,50px)] justify-center gap-4">
					{presetColors.map((color) => (
						<div key={color.id}>
							<ColorBox
								onClick={handleSelectColor}
								color={color}
								showName={false}
								className={`!w-[50px] !h-[50px] hover:scale-115 transition-transform duration-75 ${
									selectedColor?.id === color.id && "border-cyan-900 border-1 scale-115"
								}`}
							/>
						</div>
					))}
				</div>
			</div>
			<div className="mt-5 mb-4 px-5 flex justify-between">
				<button className="d-btn d-btn-primary" onClick={handleAddToPalette}>
					Use Color
				</button>
				<button className="d-btn d-btn-secondary" onClick={onCancel}>
					Cancel
				</button>
			</div>
		</div>
	);
};
