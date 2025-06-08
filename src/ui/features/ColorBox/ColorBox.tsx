"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { isDark } from "@/utils/colors";
import { IBaseColor } from "@/types/palette";
import { useCopy } from "./useCopy";
import { DeleteIcon, MoveIcon } from "../../icons";

export type Props = {
	children?: React.ReactNode;
	className?: string;
	onClick?: (color: IBaseColor) => void;
	color: IBaseColor;
	showCopy?: boolean;
	onCopy?: (color: IBaseColor) => void;
	showName?: boolean;
	showMore?: boolean;
	onShowMore?: (color: IBaseColor) => void;
	showDelete?: boolean;
	onDelete?: (color: IBaseColor) => void;
	draggable?: boolean;
	format?: string;
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
		<span className={`uppercase text-sm min-w-[60px] font-semibold  ${dark ? "text-white" : "text-black"}`}>
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
			className="opacity-0 group-hover/box:opacity-100 text-sm w-[60px] h-[30px] font-semibold grid items-center justify-center bg-white/40 hover:bg-white/50 hover:cursor-pointer"
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

const DragHandle = ({ color }: { color: IBaseColor }) => {
	const { attributes, listeners } = useSortable({ id: color.id });
	return (
		<span
			className="hidden w-8 h-8 group-hover/box:flex justify-center items-center font-bold cursor-pointer text-3xl absolute right-0 top-0"
			{...attributes}
			{...listeners}
		>
			<MoveIcon size="small" />
		</span>
	);
};

export const ColorBox = (props: Props) => {
	const {
		className = "",
		color,
		onClick,
		showCopy,
		onCopy,
		showName = true,
		showMore,
		onShowMore,
		showDelete,
		onDelete,
		draggable,
		format = "hex",
	} = props;
	const ref = React.useRef<HTMLDivElement>(null);

	const { setNodeRef, transform, transition, isDragging } = useSortable({ id: props.color.id });

	const draggableStyle = draggable
		? {
				transform: CSS.Transform.toString(transform),
				transition,
				zIndex: isDragging ? 1000 : 0
		  }
		: {};

	const baseStyles = {
		background: color.color,
	};

	const handleClick = React.useCallback(() => {
		if (onClick) {
			onClick(color);
		}
	}, [color, onClick]);

	const { copy } = useCopy(color);

	const handleCopy = React.useCallback(
		(color: IBaseColor) => {
			copy(format);
			if (onCopy) {
				onCopy(color);
			}
		},
		[copy, onCopy, format]
	);

	const setRef = React.useCallback(
		(node: HTMLDivElement | null) => {
			ref.current = node;
			setNodeRef(node);
		},
		[setNodeRef]
	);

	return (
		<div
			ref={setRef}
			style={{ ...baseStyles, ...draggableStyle }}
			className={`group/box relative flex w-full h-full ${className}`}
			onClick={handleClick}
		>
			{/* <ContextMenu ref={ref} /> */}
			{showCopy && <Copy color={color} onCopy={handleCopy} />}
			{draggable && <DragHandle color={color} />}
			<div className="px-1.5 pt-0.5 pb-1 w-full self-end justify-self-end flex justify-between items-end">
				{showName && <Name color={color} />}
				{showMore && <More color={color} onShowMore={onShowMore} />}
				{showDelete && <Delete color={color} onDelete={onDelete} />}
			</div>
		</div>
	);
};
