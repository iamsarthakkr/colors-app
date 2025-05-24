"use client";

import { IBaseColor } from "@/types/palette";
import { isDark } from "@/utils/color";
import React from "react";
import { toast } from "react-toastify";
import { DeleteIcon } from "../icons";

type CopiedContainerProps = {
	color: IBaseColor;
};

const CopiedContainer = (props: CopiedContainerProps) => {
	return (
		<div className="h-full w-full flex flex-col items-center justify-center gap-2">
			<span className="text-lg font-semibold">Copied!</span>
			<span className="text-lg font-semibold">{props.color.color}</span>
		</div>
	);
};

type ColorBoxProps = {
	color: IBaseColor;
	showMore?: boolean;
	onShowPalette?: (colorId: string) => void;
	showDelete?: boolean;
	onDelete?: (color: IBaseColor) => void;
};

export const ColorBox = (props: ColorBoxProps) => {
	const [copied, setCopied] = React.useState(false);

	const { color, onShowPalette, showMore, showDelete, onDelete } = props;
	const dark = isDark(color.color);

	const handleCopy = React.useCallback(async () => {
		if (copied) {
			return;
		}

		await navigator.clipboard.writeText(color.color);
		toast(<CopiedContainer color={color} />, {
			position: "bottom-left",
			className: "!w-[300px] h-[100px]",
			autoClose: 3000,
		});
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
		}, 3000);
	}, [color, copied]);

	const handleShowMore = React.useCallback(
		(e: React.MouseEvent) => {
			e.stopPropagation();
			if (onShowPalette) {
				onShowPalette(color.id);
			}
		},
		[color, onShowPalette]
	);

	const handleDelete = React.useCallback((e: React.MouseEvent) => {
		e.stopPropagation();
		if(onDelete) {
			onDelete(color);
		}
	}, [color, onDelete]);
	
	const iconStyles = {
		fill: dark ? "white" : "black",
		stroke: dark ? "white" : "black",
	}

	return (
		<div style={{ background: color.color }} className="group/box relative flex" onClick={handleCopy}>
			<button className="hidden group-hover/box:block absolute w-[80px] h-[40px] bg-white/40 hover:bg-white/50 hover:cursor-pointer top-1/2 left-1/2 -translate-1/2">
				Copy
			</button>
			<div className="pl-1 pr-0 pt-0.5 pb-0 w-full self-end justify-self-end flex justify-between">
				<span
					className={`uppercase text-sm min-w-[60px] h-[30px] font-semibold grid items-center ${
						dark ? "text-white" : "text-black"
					}`}
				>
					{color.name}
				</span>
				{showMore && (
					<span
						onClick={handleShowMore}
						className="hidden group-hover/box:grid text-sm w-[60px] h-[30px] font-semibold items-center justify-center bg-white/40 hover:bg-white/50 hover:cursor-pointer"
					>
						MORE
					</span>
				)}
				{showDelete && (
					<span
						onClick={handleDelete}
						title="Delete color"
						className="font-semibold flex items-center justify-center hover:cursor-pointer"
					>
						<DeleteIcon size="small" {...iconStyles} />
					</span>
				)}
			</div>
		</div>
	);
};
