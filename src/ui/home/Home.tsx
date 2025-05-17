"use client";

import Link from "next/link";
import { useAppContext } from "../context/useContext";

export const Home = () => {
	const context = useAppContext();
	console.log(context);
	const { palettes } = context;

	return (
		<main className="h-full w-full flex flex-col m-0 p-0">
			{/* header */}
			<header className="w-full h-[40px] flex justify-center items-center ">
				<h1 className="font-bold text-2xl text-cyan-700">Colors App</h1>
			</header>
			{/* color boxes */}
			<div className="w-[60%] mx-auto mt-10 flex justify-center">
				<ul className="text-center">
					{palettes.map((palette) => {
						return (
							<li
								key={palette.id}
								className="px-[20px] py-[5px] font-semibold text-2xl hover:text-amber-500"
							>
								<Link href={`/palette/${palette.id}`}>{palette.paletteName}</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</main>
	);
};
