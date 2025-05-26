import React from "react";
import { DeleteIcon } from "../icons";
import { isDark } from "@/utils/color";
import { IBaseColor } from "@/types/palette";
import { useCopy } from "./useCopy";

type Props = {
	children?: React.ReactNode;
	onClick?: (color: IBaseColor) => void;
	color: IBaseColor;
	showCopy?: boolean;
	onCopy?: (color: IBaseColor) => void;
	showName?: boolean;
	showMore?: boolean;
	onShowMore?: (color: IBaseColor) => void;
	showDelete?: boolean;
	onDelete?: (color: IBaseColor) => void;
};

const Copy = ({ onCopy, color }: { onCopy: Props["onCopy"]; color: Props["color"] }) => {
	const handleClick = React.useCallback(() => {
		if (onCopy) {
			onCopy(color);
		}
	}, [onCopy, color]);

	return (
		<button
			onClick={handleClick}
			className="hidden group-hover/box:block absolute w-[80px] h-[40px] bg-white/40 hover:bg-white/50 hover:cursor-pointer top-1/2 left-1/2 -translate-1/2"
		>
			Copy
		</button>
	);
};

const Name = ({ color }: { color: Props["color"] }) => {
	const dark = isDark(color.color);
	return (
		<span className={`uppercase text-sm min-w-[60px] h-[30px] font-semibold grid items-center ${dark ? "text-white" : "text-black"}`}>
			{color.name}
		</span>
	);
};

const More = ({ onShowMore, color }: { onShowMore: Props["onShowMore"]; color: Props["color"] }) => {
	const handleClick = React.useCallback(() => {
		if (onShowMore) {
			onShowMore(color);
		}
	}, [color, onShowMore]);

	return (
		<span
			onClick={handleClick}
			className="hidden group-hover/box:grid text-sm w-[60px] h-[30px] font-semibold items-center justify-center bg-white/40 hover:bg-white/50 hover:cursor-pointer"
		>
			MORE
		</span>
	);
};

const Delete = ({ onDelete, color }: { onDelete: Props["onDelete"]; color: Props["color"] }) => {
	const handleClick = React.useCallback(() => {
		if (onDelete) {
			onDelete(color);
		}
	}, [color, onDelete]);

	const dark = isDark(color.color);
	const iconStyles = {
		fill: dark ? "white" : "black",
		stroke: dark ? "white" : "black",
	};

	return (
		<span onClick={handleClick} title="Delete color" className="font-semibold flex items-center justify-center hover:cursor-pointer">
			<DeleteIcon size="small" {...iconStyles} className="hover:scale-120 transition-[scale] duration-200" />
		</span>
	);
};

export const ColorBox = (props: Props) => {
	const { color, onClick, showCopy, onCopy, showName = true, showMore, onShowMore, showDelete, onDelete } = props;

	const handleClick = React.useCallback(() => {
		if (onClick) {
			onClick(color);
		}
	}, [color, onClick]);

	const { copy } = useCopy(color);
	
	const handleCopy = React.useCallback((color: IBaseColor) => {
		copy();
		if(onCopy) {
			onCopy(color);
		}
	}, [copy, onCopy]);

	return (
		<div style={{ background: color.color }} className="group/box relative flex" onClick={handleClick}>
			{showCopy && <Copy color={color} onCopy={handleCopy} />}
			<div className="pl-1 pr-0 pt-0.5 pb-0 w-full self-end justify-self-end flex justify-between">
				{showName && <Name color={color} />}
				{showMore && <More color={color} onShowMore={onShowMore} />}
				{showDelete && <Delete color={color} onDelete={onDelete} />}
			</div>
		</div>
	);
};
