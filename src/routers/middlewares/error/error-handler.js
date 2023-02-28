"use strict";
exports.__esModule = true;
exports.errorHandler = void 0;
var app_error_1 = require("../../../app-error");
var errorHandler = function (err, req, res, next) {
    if (err instanceof Error || err instanceof app_error_1.AppError)
        return next(err);
    var now = new Date();
    var timestamp = "".concat(now.toLocaleDateString('ko-KR'), " ").concat(now.toLocaleTimeString('ko-KR'));
    console.error('\x1b[41m%s\x1b[0m', err.name, timestamp, req.url, err.stack.split('\n').slice(0, 3).join('\n'));
    var _a = err.status, status = _a === void 0 ? 500 : _a, _b = err.message, message = _b === void 0 ? '알 수 없는 오류가 발생했어요 :(' : _b;
    return res.status(status).render('error', { status: status, message: message });
};
exports.errorHandler = errorHandler;
