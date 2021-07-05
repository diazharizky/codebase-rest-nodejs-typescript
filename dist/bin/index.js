"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
const cluster_1 = __importDefault(require("cluster"));
const config_1 = __importDefault(require("config"));
const app_1 = __importDefault(require("../app"));
const log_1 = __importDefault(require("../src/utils/log"));
const clusterWorkerSize = os_1.default.cpus.length;
const listenPort = config_1.default.get('listen_port');
const listenHost = config_1.default.get('listen_host');
const start = () => {
    if (!cluster_1.default.isPrimary || clusterWorkerSize <= 1) {
        app_1.default.listen(listenPort, listenHost, 50, () => {
            log_1.default.info({ msg: 'App started!', host: listenHost, port: listenHost });
        });
    }
    else {
        for (let i = 0; i < clusterWorkerSize; i++) {
            cluster_1.default.fork();
        }
        cluster_1.default.on('exit', (worker) => {
            log_1.default.info({ msg: `Worker ${worker.id} has exitted.` });
        });
    }
};
exports.default = start;
//# sourceMappingURL=index.js.map