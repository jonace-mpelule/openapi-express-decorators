import { OpenAPIV3 } from 'openapi-types';
declare const MethodTypes: {
    readonly GET: "get";
    readonly POST: "post";
    readonly PUT: "put";
    readonly PATCH: "patch";
    readonly DELETE: "delete";
};
export type Method = keyof typeof MethodTypes;
export interface EndpointMetadata {
    method: Method;
    path: string;
    summary?: string;
    description?: string;
    tags?: string[];
    parameters?: OpenAPIV3.ParameterObject[];
    requestBody?: OpenAPIV3.RequestBodyObject;
    responses?: OpenAPIV3.ResponsesObject;
}
export type SchemaPropertyType = 'string' | 'number' | 'integer' | 'boolean' | 'object' | 'null';
export interface SchemaProperty {
    type: SchemaPropertyType;
    required?: boolean;
    example?: any;
    description?: string;
}
export interface SchemaDefinition {
    [key: string]: SchemaProperty;
}
export interface Parameter {
    name: string;
    in: 'path' | 'query' | 'header';
    description?: string;
    required?: boolean;
    schema: SchemaProperty;
}
export interface OpenApiRouteOptions extends Omit<OpenAPIV3.OperationObject, 'method' | 'path' | 'parameters'> {
    parameters?: Parameter[];
    responses: OpenAPIV3.ResponsesObject;
}
export {};
