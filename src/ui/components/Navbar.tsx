"use client";

import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";

type ChangedContainerProps = {
	format: string;
};

const ChangedContainer = (props: ChangedContainerProps) => {
	return (
		<div className="h-full w-full flex flex-col items-center justify-center gap-2">
			<span className="text-lg font-semibold">Format changed to {props.format}</span>
		</div>
	);
};

type Props = {
	colorFormat: string;
	onColorFromatChange: (format: string) => void;
	showShadeControls?: boolean;
	colorLevel?: number;
	onColorLevelChange?: (level: number) => void;
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
			toast(<ChangedContainer format={value} />, {
				position: "bottom-left",
				className: "!w-[300px] h-[100px]",
				autoClose: 2000,
			});
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
				value={props.colorFormat}
				className="d-select text-cyan-100 text-lg w-[250px] h-[60px] cursor-pointer"
			>
				<option value={"hex"}>Hex : #ffffff</option>
				<option value={"rgb"}>RGB: rgb(0 0 0)</option>
				<option value={"rgba"}>RGBA: rgb(0 0 0 / 100)</option>
			</select>
		</header>
	);
};
