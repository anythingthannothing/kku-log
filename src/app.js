"use strict";
exports.__esModule = true;
exports.app = void 0;
require("./db");
// import './utils/cache';
var express_1 = require("express");
var express_session_1 = require("express-session");
var connect_mongo_1 = require("connect-mongo");
var morgan_1 = require("morgan");
var connect_flash_1 = require("connect-flash");
var middlewares_1 = require("./routers/middlewares");
var routers_1 = require("./routers");
var middlewares_2 = require("./routers/middlewares");
var app = (0, express_1["default"])();
exports.app = app;
app.set('views', 'src/views');
app.set('view engine', 'pug');
app.use(express_1["default"].static('src/public'));
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: false }));
var dbUrl = process.env.MONGODB_URL;
var secret = process.env.SECRET;
app.use((0, express_session_1["default"])({
    store: connect_mongo_1["default"].create({
        mongoUrl: dbUrl,
        touchAfter: 24 * 3600,
        ttl: 3 * 24 * 60 * 60,
        dbName: process.env.NODE_ENV === 'production' ? 'test' : 'myOwnBlog'
    }),
    name: 'session',
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 2
    }
}));
app.use((0, connect_flash_1["default"])());
app.use(middlewares_2.setLocals);
// Logger
app.use((0, morgan_1["default"])('dev'));
app.use(function (req, res, next) {
    var _a;
    console.log((_a = req.session.user) === null || _a === void 0 ? void 0 : _a.name);
    next();
});
app.use('/', routers_1["default"]);
app.use(middlewares_1.notFoundErrorHandler);
app.use(middlewares_1.errorHandler);
app.use(middlewares_1.appErrorHandler);
