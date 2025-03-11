"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSchema = createSchema;
/**
 * Creates an OpenAPI schema object from a definition.
 * @param name - The name of the schema.
 * @param definition - The schema definition.
 * @returns The OpenAPI schema object.
 */
function createSchema(name, definition) {
    const schema = {
        type: 'object',
        properties: {},
        required: [],
    };
    for (const [key, value] of Object.entries(definition)) {
        schema.properties[key] = {
            type: value.type, // Now this is type-safe
            example: value.example,
            description: value.description,
        };
        if (value.required) {
            schema.required.push(key);
        }
    }
    return schema;
}
