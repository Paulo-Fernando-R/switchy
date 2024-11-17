"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = fieldsNotEmpty;
function fieldsNotEmpty(fields) {
    return Object.values(fields).every(value => value !== "");
}
