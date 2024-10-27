import { ICalculate1D } from '../../types/Calculated1D';
import { api } from './api';


export type TypeDataForm1D = {
	details: number[];
	workpiecesLength: number[];
}

export type ResponseImportFile = {length:number, count: number}[]

export const cuttingApi = api.injectEndpoints({
	endpoints: (builder) => ({
		calculate1D: builder.mutation<ICalculate1D, TypeDataForm1D>({
			query: (data1D) => ({
				url: '1d/calculate',
				method: 'POST',
				body: data1D,
			}),
		}),
		importFile: builder.mutation<ResponseImportFile, FormData>({
			query: (file) => ({
				url: '1d/import/csv',
				method: 'POST',
				body: file,
			}),
		}),
	}),
});

export const { useCalculate1DMutation, useImportFileMutation } = cuttingApi;
export const {
	endpoints: { calculate1D, importFile },
} = cuttingApi;
