import { OpenAPIV3 } from 'openapi-types';
import { OPENAPI_METADATA_KEY } from './decorators';
import { OpenApiRouteOptions } from './types';

export interface OpenApiDocsOptions extends OpenAPIV3.Document {
    schemas?: Record<string, OpenAPIV3.SchemaObject>;
}

export function generateOpenApiDocs(
    controllers: any[],
    options: OpenApiDocsOptions
): OpenAPIV3.Document {
    const paths: OpenAPIV3.PathsObject = {};

    controllers.forEach((controller) => {
        const instance = new controller();
        const prototype = Object.getPrototypeOf(instance);

        Object.getOwnPropertyNames(prototype).forEach((methodName) => {
            const metadata = Reflect.getMetadata(OPENAPI_METADATA_KEY, prototype, methodName) as OpenApiRouteOptions & { method: string; path: string };
            if (metadata) {
                const { path, method, parameters, ...openApiMetadata } = metadata;

                if (!paths[path]) paths[path] = {};

                (paths[path] as any)[method] = {
                    ...openApiMetadata,
                    parameters: parameters?.map((param: any) => ({
                        name: param.name,
                        in: param.in,
                        description: param.description,
                        required: param.required,
                        schema: {
                            type: param.schema.type,
                            example: param.schema.example,
                            description: param.schema.description,
                        },
                    })),
                };
            }
        });
    });

    return {
        ...options,
        paths,
        components: {
            schemas: options.schemas || {},
        },
    };
}