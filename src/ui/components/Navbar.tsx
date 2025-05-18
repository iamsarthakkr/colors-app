"use client";

import Link from "next/link";
import React from "react";

type Props = {
	showShadeControls: boolean;
	onColorLevelChange?: (level: number) => void;
	colorLevel?: number;
	colorFormat?: string;
	onColorFromatChange: (format: string) => void;
};

export const Navbar = (props: Props) => {
	const handleColorLevelChange = React.useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			if (props.onColorLevelChange) {
				props.onColorLevelChange(parseInt(e.target.value));
			}
		},
		[props]
	);

	const handleColorFormatChange = React.useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>) => {
			const value = e.target.value;
			props.onColorFromatChange(value);
		},
		[props]
	);

	return (
		<header className="w-full h-[80px] pr-[20px] flex justify-between items-center">
			<div className="self-stretch flex justify-center items-center mr-5">
				<Link
					href={"/"}
					className="font-semibold rounded-r-full text-[34px] text-cyan-800 bg-gray-200 hover:bg-gray-300
					 self-stretch tracking-[2px] px-4 mr-5 flex justify-center items-center"
				>
					COLORSUI
				</Link>
				{props.showShadeControls && (
					<>
						<span className="flex min-w-[120px] font-semibold text-xl">Level : {props.colorLevel}</span>
						<input
							onChange={handleColorLevelChange}
							type="range"
							min={100}
							max={900}
							step={100}
							value={props.colorLevel}
							className="d-range text-cyan-700 d-range-primary min-w-[300px] d-range-sm"
						/>
					</>
				)}
			</div>
			<select
				onChange={handleColorFormatChange}
				defaultValue="hex"
				className="d-select text-white text-lg w-[150px]"
			>
				<option>Hex</option>
				<option>RGB</option>
				<option>RGBA</option>
			</select>
		</header>
	);
};
