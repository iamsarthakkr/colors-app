import { IBaseColor } from "@/types/palette";

type CopiedContainerProps = {
	color: IBaseColor;
};

export const CopiedContainer = (props: CopiedContainerProps) => {
	return (
		<div className="h-full w-full flex flex-col items-center justify-center gap-2">
			<span className="text-lg font-semibold">Copied!</span>
			<span className="text-lg font-semibold">{props.color.color}</span>
		</div>
	);
};
