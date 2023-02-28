"use strict";
exports.__esModule = true;
exports.appErrorHandler = void 0;
var appErrorHandler = function (err, req, res, next) {
    var now = new Date();
    var timestamp = "".concat(now.toLocaleDateString('ko-KR'), " ").concat(now.toLocaleTimeString('ko-KR'));
    console.log('\x1b[33m%s\x1b[0m', err.name, timestamp, req.url, req.method, err.stack.split('\n').slice(0, 3).join('\n'));
    var _a = err.status, status = _a === void 0 ? 500 : _a, _b = err.message, message = _b === void 0 ? '알 수 없는 오류가 발생했어요 :( 잠시 후에 다시 시도해 주세요!' : _b;
    return res.status(status).json({ status: status, message: message });
};
exports.appErrorHandler = appErrorHandler;
