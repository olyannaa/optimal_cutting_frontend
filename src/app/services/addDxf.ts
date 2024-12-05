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
		addDetail: builder.mutation<Blob, Detail>({
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
				responseHandler: (response) => response.blob(),
			}),
		}),
		newWorkpiece: builder.mutation<FormData, Detail>({
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
