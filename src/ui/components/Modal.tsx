type ModalProps = {
	open?: boolean;
	onClose: () => void;
	children: React.ReactNode;
};

export const Modal = (props: ModalProps) => {
	const { open, onClose, children } = props;

	if(!open) {
		return null;
	}

	return (
		<div className="fixed inset-0 z-[10000] bg-black/40 flex justify-center items-center" onClick={onClose}>
			<div className="bg-white px-5 py-2" onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</div>
	);
};
