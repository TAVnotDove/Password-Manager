module.exports = (req, res, fs, data, CryptoJS) => {
  if (!req.decrypted[req.body.id]) return res.status(410).send({ msg: 'Password not found' });
  if (!req.body.updates) return res.status(400).send({ msg: 'Nothing to update' });

  req.decrypted[req.body.id] = { ...req.decrypted[req.body.id], ...req.body.updates };

  req.decrypted = CryptoJS.AES.encrypt(JSON.stringify(req.decrypted), req.headers.key).toString();
  data[req.headers.user] = req.decrypted;

  fs.promises.writeFile('./data/data.json', JSON.stringify(data, null, 2));

  res.send({ msg: 'Password details updated' });
};

/*
{
  "id" : "ec8e7c0e-2cf6-47cc-9899-ed5729150952",
  "updates" : {
    "url" : "NOT google.com",
    "name" : "NOT stefano",
    "password" : "987654321"
  }
}
*/
