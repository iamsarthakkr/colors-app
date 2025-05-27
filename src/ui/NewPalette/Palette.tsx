"use client";

import React from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, rectSortingStrategy, SortableContext, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { IBaseColor } from "@/types/palette";
import { Props as ColorBoxProps } from "../ColorBox/ColorBox";
import { PaletteGrid } from "../Palette/PaletteGrid";

type Props = {
	colors: IBaseColor[];
	onDeleteColor: (color: IBaseColor) => void;
	onColorSort: (colors: IBaseColor[]) => void;
};

export const Palette = (props: Props) => {
	const { colors, onDeleteColor, onColorSort } = props;

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			console.log({ active, over });

			const oldIndex = colors.findIndex((color) => color.id === active.id);
			const newIndex = colors.findIndex((color) => color.id === over.id);

			onColorSort(arrayMove(colors, oldIndex, newIndex));
		}
	};

	const colorBoxProps: Partial<ColorBoxProps> = {
		draggable: true,
		showCopy: true,
		showDelete: true,
		onDelete: onDeleteColor,
	};

	return (
		<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
			<SortableContext items={colors} strategy={rectSortingStrategy}>
				<PaletteGrid colors={colors} colorBoxProps={colorBoxProps} />
			</SortableContext>
		</DndContext>
	);
};
