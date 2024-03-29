#!/usr/bin/env node
const express	= require('express');
const app		= express();
const createError	= require('http-errors');
const logger		= require('morgan');
const cors			= require('cors');

// 載入環境變數
require('dotenv').config();

// 其餘配置
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 建立 HTTP Server
const httpServer = require('./lib/httpServer');
httpServer.createHttpServer(app);

// 設置允許跨域請求
console.log('CORS: ',process.env.ORIGIN)
app.use(cors({
	origin: process.env.ORIGIN,
	credentials: true
}));

// 設置路由
/*const publicRouter = require('../routes/public');
app.use('/public', publicRouter);
const userRouter = require('../routes/user');
app.use('/user', userRouter);
const adminRouter = require('../routes/admin');
app.use('/admin', userRouter);*/


// 轉送404錯誤到 Error Handler
app.use(function(req, res, next) {
	next(createError(404));
});
// Error Handler
app.use(function(err, req, res, next) {
	console.log(err.status||500);
	console.log(req.app.get('env') === 'development' ? err : {})
	res.send(err.message);
});
process.on('uncaughtException', function(err) {
	console.log('同步： ',err);
	process.exit(1);
})

process.on('unhandledRejection', function(err) {
	console.log('非同步： ',err);
	process.exit(1)
})
  