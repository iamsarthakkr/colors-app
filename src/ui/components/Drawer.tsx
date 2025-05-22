"use client";

import React from "react";
import { HamburgerIcon } from "../icons";

type BaseLayoutProps = {
	className?: string;
	children?: React.ReactNode;
};

const SizeMap = {
	small: "w-60",
	medium: "w-80",
	large: "w-120",
} as const;

type DrawerProps = BaseLayoutProps & {
	size?: "small" | "medium" | "large";
};

const DrawerDrawer = (props: DrawerProps) => {
	const { children, className = "", size = "medium" } = props;
	return (
		<section
			className={`${SizeMap[size]} group-has-checked:w-0 overflow-hidden bg-white shadow-xl transition-all duration-100 relative`}
		>
			<div className={`group-has-checked:hidden transition-[display] duration-200 ${className}`}>
				{children}
			</div>
		</section>
	);
};

const DrawerHeader = (props: BaseLayoutProps) => <>{props.children}</>;
const Drawermain = (props: BaseLayoutProps) => <>{props.children}</>;

export const Drawer = (props: BaseLayoutProps) => {
	const { children, className = "" } = props;
	const childList = React.Children.toArray(children) as React.ReactElement[];
	console.log(childList.map((c) => c));

	const getSlot = React.useCallback(
		(element: React.ElementType) => {
			return childList.find((child) => React.isValidElement(child) && child.type === element);
		},
		[childList]
	);

	const header = childList.find((child) => React.isValidElement(child) && child.type === Drawer.Drawer);
	console.log({ header });

	return (
		<div className={`h-full w-full flex group ${className}`}>
			<input type="checkbox" id="drawer-toggle" className="hidden" />
			{/* Drawer */}
			{getSlot(Drawer.Drawer)}
			<section className="flex-1 flex flex-col">
				<header className="h-15 grow-0 flex items-center">
					<label
						htmlFor="drawer-toggle"
						title="Toggle sidebar"
						className="inline-block cursor-pointer p-2 text-black rounded"
					>
						<HamburgerIcon />
					</label>
					{getSlot(Drawer.Header)}
				</header>
				<main className="flex-1">{getSlot(Drawer.Main)}</main>
			</section>
		</div>
	);
};

Drawer.Drawer = DrawerDrawer;
Drawer.Header = DrawerHeader;
Drawer.Main = Drawermain;
