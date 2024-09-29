import { api } from './api';

export type ResponseLoginData = {
    accessToken: string;
    refreshToken: string;
};
export type LoginData = {
    login: string;
    password: string;
};
export type Privilege = Record<string, { name: string; description: string }>;

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<ResponseLoginData, LoginData>({
            query: (userData) => ({
                url: '/Auth/token',
                method: 'POST',
                body: userData,
            }),
        }),
    }),
});

export const { useLoginMutation } = authApi;

export const {
    endpoints: { login },
} = authApi;
