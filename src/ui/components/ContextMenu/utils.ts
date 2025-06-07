import { Coord } from "./types";

export const withinNode = ({ x, y }: Coord, rect: DOMRect) => {
	const left = rect.left,
		top = rect.top,
		right = left + rect.width,
		bottom = top + rect.height;

	return left <= x && x <= right && top <= y && y <= bottom;
};
