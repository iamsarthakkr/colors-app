"use client";

import React from "react";
import { Drawer } from "../components/Drawer";
import { NewPaletteForm } from "./NewPaletteForm";

export const NewPalette = () => {
	return (
		<main className="h-full w-full">
			<Drawer>
				<Drawer.Drawer className="h-full">
					<NewPaletteForm />
				</Drawer.Drawer>
				<Drawer.Header></Drawer.Header>
				<Drawer.Main></Drawer.Main>
			</Drawer>
		</main>
	);
};
