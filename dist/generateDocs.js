"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOpenApiDocs = generateOpenApiDocs;
const decorators_1 = require("./decorators");
function generateOpenApiDocs(controllers, options) {
    const paths = {};
    controllers.forEach((controller) => {
        const instance = new controller();
        const prototype = Object.getPrototypeOf(instance);
        Object.getOwnPropertyNames(prototype).forEach((methodName) => {
            const metadata = Reflect.getMetadata(decorators_1.OPENAPI_METADATA_KEY, prototype, methodName);
            if (metadata) {
                const { path, method, parameters } = metadata, openApiMetadata = __rest(metadata, ["path", "method", "parameters"]);
                if (!paths[path])
                    paths[path] = {};
                paths[path][method] = Object.assign(Object.assign({}, openApiMetadata), { parameters: parameters === null || parameters === void 0 ? void 0 : parameters.map((param) => ({
                        name: param.name,
                        in: param.in,
                        description: param.description,
                        required: param.required,
                        schema: {
                            type: param.schema.type,
                            example: param.schema.example,
                            description: param.schema.description,
                        },
                    })) });
            }
        });
    });
    return Object.assign(Object.assign({}, options), { paths, components: {
            schemas: options.schemas || {},
        } });
}
