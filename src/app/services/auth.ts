import { api } from './api';

export type ResponseLoginData = {
    accessToken: string;
    refreshToken: string;
};
export type LoginData = {
    Login: string;
    Password: string;
};
export type Privilege = Record<string, { name: string; description: string }>;

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<ResponseLoginData, FormData>({
            query: (userData) => ({
                url: '/token',
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
