"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var dbUrl = process.env.MONGODB_URL;
mongoose_1["default"].connect(dbUrl);
var db = mongoose_1["default"].connection;
db.on('connected', function () {
    return console.log("\u2B55 MongoDB \uC11C\uBC84 \uC5F0\uACB0 \uC644\uB8CC! URL: ".concat(dbUrl));
});
db.on('error', function (error) { return console.error('❌ MongoDB 서버 연결 실패,,,'); });
