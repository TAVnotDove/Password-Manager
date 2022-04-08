module.exports = (req, res, fs, data, CryptoJS) => {
  if (!req.decrypted) return res.status(401);

  console.log(req.decrypted[req.body.id]);

  req.decrypted[req.body.id] = { ...req.decrypted[req.body.id], ...req.body.updates };

  console.log(req.decrypted[req.body.id]);

  req.decrypted = CryptoJS.AES.encrypt(JSON.stringify(req.decrypted), req.headers.key).toString();
  data[req.headers.user] = req.decrypted;

  fs.promises.writeFile('./data/data.json', JSON.stringify(data, null, 2));

  res.send('entry updated');
};

/*
{
  "id" : "ec8e7c0e-2cf6-47cc-9899-ed5729150952",
  "updates" : {
    "website" : "NOT google.com",
    "name" : "NOT stefano",
    "password" : "987654321"
  }
}
*/
