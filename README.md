# 🎉 OpenAPI Express Decorators

A lightweight, type-safe library for generating OpenAPI documentation using decorators in Express.js applications. This package allows you to define OpenAPI metadata (paths, parameters, responses, etc.) directly in your controllers using decorators, making it easy to keep your API documentation in sync with your code.

## Features

- **🎉 Decorator-based OpenAPI documentation**: Define OpenAPI metadata using decorators like `@OpenApiGet`, `@OpenApiPost`, etc.
- **🔑 Type-safe schemas**: Use TypeScript types to define request/response schemas and parameters.
- **🎨 Customizable**: Supports custom schemas, parameters, and responses.
- **⚡️ Easy integration**: Works seamlessly with Express.js and other HTTP handler libraries.

---

## Installation

Install the package using npm:

```bash
npm install openapi-express-decorators
```

Or using yarn:

```bash
yarn add openapi-express-decorators
```

---

## Setup
#### 1. Enable reflect-metadata
Ensure reflect-metadata is enabled in your project. Add the following line at the top of your entry file (e.g., `index.ts` or `server.ts`):

```typescript
import 'reflect-metadata';
```
#### 2. Configure tsconfig.json
Make sure your `tsconfig.json` has the following options enabled:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

#### 3. Set Up Express.js & @Reflet/Express
Install Express.js if you haven't already, and optionally you can use `@reflet/express` for better MVC for express.js

```bash
npm install express @reflet/express
```
---
## Usage
#### 1. Define Schemas
Use the createSchema utility to define request/response schemas.

```typescript
import { createSchema, SchemaDefinition } from 'openapi-express-decorators';

const RegisterUserDTO: SchemaDefinition = {
    name: {
        type: 'string',
        required: true,
        example: 'John Doe',
    },
    email: {
        type: 'string',
        required: true,
        example: 'jonace@example.com',
    },
    password: {
        type: 'string',
        required: true,
        example: '*****',
    },
};

export const RegisterUserSchema = createSchema('RegisterUserDTO', RegisterUserDTO);
```

#### 2. Define Parameters
Use the Parameter type to define path, query, or header parameters.

```typescript
import { Parameter } from 'openapi-express-decorators';

export const userIdParam: Parameter = {
    name: 'userId',
    in: 'query',
    description: 'The ID of the user',
    required: true,
    schema: {
        type: 'string',
        example: '12345',
    },
};
```

#### 3. Create Controllers
Use the `@OpenApiRoute` decorator to define routes and OpenAPI 

```typescript
import { Router, Res, Post } from '@reflet/express';
import { OpenApiRoute } from 'openapi-express-decorators';
import { RegisterUserSchema } from './schemas';
import { userIdParam } from "./parameters"

@Router('/v1/auth')
export class AuthController {
    @OpenApiRoute('POST', '/v1/auth/register', {
        summary: 'Register User',
        tags: ['Auth'],
        description: 'Register a new user with email and password,
         requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: "#/components/schemas/RegisterUserSchema"
                    },
                },
            },
        },
        responses: {
            200: {
                description: 'Success',
                content: {
                    'application/json': {
                        example: {
                            code: "success", 
                            message: "User registered"
                        }
                    },
                },
            },
        },
    })
      
    async register(req: CustomRequest, res: Res) {
        const userId = req.query.userId;
        // HTTP handler logic
    }

    @OpenApiRoute('DELETE', '/v1/auth/delete-account/{userId}', {
        summary: 'Delete User',
        parameters: [
            {
                name: 'userId',
                in: 'path',
                description: 'The ID of the account to be deleted',
                required: true,
                schema: {
                    type: 'string',
                    example: '1234',
                },
            },
            // or use the imported `userIdParam`
        ],
       
        responses: {
            200: {
                description: 'Success',
                content: {
                    'application/json': {
                        example: {
                            code: "success", 
                            message: "User deleted successfuly"
                        }
                    },
                },
            },
        },
    })
    @Delete('/delete-account/:userId')
    async deleteAccount(req: CustomRequest, res: Res) {
        const userId = req.params.userId;
        // HTTP handler logic
    }
}
```
#### 4. Generate OpenAPI Documentation
Use the `generateOpenApiDocs` function to generate the OpenAPI specification.

```typescript
import { generateOpenApiDocs } from 'openapi-express-decorators';
import { AuthController } from './controllers/auth.controller';
import { RegisterUserSchema } from './schemas';

// controllers that you have your open api routes
const routeControllers = [AuthController, ...otherControllers ];

export const swaggerSpec = generateOpenApiDocs(routeControllers, {
    openapi: '3.0.0',
    info: {
        title: 'My API Documentation',
        version: '1.0.0',
    },
    servers: [
        {
            url: "https://dev.myapi.com",
            description: "Development Server"
        },
    ],
    tags: [
        {
            name: "Auth",
            description: "Auth related authentication endpoints"
        },
    ],
    paths: {},
    components: {
        schemas: {
            RegisterUserSchema,
        },
    },
});

```
#### 5. Serve Swagger UI
Serve the OpenAPI documentation using Swagger UI.

```typescript
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from "./swaggerspec.config"

const app = express();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/openapi', ) // -> export your openapi document

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
```
### Type Definitions
The package exports the following types for type-safe usage:

#### SchemaDefinition
Defines the structure of a schema.

```typescript
interface SchemaDefinition {
    [key: string]: {
        type: 'string' | 'number' | 'integer' | 'boolean' | 'object' | 'null';
        required?: boolean;
        example?: any;
        description?: string;
    };
}
```
#### Parameter
Defines a parameter `(path, query, or header)`.

```typescript
interface Parameter {
    name: string;
    in: 'path' | 'query' | 'header';
    description?: string;
    required?: boolean;
    schema: {
        type: 'string' | 'number' | 'integer' | 'boolean' | 'object' | 'null';
        example?: any;
        description?: string;
    };
}
```
#### OpenApiRouteOptions
Defines options for the `@OpenApiRoute` decorator.

```typescript
interface OpenApiRouteOptions {
    summary?: string;
    description?: string;
    parameters?: Parameter[];
    requestBody?: {
        content: {
            'application/json': {
                schema: SchemaDefinition;
            };
        };
    };
    responses: {
        [statusCode: string]: {
            description: string;
            content?: {
                'application/json': {
                    schema: SchemaDefinition;
                };
            };
        };
    };
}
```
---


## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments
Inspired by Swagger and OpenAPI.

Built with ❤️ by [Jonace Mpelule](https://github.com/jonace-mpelule).
