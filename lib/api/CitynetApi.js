"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const querystring_1 = require("querystring");
const moment = require("moment");
const download = require("download");
class CitynetApi {
    constructor() {
        this.baseUrl = 'https://api.cloud.nalantis.com/api';
        this.login();
    }
    query(question) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isTokenValid()) {
                yield this.login();
            }
            return axios_1.default
                .request({
                method: 'POST',
                url: `${this.baseUrl}/v2/documents/query/semantic/generic`,
                data: {
                    query: question,
                    targetDocumentType: 'citynet',
                    resultDetailLevel: 9,
                    rows: 10,
                },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.token.value}`,
                },
            })
                .then(d => {
                return d.data;
            })
                .catch(err => {
                throw err;
            });
        });
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            const { headers } = yield axios_1.default.post('https://api.cloud.nalantis.com/auth/v2/users/login', querystring_1.stringify(this.getCredentials()), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
            const token = {
                value: headers.authorization.split('Bearer ')[1],
                date: headers.date,
            };
            this.token = token;
            return token;
        });
    }
    getCredentials() {
        const login = process.env.CITYNET_LOGIN;
        const password = process.env.CITYNET_PASSWORD;
        if (!login || !password) {
            throw 'No Credentials provided';
        }
        return { login, password };
    }
    isTokenValid() {
        return moment(this.token.date).isAfter(moment().subtract(24, 'hours'));
    }
    downloadFile(resourceUri, filename) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                filename,
                headers: {
                    Authorization: `Bearer ${this.token.value}`,
                },
            };
            return yield download(resourceUri, './downloads', options);
        });
    }
}
exports.default = CitynetApi;
//# sourceMappingURL=CitynetApi.js.map