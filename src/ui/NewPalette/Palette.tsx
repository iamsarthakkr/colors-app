"use client";

import React from "react";
import { IBaseColor } from "@/types/palette";
import { ColorBox } from "../ColorBox/ColorBox";

type Props = {
	colors: IBaseColor[];
	onDeleteColor: (color: IBaseColor) => void;
};

export const Palette = (props: Props) => {
	const { colors, onDeleteColor } = props;

	return (
		<div className="h-full max-h-full w-full flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 auto-rows-[25%]">
			{colors.map((color) => {
				return <ColorBox color={color} key={color.id} showDelete onDelete={onDeleteColor} />;
			})}
		</div>
	);
};
