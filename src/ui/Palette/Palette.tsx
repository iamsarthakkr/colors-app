"use client";

import React from "react";
import { notFound, useRouter } from "next/navigation";
import { IBaseColor } from "@/types/palette";
import { ColorBox } from "./ColorBox";
import { useAppContextActions } from "../context/useContext";
import { Footer, Navbar } from "../components";
import { formats, getColor } from "@/utils/color";

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
		(colorId: string) => {
			router.push(`/palette/${paletteId}/${colorId}`);
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

	const colors: IBaseColor[] = palette.colors.map((color) => {
		const shade = color.shades.find((shade) => shade.weight === colorLevel);
		if (!shade) {
			return color;
		}

		const ret = getColor(shade, colorFormat);
		ret.id = color.id; // for routing to base color instead of a specific shade
		return ret;
	});

	return (
		<main className="h-full w-full flex flex-col m-0 p-0">
			<Navbar
				showShadeControls
				colorLevel={colorLevel}
				colorFormat={colorFormat}
				onColorLevelChange={handleLevelChange}
				onColorFromatChange={handleFormatChange}
			/>
			<div className="w-full flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 auto-rows-fr">
				{colors.map((color) => {
					return <ColorBox showMore onShowPalette={handleShowPalette} color={color} key={color.id} />;
				})}
			</div>
			<Footer displayName={`${palette.paletteName} ${palette.emoji}`} />
		</main>
	);
};
