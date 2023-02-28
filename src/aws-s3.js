"use strict";
exports.__esModule = true;
var client_s3_1 = require("@aws-sdk/client-s3");
var s3 = new client_s3_1.S3Client({
    region: 'ap-northeast-2',
    credentials: {
        accessKeyId: process.env.S3_ID || 'AWS-S3 엑세스 ID 확인 불가, ENV 파일 확인!',
        secretAccessKey: process.env.S3_SECRET || 'AWS-S3 액세스 KEY 확인 불가, ENV 파일 확인!'
    }
});
exports["default"] = s3;
