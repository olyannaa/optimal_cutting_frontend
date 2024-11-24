import { api } from './api';
export type Detail = {
    designation: string;
    name: string;
    thickness: number;
    filename: string;
    materialId: number;
    userId: number;
};

export type ReqWorkpiece = {
    name: string;
    width: number;
    height: number;
};

export type Material = {
    id: number;
    name: string;
};

export const addDxfApi = api.injectEndpoints({
    endpoints: (builder) => ({
        addDetail: builder.mutation<Blob, FormData>({
            query: (data) => ({
                url: '/detail',
                method: 'POST',
                body: data,
                responseHandler: (response) => response.blob(),
            }),
        }),
        newWorkpiece: builder.mutation<void, ReqWorkpiece>({
            query: (data) => ({
                url: '/detail/workpiece',
                method: 'POST',
                body: data,
            }),
        }),
        getMaterial: builder.query<Material[], void>({
            query: () => ({
                url: '/detail/material',
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useAddDetailMutation,
    useGetMaterialQuery,
    useNewWorkpieceMutation,
} = addDxfApi;
export const {
    endpoints: { addDetail, newWorkpiece, getMaterial },
} = addDxfApi;
