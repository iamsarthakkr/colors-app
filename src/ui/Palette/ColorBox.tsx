"use client";

import { IColor } from "@/types/palette";
import React from "react";
import { toast } from "react-toastify";

type Props = {
	color: IColor;
};

const CopiedContainer = (props: Props) => {
	return (
		<div className="h-full w-full flex flex-col items-center justify-center gap-2">
			<span className="text-lg font-semibold">Copied!</span>
			<span className="text-lg font-semibold">{props.color.color}</span>
		</div>
	);
};

export const ColorBox = (props: Props) => {
	const { color } = props;

	const handleClick = React.useCallback(async () => {
		await navigator.clipboard.writeText(color.color);
		toast(<CopiedContainer color={color} />, {
			position: "bottom-left",
			className: "!w-[200px] h-[100px]",
			autoClose: 3000,
		});
	}, [color]);

	return (
		<div style={{ background: color.color }} className="group relative flex" onClick={handleClick}>
			<button className="hidden group-hover:block absolute w-[80px] h-[40px] bg-white/40 hover:bg-white/50 hover:cursor-pointer top-1/2 left-1/2 -translate-1/2">
				Copy
			</button>
			<div className="px-1 py-0.5 w-full self-end justify-self-end flex justify-between">
				<span className="uppercase text-sm w-[60px] h-[30px] font-semibold grid items-center">
					{color.name}
				</span>
				<span className="hidden group-hover:grid text-sm w-[60px] h-[30px] font-semibold items-center justify-center bg-white/40 hover:bg-white/50 hover:cursor-pointer">
					MORE
				</span>
			</div>
		</div>
	);
};
