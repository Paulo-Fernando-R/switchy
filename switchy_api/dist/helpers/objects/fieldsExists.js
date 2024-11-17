"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = fieldsExists;
function fieldsExists(fields, rules) {
    return rules.every(rule => fields.hasOwnProperty(rule));
}
