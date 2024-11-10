import { api } from './api';
export type Detail = {
    designation?: string;
    name?: string;
    thickness?: number;
    filename?: string;
    materialId?: number;
    userId?: number;
    body?: FormData;
};

export type Material = {
    id: number;
    name: string;
};

export const addDxfApi = api.injectEndpoints({
    endpoints: (builder) => ({
        addDetail: builder.mutation<FormData, Detail>({
            query: (data) => ({
                url: '/detail',
                method: 'POST',
                params: {
                    Designation: data.designation,
                    Name: data.name,
                    Thickness: data.thickness,
                    Filename: data.filename,
                    MaterialId: data.materialId,
                    UserId: data.userId,
                },
                body: data.body,
            }),
        }),
        newWorkpiece: builder.mutation<void, Detail>({
            query: (data) => ({
                url: '/detail',
                method: 'POST',
                params: {
                    Designation: data.designation,
                    Name: data.name,
                    Thickness: data.thickness,
                    UserId: data.userId,
                },
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
