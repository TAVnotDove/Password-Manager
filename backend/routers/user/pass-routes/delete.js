module.exports = (req, res, fs, data, CryptoJS) => {
  if (!req.decrypted[req.body.id]) return res.status(410).send({ msg: 'Password not found' });

  delete req.decrypted[req.body.id];

  req.decrypted = CryptoJS.AES.encrypt(JSON.stringify(req.decrypted), req.headers.key).toString();
  data[req.headers.user] = req.decrypted;

  fs.promises.writeFile('./data/data.json', JSON.stringify(data, null, 2));

  res.send({ msg: 'Entry deleted' });
};

/*
{
  "id" : "32402007-7a30-4d28-9f16-b361643b4a2c"
}
*/
