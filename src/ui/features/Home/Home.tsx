"use client";

import React from "react";
import Link from "next/link";
import { IBasePalette } from "@/types/palette";
import { ContextMenu } from "@/ui/components/ContextMenu";
import { useAppContext, useAppContextActions } from "../../context/useContext";
import { useMiniPaletteContextItems } from "./miniPaletteContext";

const MiniPalette = (palette: IBasePalette) => {
	const ref = React.useRef(null);
	const actions = useAppContextActions();
	const actionsRef = React.useRef(actions); 

	const contextItemsProvider = useMiniPaletteContextItems({ palette, contextActionRef: actionsRef });

	return (
		<>
			<ContextMenu ref={ref} contextItemsProvider={contextItemsProvider} />
			<Link href={`/palette/${palette.id}`}>
				<div className="h-full w-full flex flex-col cursor-pointer" ref={ref}>
					<section className="flex-[80%] grid grid-cols-5 auto-cols-fr auto-rows-[25%] bg-gray-900">
						{palette.colors.map((color) => {
							return <div className="" style={{ backgroundColor: color.color }} key={color.id} />;
						})}
					</section>
					<section className="flex-[20%] flex justify-between items-center">
						<span className="font-semibold text-cyan-600 hover:text-cyan-700">{palette.paletteName}</span>
						<span>{palette.emoji}</span>
					</section>
				</div>
			</Link>
		</>
	);
};

export const Home = () => {
	const context = useAppContext();
	const { palettes } = context;

	return (
		<main className="h-full w-full flex flex-col m-0 p-0 bg-blue-200">
			{/* header */}
			<header className="w-[90%] md:w-[50%] h-[100px] mx-auto flex justify-between items-center ">
				<h1 className="font-semibold tracking-[2px] text-[34px] text-cyan-800">COLORSUI</h1>
				<span className="text-cyan-800 font-semibold tracking-wide hover:underline hover:text-cyan-900"><Link href={'/palette/new'}>Add Palette</Link></span>
			</header>
			{/* color boxes */}
			<div className="w-full px-6 h-[90%] mx-auto flex justify-center overflow-scroll">
				<ul className="w-[60%] grid grid-cols-1 md:grid-cols-3 auto-cols-fr auto-rows-[200px] gap-[40px]">
					{palettes.map((palette) => {
						return (
							<li key={palette.id} className="px-[15px] pt-[10px] pb-0 bg-white rounded-sm">
								<MiniPalette {...palette} />
							</li>
						);
					})}
				</ul>
			</div>
		</main>
	);
};
