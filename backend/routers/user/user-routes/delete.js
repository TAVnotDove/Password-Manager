module.exports = (req, res, fs, keys, data) => {
  delete keys[req.body.email];
  delete data[req.body.email];

  fs.promises.writeFile('./data/keys.json', JSON.stringify(keys, null, 2));
  fs.promises.writeFile('./data/data.json', JSON.stringify(data, null, 2));

  res.status(418).send('User deleted');
};

/*
  just be logged in, include the key and user headers
*/
