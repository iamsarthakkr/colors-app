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
			className={`${SizeMap[size]} group-has-checked:w-0 overflow-hidden bg-white shadow-xl transition-[width] duration-100 relative`}
		>
			<div className={`group-has-checked:hidden transition-[display] duration-200 ${className}`}>
				{children}
			</div>
		</section>
	);
};

const DrawerHeader = (props: BaseLayoutProps) => {
	return (
		<header className="h-15 grow-0 flex items-center shadow-sm relative">
			<section className="ml-2 flex justify-center items-center">
				<label
					htmlFor="drawer-toggle"
					title="Toggle sidebar"
					className="inline-block cursor-pointer text-black rounded"
				>
					<HamburgerIcon />
				</label>
			</section>
			<section className="ml-10 flex-1">
				{props.children}
			</section>
		</header>
	);
};

const DrawerMain = (props: BaseLayoutProps) => {
	return <main className={`flex-1 ${props.className}`}>{props.children}</main>;
};

export const Drawer = (props: BaseLayoutProps) => {
	const { children, className = "" } = props;
	const childList = React.Children.toArray(children);

	const getSlot = React.useCallback(
		(element: React.ElementType) => {
			return childList.find((child) => React.isValidElement(child) && child.type === element);
		},
		[childList]
	);

	return (
		<div className={`h-full w-full flex group ${className}`}>
			<input type="checkbox" id="drawer-toggle" className="hidden" />
			{/* Drawer */}
			{getSlot(Drawer.Drawer)}
			<section className="flex-1 flex flex-col">
				{getSlot(Drawer.Header)}
				{getSlot(Drawer.Main)}
			</section>
		</div>
	);
};

Drawer.Drawer = DrawerDrawer;
Drawer.Header = DrawerHeader;
Drawer.Main = DrawerMain;
