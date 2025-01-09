import { ICalculate1D } from '../../types/Calculated1D';
import { api } from './api';

export type TypeDataForm1D = {
    details: number[];
    workpiecesLength: number[];
};

export type TypeDataFormDxf = {
    details: number[];
    workpiece: {
        width: number;
        height: number;
    };
    cuttingThickness: number;
};

export type ResponseImportFile = { length: number; count: number }[];

export const cuttingApi = api.injectEndpoints({
    endpoints: (builder) => ({
        calculate1D: builder.mutation<ICalculate1D, TypeDataForm1D>({
            query: (data1D) => ({
                url: '1d/calculate',
                method: 'POST',
                body: data1D,
            }),
        }),
        calculateDxf: builder.mutation<any, TypeDataForm1D>({
            query: (dataDxf) => ({
                url: 'dxf/calculate',
                method: 'POST',
                body: dataDxf,
            }),
        }),
        importFile1D: builder.mutation<ResponseImportFile, FormData>({
            query: (file) => ({
                url: '1d/import/csv',
                method: 'POST',
                body: file,
            }),
        }),
    }),
});

export const { useCalculate1DMutation, useImportFile1DMutation } = cuttingApi;
export const {
    endpoints: { calculate1D, importFile1D },
} = cuttingApi;
