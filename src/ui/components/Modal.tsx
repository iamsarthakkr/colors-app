type ModalProps = {
	open?: boolean;
	onClose: () => void;
	className?: string;
	children: React.ReactNode;
};

export const Modal = (props: ModalProps) => {
	const { open, onClose, className, children } = props;

	if(!open) {
		return null;
	}

	return (
		<div className="fixed inset-0 z-[1000] bg-black/40 flex justify-center items-center" onClick={onClose}>
			<div className={`bg-white px-5 py-2 ${className}`} onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</div>
	);
};
