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
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const https = require('https');
var moment = require('moment');
const databaseModule = require('../utils/database');
const db = databaseModule();
router.get('/', function (req, res) {
    res.json({ message: 'Message from router: Server Started!' });
});
router.get('/themes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getThemesSqlQuery = `
        select * from onlinestore.theme
    `;
    try {
        const results = yield db.query(getThemesSqlQuery);
        console.log("Result: " + results);
        res.json(results);
    }
    catch (err) {
        console.error(err);
    }
}));
router.get('/themes/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    const getThemesByIdSqlQuery = `
        select * from onlinestore.theme where theme_id = ${id}
    `;
    try {
        const results = yield db.query(getThemesByIdSqlQuery);
        console.log("Result: " + results);
        res.json(results);
    }
    catch (err) {
        console.error(err);
    }
}));
module.exports = router;
