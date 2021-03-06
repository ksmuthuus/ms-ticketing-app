"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnError = void 0;
var custom_error_1 = require("./custom-error");
var DbConnError = /** @class */ (function (_super) {
    __extends(DbConnError, _super);
    function DbConnError() {
        var _this = _super.call(this, "Failed to connect to DB") || this;
        _this.statusCode = 500;
        Object.setPrototypeOf(_this, DbConnError.prototype);
        return _this;
    }
    DbConnError.prototype.serializeErrors = function () {
        return [{ message: "Db Connection Failed" }];
    };
    return DbConnError;
}(custom_error_1.CustomError));
exports.DbConnError = DbConnError;
