"use client";

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useAppContextActions } from "../context/useContext";
import { Footer, Navbar } from "../components";
import { formats } from "@/utils/color";
import { PaletteGrid } from "../Palette/PaletteGrid";
import { ColorBoxProps } from "../ColorBox";

type Props = {
	paletteId: string;
	colorId: string;
};

export const ColorPalette = (props: Props) => {
	const [colorFormat, setColorFormat] = React.useState(formats[0]);

	const actions = useAppContextActions();
	const { paletteId, colorId } = props;
	const palette = React.useMemo(() => actions.getPalette(paletteId), [paletteId, actions]);
	const color = React.useMemo(() => actions.getEnrichedColor(paletteId, colorId), [paletteId, colorId, actions]);

	const handleFormatChange = React.useCallback((format: string) => {
		setColorFormat(format);
	}, []);

	if (!palette || !color) {
		notFound();
	}

	const colorBoxProps: Partial<ColorBoxProps> = {
		format: colorFormat,
		showCopy: true,
	};

	return (
		<main className="h-full w-full flex flex-col m-0 p-0">
			<Navbar onColorFromatChange={handleFormatChange} colorFormat={colorFormat} />
			<PaletteGrid colors={color.shades} colorBoxProps={colorBoxProps}>
				<div className="bg-gray-100 flex justify-center items-center">
					<span className="w-[80px] h-[40px] font-semibold flex items-center justify-center bg-black/20 hover:bg-black/30 hover:cursor-pointer">
						<Link href={`/palette/${paletteId}`}>Back</Link>
					</span>
				</div>
			</PaletteGrid>
			<Footer displayName={`${palette.paletteName} ${palette.emoji}`} />
		</main>
	);
};
