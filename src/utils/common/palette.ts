export const getId = (str: string) => {
	return str.trim().toLocaleLowerCase().replaceAll(" ", "-");
};
