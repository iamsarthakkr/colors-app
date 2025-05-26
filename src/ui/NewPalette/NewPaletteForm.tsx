import React from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

interface NewPaletteFormProps {
	onCancel: () => void;
	onSave: (name: string, emoji: string) => void;
}

interface PaletteNameFormProps extends NewPaletteFormProps {
	onSave: () => void;
	onChooseEmoji: () => void;
	paletteName: string;
	emoji: string;
	onPaletteNameChange: (paletteName: string) => void;
}

interface EmojiPickerFromProps {
	onEmojiChange: (emoji: string) => void;
}

const PaletteNameForm = (props: PaletteNameFormProps) => {
	const { onCancel, onSave, paletteName, emoji, onPaletteNameChange, onChooseEmoji } = props;

	const handlePaletteNameChange = React.useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			onPaletteNameChange(e.target.value);
		},
		[onPaletteNameChange]
	);

	return (
		<div>
			<h2 className="font-semibold mb-10 text-xl tracking-wider text-cyan-700">New Palette</h2>
			<p className="italic mb-6">Please chose a name for your palette. Make sure it is unique!</p>
			<div className="relative">
				<input
					placeholder={"Palette Name"}
					className="block pl-6 pr-1 px-2 h-10 tracking-wider border-0 outline-0 w-full border-b-1 text-lg border-b-black/10 focus:border-b-1 focus:border-b-black"
					value={paletteName}
					onChange={handlePaletteNameChange}
				/>
				<span className="absolute top-2 left-0">{emoji}</span>
			</div>
			<div className="mt-3 flex gap-5">
				<button className="d-btn d-btn-primary" onClick={onChooseEmoji}>
					Choose emoji
				</button>
			</div>
			<div className="flex justify-end mt-10 gap-2">
				<button className="d-btn d-btn-primary" onClick={onCancel}>
					Cancle
				</button>
				<button className="d-btn d-btn-secondary" onClick={onSave}>
					Save
				</button>
			</div>
		</div>
	);
};

const EmojiPickerFrom = (props: EmojiPickerFromProps) => {
	const { onEmojiChange } = props;

	const handleEmojiPicked = React.useCallback(
		(emoji: EmojiClickData) => {
			onEmojiChange(emoji.emoji);
		},
		[onEmojiChange]
	);

	return (
		<div>
			<h2 className="font-semibold mb-5 text-xl tracking-wider text-cyan-700">Choose Emoji For you palette!</h2>
			<EmojiPicker onEmojiClick={handleEmojiPicked} />
		</div>
	);
};

export const NewPaletteForm = (props: NewPaletteFormProps) => {
	const [paletteName, setPaletteName] = React.useState("");
	const [paletteEmoji, setPaletteEmoji] = React.useState("🎨");
	const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);

	const { onCancel, onSave } = props;

	const handleShowEmojiPicker = React.useCallback(() => {
		setShowEmojiPicker(true);
	}, []);

	const handleChooseEmoji = React.useCallback((emoji: string) => {
		setPaletteEmoji(emoji);
		setShowEmojiPicker(false);
	}, []);

	const handleSavePalette = React.useCallback(() => {
		onSave(paletteName, paletteEmoji);
	}, [onSave, paletteEmoji, paletteName]);

	return showEmojiPicker ? (
		<EmojiPickerFrom onEmojiChange={handleChooseEmoji} />
	) : (
		<PaletteNameForm
			paletteName={paletteName}
			emoji={paletteEmoji}
			onPaletteNameChange={setPaletteName}
			onChooseEmoji={handleShowEmojiPicker}
			onCancel={onCancel}
			onSave={handleSavePalette}
		/>
	);
};
