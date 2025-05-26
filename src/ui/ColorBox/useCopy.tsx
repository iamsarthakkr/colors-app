import React from "react";
import { IBaseColor } from "@/types/palette";
import { toast } from "react-toastify";
import { CopiedContainer } from "./CopyContainer";

export const useCopy = (color: IBaseColor) => {
	const [copied, setCopied] = React.useState(false);

	const handleCopy = React.useCallback(() => {
		const copy = async () => {
			if (copied) {
				return;
			}
			
			await navigator.clipboard.writeText(color.color);
			toast(<CopiedContainer color={color} />, {
				position: "bottom-left",
				className: "!w-[300px] h-[100px]",
				autoClose: 3000,
			});
			setCopied(true);
			setTimeout(() => {
				setCopied(false);
			}, 3000);
		}
		copy();
	}, [color, copied]);

	return { copy: handleCopy };
};
