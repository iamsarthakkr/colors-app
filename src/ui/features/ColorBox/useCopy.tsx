import React from "react";
import { IBaseColor } from "@/types/palette";
import { toast } from "react-toastify";
import { CopiedContainer } from "./CopyContainer";
import { getCopyString } from "@/utils/colors";

export const useCopy = (color: IBaseColor) => {
	const [copied, setCopied] = React.useState(false);

	const handleCopy = React.useCallback((format: string) => {
		const copy = async () => {
			if (copied) {
				return;
			}

			// convert the color to required format ..??
			const colorStr = getCopyString(color.color, format);

			await navigator.clipboard.writeText(colorStr);
			toast(<CopiedContainer color={colorStr} />, {
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
