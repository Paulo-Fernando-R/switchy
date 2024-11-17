"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class DatabaseConnection {
    constructor() {
        this.url = process.env.DB_URL;
        this._dbName = process.env.DB_NAME;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, mongoose_1.connect)(this.url, { family: 4, dbName: this._dbName });
                console.warn("Connected to MongoDB");
            }
            catch (error) {
                //!NECESSÁRIO TRATAR ESSA EXCESSÃO NOS REPS E CTRLS
                throw new mongoose_1.Error(`Cannot connect to database: ${error}`);
            }
        });
    }
    get dbName() {
        return this._dbName;
    }
}
exports.default = DatabaseConnection;
