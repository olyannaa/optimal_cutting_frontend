import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    createApi,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { ResponseLoginData } from './auth';

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
    fetchBaseQuery({
        baseUrl:' https://localhost:7148',
        prepareHeaders: (headers, { getState }) => {
            const token =
                (getState() as RootState).auth.token?.accessToken ||
                localStorage.getItem('accessToken');

            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            headers.set('Access-Control-Allow-Origin', 'no-cors');
            return headers;
        },
    });

let refreshPromise: Promise<unknown> | null = null;

interface RefreshResult {
    data: ResponseLoginData;
}

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    if (refreshPromise) await refreshPromise;

    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        refreshPromise = Promise.resolve(
            baseQuery(
                {
                    url: `/Auth/refresh-token`,
                    method: 'POST',
                    body: {
                        accessToken: localStorage.getItem('accessToken'),
                        refreshToken: localStorage.getItem('refreshToken'),
                    },
                },
                api,
                extraOptions
            )
        );

        const refreshResult = await refreshPromise;
        refreshPromise = null;

        if ((refreshResult as RefreshResult).data) {
            const refeshTokenResult = (refreshResult as RefreshResult)
                .data as ResponseLoginData;
            api.dispatch({ type: 'auth/refresh', payload: refeshTokenResult });
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch({ type: 'auth/logout' });
            localStorage.clear();
        }
    }
    return result;
};

export const api = createApi({
    reducerPath: 'splitApi',
    baseQuery: baseQueryWithReauth,
    refetchOnMountOrArgChange: true,
    tagTypes: ['Order', 'Page'],
    endpoints: () => ({}),
});
