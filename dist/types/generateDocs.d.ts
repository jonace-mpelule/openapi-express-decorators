import { OpenAPIV3 } from 'openapi-types';
export interface OpenApiDocsOptions extends OpenAPIV3.Document {
    schemas?: Record<string, OpenAPIV3.SchemaObject>;
}
export declare function generateOpenApiDocs(controllers: any[], options: OpenApiDocsOptions): OpenAPIV3.Document;
