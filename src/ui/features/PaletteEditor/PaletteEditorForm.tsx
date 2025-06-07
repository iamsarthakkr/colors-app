import React from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { IPaletteValidators } from "./useValidators";

interface NewPaletteFormProps {
	defaultPaletteName?: string;
	defaultEmoji?: string;
	onCancel: () => void;
	onSave: (name: string, emoji: string) => void;
	validators: IPaletteValidators;
}

interface PaletteNameFormProps extends NewPaletteFormProps {
	paletteName: string;
	emoji: string;
	onPaletteNameChange: (paletteName: string) => void;
	onSave: () => void;
	onChooseEmoji: () => void;
}

interface EmojiPickerFromProps {
	emoji: string;
	onEmojiChange: (emoji: string) => void;
}

const PaletteNameForm = (props: PaletteNameFormProps) => {
	const [nameError, setNameError] = React.useState("");
	const { onCancel, onSave, paletteName, emoji, onPaletteNameChange, onChooseEmoji, validators } = props;

	const handlePaletteNameChange = React.useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const val = e.target.value;
			const err = validators.paletteNameValidator(val);
			setNameError(err);
			onPaletteNameChange(e.target.value);
		},
		[onPaletteNameChange, validators]
	);

	const handleSavePalette = React.useCallback(() => {
		const err = validators.paletteNameValidator(paletteName);
		setNameError(err);
		if(err) {
			return;
		}
		onSave();
	}, [onSave, paletteName, validators]);

	return (
		<div>
			<h2 className="font-semibold mb-10 text-xl tracking-wider text-cyan-700">New Palette</h2>
			<p className="italic mb-6">Please chose a name for your palette. Make sure it is unique!</p>
			<div className="relative">
				<div role="alert" className={`text-sm text-rose-700 ${nameError ? "opacity-100" : "opacity-0"} h-5`}>
					<span>{nameError}</span>
				</div>{" "}
				<input
					placeholder={"Palette Name"}
					className="block pl-6 pr-1 px-2 h-8 tracking-wider border-0 outline-0 w-full border-b-1 text-lg border-b-black/10 focus:border-b-1 focus:border-b-black"
					value={paletteName}
					onChange={handlePaletteNameChange}
				/>
				<span className="absolute bottom-2 left-0">{emoji}</span>
			</div>
			<div className="mt-3 flex gap-5">
				<button className="d-btn d-btn-primary" onClick={onChooseEmoji}>
					Choose emoji
				</button>
			</div>
			<div className="flex justify-end mt-10 gap-2">
				<button className="d-btn d-btn-primary" onClick={onCancel}>
					Cancel
				</button>
				<button className="d-btn d-btn-secondary" onClick={handleSavePalette}>
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

export const PaletteEditorForm = (props: NewPaletteFormProps) => {
	const { defaultPaletteName, defaultEmoji, onCancel, onSave, validators } = props;
	
	const [paletteName, setPaletteName] = React.useState(defaultPaletteName || "");
	const [paletteEmoji, setPaletteEmoji] = React.useState(defaultEmoji || "🎨");
	const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);


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
		<EmojiPickerFrom emoji={paletteEmoji} onEmojiChange={handleChooseEmoji} />
	) : (
		<PaletteNameForm
			paletteName={paletteName}
			emoji={paletteEmoji}
			onPaletteNameChange={setPaletteName}
			onChooseEmoji={handleShowEmojiPicker}
			onCancel={onCancel}
			onSave={handleSavePalette}
			validators={validators}
		/>
	);
};
