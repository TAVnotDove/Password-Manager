const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
var CryptoJS = require('crypto-js');
var fs = require('fs');
const keys = require('../../data/keys.json');
const data = require('../../data/data.json');

// =========== Auth middleware ===========
router.use(/\/((?!register|login).)*/, (req, res, next) => {
  if (req.headers.key && req.headers.user) {
    try {
      let decrypted = CryptoJS.AES.decrypt(data[req.headers.user], req.headers.key).toString(CryptoJS.enc.Utf8);
      req.decrypted = JSON.parse(decrypted);
    } catch (e) {
      return res.status(401).send({ msg: 'Invalid key' });
    }
  } else {
    return res.status(401).send({ msg: 'No key provided' });
  }
  next();
});

// ========== User routes ==========
const register = require('./user-routes/register.js');
router.post('/register', (req, res) => {
  register(req, res, fs, bcrypt, CryptoJS, keys, data);
});

const login = require('./user-routes/login.js');
router.post('/login', (req, res) => {
  login(req, res, bcrypt, CryptoJS, keys);
});

const updateUser = require('./user-routes/update.js');
router.put('/update', (req, res) => {
  updateUser(req, res, fs, bcrypt, CryptoJS, keys, data);
});

const deleteUser = require('./user-routes/delete.js');
router.delete('/delete', (req, res) => {
  deleteUser(req, res, fs, keys, data);
});

// ========== Password routes ==========

router.get('/passwords', (req, res) => {
  res.send(req.decrypted);
});

router.get('/password/:id', (req, res) => {
  if (!req.decrypted[req.params.id]) return res.status(404).send({ msg: 'Password not found' });
  res.send(req.decrypted[req.params.id]);
});

const create = require('./pass-routes/create.js');
router.post('/password/create', (req, res) => {
  create(req, res, fs, data, CryptoJS);
});

const updatePass = require('./pass-routes/update.js');
router.patch('/password/update', (req, res) => {
  updatePass(req, res, fs, data, CryptoJS);
});

const deletePass = require('./pass-routes/delete.js');
router.delete('/password/delete', (req, res) => {
  deletePass(req, res, fs, data, CryptoJS);
});

module.exports = router;
