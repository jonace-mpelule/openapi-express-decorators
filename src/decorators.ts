import 'reflect-metadata';
import { Method, OpenApiRouteOptions } from './types';

export const OPENAPI_METADATA_KEY = 'openapi';

export function OpenApiRoute(method: Method, path: string, options?: OpenApiRouteOptions) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const metadata: OpenApiRouteOptions & { method: string; path: string } = {
            method: method.toLowerCase(),
            path,
            responses: {},
            ...options,
        };
        Reflect.defineMetadata(OPENAPI_METADATA_KEY, metadata, target, propertyKey);
    };
}

