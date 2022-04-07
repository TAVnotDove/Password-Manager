const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
var CryptoJS = require('crypto-js');
var fs = require('fs');
const keys = require('../../data/keys.json');
const data = require('../../data/data.json');

router.use((req, res, next) => {
  console.log(req.headers);
  if (req.headers.key && req.headers.for) {
    try {
      let decrypted = CryptoJS.AES.decrypt(data[req.headers.for], req.headers.key).toString(CryptoJS.enc.Utf8);
      req.decrypted = JSON.parse(decrypted);
    } catch (e) {
      res.status(401).send('Invalid key');
    }
  } else {
    return res.status(401).send('No key provided');
  }
  console.log(req.decrypted);
  next();
});

const register = require('./user-routes/register.js');
router.post('/register', (req, res) => {
  register(req, res, fs, bcrypt, CryptoJS, keys, data);
});

const login = require('./user-routes/login.js');
router.post('/login', (req, res) => {
  login(req, res, bcrypt, CryptoJS, keys);
});

// const login = require('./user-routes/login.js');
// router.post('/update', (req, res) => {
//   login(req, res, bcrypt, CryptoJS, keys);
// });

const deleteUser = require('./user-routes/delete.js');
router.delete('/delete', (req, res) => {
  deleteUser(req, res, fs, keys, data);
});

router.get('/passwords', (req, res) => {
  console.log('aaaa');
  res.send(req.decrypted);
});

router.get('/password/create', (req, res) => {
  res.send(req.decrypted);
});

// router.get('/password/update', (req, res) => {
//   res.send(req.decrypted);
// });

// router.get('/password/delete', (req, res) => {
//   res.send(req.decrypted);
// });

module.exports = router;
