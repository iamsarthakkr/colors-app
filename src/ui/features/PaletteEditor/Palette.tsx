"use client";

import React from "react";
import { IBaseColor } from "@/types/palette";
import { PaletteGrid } from "../Palette/PaletteGrid";
import { ColorBoxProps } from "../ColorBox";
import { SortableItem, SortableList } from "@/ui/components/SortableList";
import { usePaletteContextItems } from "./paletteContextItems";

type Props = {
	colors: IBaseColor[];
	onDeleteColor: (color: IBaseColor) => void;
	onColorSort: (colors: IBaseColor[]) => void;
	onEditColor: (color: IBaseColor) => void;
};

export const Palette = (props: Props) => {
	const { colors, onDeleteColor, onColorSort, onEditColor } = props;
	
	const colorBoxContextItemsProvider = usePaletteContextItems({ onEditColor });

	const colorIds = React.useMemo(() => {
		return colors.map((color) => ({ id: color.id }));
	}, [colors]);

	const handleColorReorder = React.useCallback((newItems: SortableItem[]) => {
		const colorSet = new Map<string, IBaseColor>();
		colors.forEach((color) => colorSet.set(color.id, color));
		
		const newColors = newItems.map((item) => colorSet.get(item.id) as IBaseColor);
		onColorSort(newColors);
	}, [colors, onColorSort]);

	const colorBoxProps: Partial<ColorBoxProps> = {
		draggable: true,
		showCopy: true,
		showDelete: true,
		onDelete: onDeleteColor,
		contextItemsProvider: colorBoxContextItemsProvider,
	};

	return (
		<SortableList items={colorIds} onReorder={handleColorReorder}>
			<PaletteGrid colors={colors} colorBoxProps={colorBoxProps} />
		</SortableList>
	);
};
