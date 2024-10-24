export interface IError {
	data: {
		detail: string;
	};
	status: number;
	originalStatus: number;
}
