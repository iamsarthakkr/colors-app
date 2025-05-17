export type RouteProps<T> = {
	params: Promise<T>;
};

export type RouteSearchProps<T1, T2> = {
	params: Promise<T1>;
	searchParams: Promise<T2>;
};
