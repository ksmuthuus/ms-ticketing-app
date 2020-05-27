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
exports.RequestValidationError = void 0;
var custom_error_1 = require("./custom-error");
var RequestValidationError = /** @class */ (function (_super) {
    __extends(RequestValidationError, _super);
    function RequestValidationError(errors) {
        var _this = _super.call(this, "Request input invalid") || this;
        _this.errors = errors;
        _this.statusCode = 400;
        Object.setPrototypeOf(_this, RequestValidationError.prototype);
        return _this;
    }
    RequestValidationError.prototype.serializeErrors = function () {
        var formattedError = this.errors.map(function (error) {
            return { message: error.msg, field: error.param };
        });
        return formattedError;
    };
    return RequestValidationError;
}(custom_error_1.CustomError));
exports.RequestValidationError = RequestValidationError;
