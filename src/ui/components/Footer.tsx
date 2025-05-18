import React from 'react'

type Props = {
	displayName: string;
}
export const Footer = (props: Props) => {
	
			return <footer className="h-[50px] px-[20px] flex justify-between items-center">
				<h1 className="font-bold text-2xl text-cyan-700">
					{props.displayName}
				</h1>
			</footer>
};
