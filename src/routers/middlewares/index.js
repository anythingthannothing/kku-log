"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
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
exports.validateComment = exports.validatePostEdit = exports.validatePost = exports.isReviewAuthor = exports.isAdmin = exports.logout = exports.isLoggedIn = exports.setLocals = void 0;
var app_error_1 = require("../../app-error");
__exportStar(require("./error"), exports);
var _a = require('./validations/joi-validation'), postSchema = _a.postSchema, postEditSchema = _a.postEditSchema, commentSchema = _a.commentSchema;
var Comment = require('../../db/schemas/comment');
var setLocals = function (req, res, next) {
    res.locals.currentUser = req.session.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
};
exports.setLocals = setLocals;
var isLoggedIn = function (req, res, next) {
    if (!req.session.user) {
        req.flash('error', '로그인을 해주세요 :)');
        return res.redirect('/posts');
    }
    next();
};
exports.isLoggedIn = isLoggedIn;
var logout = function (req, res, next) {
    if (!req.isAuthenticated()) {
        req.flash('error', '잘못된 접근입니다 :(');
        return res.redirect('/users/login');
    }
    next();
};
exports.logout = logout;
var isAdmin = function (req, res, next) {
    if (!req.session.user ||
        req.session.user.email !== 'anythingthannothing@gmail.com') {
        req.flash('error', '권한이 없습니다 :(');
        return res.redirect("/posts");
    }
    next();
};
exports.isAdmin = isAdmin;
var isReviewAuthor = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, commentId, comment;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, id = _a.id, commentId = _a.commentId;
                return [4 /*yield*/, Comment.findById(commentId)];
            case 1:
                comment = _b.sent();
                if (!comment.author.equals(req.session.user._id)) {
                    req.flash('error', '권한이 없습니다 :(');
                    return [2 /*return*/, res.redirect("/posts/".concat(id))];
                }
                next();
                return [2 /*return*/];
        }
    });
}); };
exports.isReviewAuthor = isReviewAuthor;
var validatePost = function (req, res, next) {
    var error = postSchema.validate(req.body).error;
    if (error) {
        var msg = error.details.map(function (el) { return el.message; }).join(',');
        throw new app_error_1.AppError(msg, 400, 'Bad Reqeust');
    }
    next();
};
exports.validatePost = validatePost;
var validatePostEdit = function (req, res, next) {
    var error = postEditSchema.validate(req.body).error;
    if (error) {
        var msg = error.details.map(function (el) { return el.message; }).join(',');
        throw new app_error_1.AppError(msg, 400, 'Bad Request');
    }
    next();
};
exports.validatePostEdit = validatePostEdit;
var validateComment = function (req, res, next) {
    var error = commentSchema.validate(req.body).error;
    if (error) {
        var msg = error.details.map(function (v) { return v.message; }).join(',');
        throw new app_error_1.AppError(msg, 400, 'Bad Reqeust');
    }
    next();
};
exports.validateComment = validateComment;
