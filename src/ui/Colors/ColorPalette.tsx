"use client";

import React from "react";
import { notFound } from "next/navigation";
import { ColorBox } from "../Palette/ColorBox";
import { useAppContextActions } from "../context/useContext";
import { Footer, Navbar } from "../components";
import { formats, getColor } from "@/utils/color";

type Props = {
	paletteId: string;
	colorId: string;
};

export const ColorPalette = (props: Props) => {
	const [colorFormat, setColorFormat] = React.useState(formats[0]);

	const actions = useAppContextActions();
	const { paletteId, colorId } = props;
	const palette = React.useMemo(() => actions.getPalette(paletteId), [paletteId, actions]);
	const color = React.useMemo(() => actions.getColor(paletteId, colorId), [paletteId, colorId, actions]);

	const handleFormatChange = React.useCallback((format: string) => {
		setColorFormat(format);
	}, []);

	if (!palette || !color) {
		notFound();
	}

	const colors = color.shades.map((shade) => {
		const color = getColor(shade, colorFormat); 
		return <ColorBox color={color} key={color.id} />;
	});

	return (
		<main className="h-full w-full flex flex-col m-0 p-0">
			<Navbar onColorFromatChange={handleFormatChange} colorFormat={colorFormat} />
			<div className="w-full flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 auto-rows-fr">{colors}</div>
			<Footer displayName={`${palette.paletteName} ${palette.emoji}`} />
		</main>
	);
};
