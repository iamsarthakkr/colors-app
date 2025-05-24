import * as React from "react";

const SizeMap = {
	small: 24,
	medium: 32,
	large: 48,
};

type BaseSVGProps = {
	className?: string;
	path?: string;
	size?: keyof typeof SizeMap;
	stroke?: string;
	fill?: string;
	onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

type SVGProps = BaseSVGProps &
	React.JSX.IntrinsicAttributes &
	React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

export const SvgIcon = (props: SVGProps) => {
	const {
		onClick,
		className = "",
		path,
		size = "medium",
		stroke = "currentColor",
		fill = "currentColor",
		...others
	} = props;
	return (
		<i onClick={onClick} className={className} {...others}>
			<svg className="p-0" viewBox="0 0 24 24" width={SizeMap[size]} height={SizeMap[size]}>
				<path
					fill={fill}
					stroke={stroke}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.5"
					d={path}
				/>
			</svg>
		</i>
	);
};

export const CreateSvgFromPath = (path: string, options: Partial<SVGProps> = {}): React.FC<SVGProps> => {
	const Component: React.FC<SVGProps> = (props) => {
		const allProps: SVGProps = { ...props, ...options };
		return <SvgIcon path={path} {...allProps} />;
	};
	Component.displayName = `SvgIcon(${path})`;
	return Component;
};
