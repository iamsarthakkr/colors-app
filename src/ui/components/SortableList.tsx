import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, rectSortingStrategy, SortableContext, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

export type SortableItem = { id: string };

type Props = {
	items: Array<SortableItem>;
	children: React.ReactNode;
	onReorder: (items: SortableItem[]) => void;
};

export const SortableList = (props: Props) => {
	const { items, children, onReorder } = props;

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

			const oldIndex = items.findIndex((color) => color.id === active.id);
			const newIndex = items.findIndex((color) => color.id === over.id);

			onReorder(arrayMove(items, oldIndex, newIndex));
		}
	};

	return (
		<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
			<SortableContext items={props.items} strategy={rectSortingStrategy}>
				{children}
			</SortableContext>
		</DndContext>
	);
};
