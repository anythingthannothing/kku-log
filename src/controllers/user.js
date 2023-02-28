"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getLogout = exports.postLogin = exports.getGithubLogin = void 0;
var user_1 = require("../services/user");
var node_fetch_1 = require("node-fetch");
var getGithubLogin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var baseUrl, config, params;
    return __generator(this, function (_a) {
        baseUrl = 'https://github.com/login/oauth/authorize';
        config = {
            client_id: process.env.GH_CLIENTID,
            scope: 'read:user user:email'
        };
        params = new URLSearchParams(config).toString();
        res.redirect("".concat(baseUrl, "?").concat(params));
        return [2 /*return*/];
    });
}); };
exports.getGithubLogin = getGithubLogin;
var postLogin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var baseUrl, code, config, params, url, token, accessTokenUrl, user, emails, emailObj, foundUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                baseUrl = 'https://github.com/login/oauth/access_token';
                code = req.query.code;
                config = {
                    client_id: process.env.GH_CLIENTID,
                    client_secret: process.env.GH_SECRET,
                    code: code
                };
                params = new URLSearchParams(config).toString();
                url = "".concat(baseUrl, "?").concat(params);
                return [4 /*yield*/, (0, node_fetch_1["default"])(url, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json'
                        }
                    })];
            case 1: return [4 /*yield*/, (_a.sent()).json()];
            case 2:
                token = _a.sent();
                if (!token.access_token)
                    return [2 /*return*/, res.redirect('/')];
                accessTokenUrl = 'https://api.github.com';
                return [4 /*yield*/, (0, node_fetch_1["default"])("".concat(accessTokenUrl, "/user"), {
                        method: 'GET',
                        headers: {
                            Authorization: "Bearer ".concat(token.access_token)
                        }
                    })];
            case 3: return [4 /*yield*/, (_a.sent()).json()];
            case 4:
                user = _a.sent();
                return [4 /*yield*/, (0, node_fetch_1["default"])("".concat(accessTokenUrl, "/user/emails"), {
                        method: 'GET',
                        headers: {
                            Authorization: "Bearer ".concat(token.access_token)
                        }
                    })];
            case 5: return [4 /*yield*/, (_a.sent()).json()];
            case 6:
                emails = _a.sent();
                emailObj = emails.find(function (email) { return email.primary && email.verified; });
                if (!emailObj) {
                    return [2 /*return*/, res.redirect('/')];
                }
                return [4 /*yield*/, user_1.UserService.findUserByEmail({
                        email: emailObj.email
                    })];
            case 7:
                foundUser = _a.sent();
                if (!!foundUser) return [3 /*break*/, 9];
                return [4 /*yield*/, user_1.UserService.createUser({
                        name: user.name,
                        email: emailObj.email
                    })];
            case 8:
                user = _a.sent();
                req.session.loggedIn = true;
                req.session.user = user;
                return [3 /*break*/, 10];
            case 9:
                req.session.loggedIn = true;
                req.session.user = foundUser;
                _a.label = 10;
            case 10:
                res.redirect('/');
                return [2 /*return*/];
        }
    });
}); };
exports.postLogin = postLogin;
var getLogout = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        delete req.session.loggedIn;
        delete req.session.user;
        req.flash('success', '로그아웃이 완료되었습니다 :)');
        return [2 /*return*/, res.redirect('/posts')];
    });
}); };
exports.getLogout = getLogout;
