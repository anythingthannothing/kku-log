"use strict";
exports.__esModule = true;
require('dotenv').config({ path: ".env.".concat(process.env.NODE_ENV) });
var app_1 = require("./src/app");
var PORT = process.env.PORT || 8000;
app_1.app.listen(PORT, function () {
    console.log("\uD83D\uDCA3 ".concat(PORT, "\uBC88 \uD3EC\uD2B8\uC5D0\uC11C \uC11C\uBC84\uB97C \uC2DC\uC791\uD569\uB2C8\uB2E4. http://localhost:").concat(PORT));
});
