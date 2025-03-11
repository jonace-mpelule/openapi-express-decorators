import 'reflect-metadata';
import { Method, OpenApiRouteOptions } from './types';
export declare const OPENAPI_METADATA_KEY = "openapi";
export declare function OpenApiRoute(method: Method, path: string, options?: OpenApiRouteOptions): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
