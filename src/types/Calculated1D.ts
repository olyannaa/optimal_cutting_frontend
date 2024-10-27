export interface ICalculate1D {
	workpieces: {
		length: number;
		details: number[];
		percentUsage: number;
	}[];
	totalPercentUsage: number;
}
