import { WorkpieceStandard } from '../../types/Calculated2D';
import { api } from './api';

export const cutting2DApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getWorkpieces: builder.query<WorkpieceStandard[], void>({
            query: () => ({
                url: '/detail/workpiece',
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetWorkpiecesQuery } = cutting2DApi;
