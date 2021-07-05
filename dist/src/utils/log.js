"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const config_1 = __importDefault(require("config"));
const logger = pino_1.default({
    name: config_1.default.get('app_name'),
    level: process.env.NODE_ENV === 'test' ? 'warn' : 'info',
    timestamp: () => {
        return `,"time":"${new Date().toISOString()}"`;
    },
});
exports.default = logger;
//# sourceMappingURL=log.js.map