"use client";

import React from "react";
import { notFound, useRouter } from "next/navigation";
import { IBaseColor, IColor } from "@/types/palette";
import { useAppContextActions } from "../../context/useContext";
import { Footer, Navbar } from "../../components";
import { colorEnricher, formats } from "@/utils/colors";
import { PaletteGrid } from "./PaletteGrid";
import { ColorBoxProps } from "../ColorBox";

type Props = {
	paletteId: string;
};

export const Palette = (props: Props) => {
	const [colorLevel, setColorLevel] = React.useState(500);
	const [colorFormat, setColorFormat] = React.useState(formats[0]);

	const actions = useAppContextActions();
	const router = useRouter();
	const { paletteId } = props;

	const handleShowPalette = React.useCallback(
		(color: IBaseColor) => {
			router.push(`/palette/${paletteId}/colors/${color.id}`);
		},
		[paletteId, router]
	);

	const handleLevelChange = React.useCallback((level: number) => {
		setColorLevel(level);
	}, []);

	const handleFormatChange = React.useCallback((format: string) => {
		setColorFormat(format);
	}, []);

	const palette = React.useMemo(() => actions.getPalette(paletteId), [paletteId, actions]);

	if (!palette) {
		notFound();
	}
	
	const enrichedColors: IColor[] = React.useMemo(() => {
		return palette.colors.map((color) => colorEnricher(color));
	}, [palette.colors]);

	const colors: IBaseColor[] = React.useMemo(() => {
		return enrichedColors.map((color) => {
			const shade = color.shades.find((shade) => shade.weight === colorLevel);
			if (!shade) {
				return color;
			}

			const ret = { ...shade };
			ret.id = color.id; // for routing to base color instead of a specific shade
			return ret;
		});
	}, [colorLevel, enrichedColors]);
	
	const colorBoxProps: Partial<ColorBoxProps> = {
		format: colorFormat,
		showMore: true,
		onShowMore: handleShowPalette,
		showCopy: true,
	};

	return (
		<main className="h-full w-full flex flex-col m-0 p-0">
			<Navbar
				showShadeControls
				colorLevel={colorLevel}
				colorFormat={colorFormat}
				onColorLevelChange={handleLevelChange}
				onColorFromatChange={handleFormatChange}
			/>
			<PaletteGrid colors={colors} colorBoxProps={colorBoxProps} />
			<Footer displayName={`${palette.paletteName} ${palette.emoji}`} />
		</main>
	);
};
