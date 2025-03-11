import { OpenAPIV3 } from 'openapi-types';

export type SchemaPropertyType = 'string' | 'number' | 'integer' | 'boolean' | 'object';

export interface SchemaProperty {
    type: SchemaPropertyType; // Use the correct type
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
export function createSchema(name: string, definition: SchemaDefinition): OpenAPIV3.SchemaObject {
    const schema: OpenAPIV3.SchemaObject = {
        type: 'object',
        properties: {},
        required: [],
    };


    for (const [key, value] of Object.entries(definition)) {
        schema.properties![key] = {
            type: value.type, // Now this is type-safe
            example: value.example,
            description: value.description,
        };

        if (value.required) {
            schema.required!.push(key);
        }
    }

    return schema;
}