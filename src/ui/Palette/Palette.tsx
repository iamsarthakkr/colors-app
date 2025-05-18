"use client";

import React from "react";
import { notFound, useRouter } from "next/navigation";
import { IBaseColor } from "@/types/palette";
import { ColorBox } from "./ColorBox";
import { useAppContextActions } from "../context/useContext";
import { Footer, Navbar } from "../components";

type Props = {
	paletteId: string;
};

export const Palette = (props: Props) => {
	const [colorLevel, setColorLevel] = React.useState(500);
	const actions = useAppContextActions();
	const router = useRouter();
	const { paletteId } = props;

	const onShowPalette = React.useCallback(
		(colorId: string) => {
			router.push(`/palette/${paletteId}/${colorId}`);
		},
		[paletteId, router]
	);

	const handleLevelChange = React.useCallback((level: number) => {
		setColorLevel(level);
	}, []);

	const handleFormatChange = React.useCallback((format: string) => {
		console.log({ format });
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
		return {
			name: shade.name,
			color: shade.hex,
			id: color.id,
		};
	});

	return (
		<main className="h-full w-full flex flex-col m-0 p-0">
			<Navbar
				showShadeControls
				colorLevel={colorLevel}
				colorFormat="hex"
				onColorLevelChange={handleLevelChange}
				onColorFromatChange={handleFormatChange}
			/>
			<div className="w-full flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 auto-rows-fr">
				{colors.map((color) => {
					return <ColorBox showMore onShowPalette={onShowPalette} color={color} key={color.id} />;
				})}
			</div>
			<Footer displayName={`${palette.paletteName} ${palette.emoji}`} />
		</main>
	);
};
