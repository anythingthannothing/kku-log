"use strict";
exports.__esModule = true;
exports.notFoundErrorHandler = void 0;
var app_error_1 = require("../../../app-error");
var notFoundErrorHandler = function (req, res, next) {
    next(new app_error_1.AppError("Resource Not Found", 404, "\uD574\uB2F9 \uB9AC\uC18C\uC2A4\uAC00 \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 :("));
};
exports.notFoundErrorHandler = notFoundErrorHandler;
