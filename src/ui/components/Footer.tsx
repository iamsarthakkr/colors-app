import React from 'react'

type Props = {
	displayName: string;
}
export const Footer = (props: Props) => {
	return (
		<footer className="h-[50px] px-[20px] flex justify-between items-center bg-teal-100 text-white">
			<h1 className="font-bold text-xl text-cyan-900">{props.displayName}</h1>
		</footer>
	);
};
