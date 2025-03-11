"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPENAPI_METADATA_KEY = void 0;
exports.OpenApiRoute = OpenApiRoute;
require("reflect-metadata");
exports.OPENAPI_METADATA_KEY = 'openapi';
function OpenApiRoute(method, path, options) {
    return function (target, propertyKey, descriptor) {
        const metadata = Object.assign({ method: method.toLowerCase(), path, responses: {} }, options);
        Reflect.defineMetadata(exports.OPENAPI_METADATA_KEY, metadata, target, propertyKey);
    };
}
