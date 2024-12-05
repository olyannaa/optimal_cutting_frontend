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

export type Designation = {
	id: number;
	designation: string;
	thickness: number;
	materialId: number;
};

export type ResponseGetDesignations = {
	[key: string]: Designation[];
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
        getDesignations: builder.query<ResponseGetDesignations, void>({
			query: () => ({
				url: '/detail/designations',
				method: 'GET',
			}),
		}),
    }),
});

export const {
	useAddDetailMutation,
	useGetMaterialQuery,
	useNewWorkpieceMutation,
	useLazyGetDesignationsQuery,
} = addDxfApi;
export const {
	endpoints: { addDetail, newWorkpiece, getMaterial, getDesignations },
} = addDxfApi;
