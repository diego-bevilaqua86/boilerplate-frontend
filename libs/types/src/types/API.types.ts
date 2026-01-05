export type ServiceEndpointFn = (...args: Array<string | number>) => string;

export type ServiceEndpoints<T extends string> = Record<T, ServiceEndpointFn>;

export type QueryKeyFn = (...args: Array<string | null | undefined>) => Array<string>;

export type QueryKeys<T extends string> = Record<T, QueryKeyFn>;

export type APIError = Record<string, unknown> & { message: string };

export type APIResponseError = Error & { originalResponse?: unknown };
