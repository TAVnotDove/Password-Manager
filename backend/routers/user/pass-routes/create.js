const { v4: uuidv4 } = require('uuid');

module.exports = (req, res, fs, data, CryptoJS) => {
  if (!req.body.name || !req.body.email) return res.status(400).send({ msg: 'No user provided' });
  if (!req.body.password) return res.status(400).send({ msg: 'No password provided' });

  let uuid = uuidv4();

  req.decrypted[uuid] = { _id: uuid, ...req.body };

  req.decrypted = CryptoJS.AES.encrypt(JSON.stringify(req.decrypted), req.headers.key).toString();
  data[req.headers.user] = req.decrypted;

  fs.promises.writeFile('./data/data.json', JSON.stringify(data, null, 2));

  res.status(201).send({ msg: 'Entry created' });
};

/*
{
  "url" : "google.com",
  "description" : "my google account yeyaa",
  "email" : "stefano@gamermail.com",
  "name" : "stefano",
  "password" : "123456789"
}
*/
