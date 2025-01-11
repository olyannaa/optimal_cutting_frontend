import {
    Detail2D,
    ICalculate2D,
    ResultCalculate2D,
    WorkpieceStandard,
} from '../../types/Calculated2D';
import { api } from './api';

export const cutting2DApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getWorkpieces: builder.query<WorkpieceStandard[], void>({
            query: () => ({
                url: '/detail/workpiece',
                method: 'GET',
            }),
        }),
        calculate2D: builder.mutation<ResultCalculate2D, ICalculate2D>({
            query: (data: ICalculate2D) => ({
                url: '/2d/calculate',
                method: 'POST',
                body: data,
            }),
        }),
        importFile2D: builder.mutation<Detail2D[], FormData>({
            query: (file) => ({
                url: '2d/import/csv',
                method: 'POST',
                body: file,
            }),
        }),
    }),
});

export const {
    useGetWorkpiecesQuery,
    useCalculate2DMutation,
    useImportFile2DMutation,
} = cutting2DApi;
