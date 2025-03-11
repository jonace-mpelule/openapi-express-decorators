import { OpenAPIV3 } from 'openapi-types';
export type SchemaPropertyType = 'string' | 'number' | 'integer' | 'boolean' | 'object';
export interface SchemaProperty {
    type: SchemaPropertyType;
    required?: boolean;
    example?: any;
    description?: string;
}
export interface SchemaDefinition {
    [key: string]: SchemaProperty;
}
/**
 * Creates an OpenAPI schema object from a definition.
 * @param name - The name of the schema.
 * @param definition - The schema definition.
 * @returns The OpenAPI schema object.
 */
export declare function createSchema(name: string, definition: SchemaDefinition): OpenAPIV3.SchemaObject;
