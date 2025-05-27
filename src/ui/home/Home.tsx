"use client";

import Link from "next/link";
import { useAppContext } from "../context/useContext";
import { IBasePalette } from "@/types/palette";

const MiniPalette = (palette: IBasePalette) => {
	return (
		<div className="h-full w-full flex flex-col">
			<section className="flex-[80%] grid grid-cols-5 auto-cols-fr auto-rows-fr bg-gray-900">
				{palette.colors.map((color) => {
					return <div className="" style={{ backgroundColor: color.color }} key={color.id} />;
				})}
			</section>
			<section className="flex-[20%] flex justify-between items-center">
				<span className="font-semibold text-cyan-600 hover:text-cyan-700">{palette.paletteName}</span>
				<span>{palette.emoji}</span>
			</section>
		</div>
	);
};

export const Home = () => {
	const context = useAppContext();
	const { palettes } = context;

	return (
		<main className="h-full w-full flex flex-col m-0 p-0 bg-blue-200">
			{/* header */}
			<header className="w-full xl:w-[50%] h-[100px] mx-auto flex justify-between items-center ">
				<h1 className="font-semibold tracking-[2px] text-[34px] text-cyan-800">COLORSUI</h1>
				<span className="text-cyan-800 font-semibold tracking-wide hover:underline hover:text-cyan-900"><Link href={'/palette/new'}>Add Palette</Link></span>
			</header>
			{/* color boxes */}
			<div className="w-full px-6 xl:w-[50%] h-[70%] xl:px-0 mx-auto flex justify-center">
				<ul className="w-full grid grid-cols-3 auto-cols-fr auto-rows-fr gap-[40px]">
					{palettes.map((palette) => {
						return (
							<li
								key={palette.id}
								className="px-[15px] pt-[10px] pb-0 bg-white rounded-sm"
							>
								<Link href={`/palette/${palette.id}`}>
									<MiniPalette {...palette} />
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</main>
	);
};
