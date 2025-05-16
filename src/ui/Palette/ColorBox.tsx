import { IColor } from "@/types/palette";

type Props = {
	color: IColor;
};

export const ColorBox = (props: Props) => {
	const { color } = props;
	return (
		<div style={{ background: color.color }} className="group relative flex">
			<button className="hidden group-hover:block absolute w-[80px] h-[40px] bg-white/40 hover:bg-white/50 hover:cursor-pointer top-1/2 left-1/2 -translate-1/2">
				Copy
			</button>
			<div className="px-1 py-0.5 w-full self-end justify-self-end flex justify-between">
				<span className="uppercase text-sm w-[60px] h-[30px] font-semibold grid items-center">
					{color.name}
				</span>
				<span className="hidden group-hover:grid text-sm w-[60px] h-[30px] font-semibold items-center justify-center bg-white/40 hover:bg-white/50 hover:cursor-pointer">
					MORE
				</span>
			</div>
		</div>
	);
};
