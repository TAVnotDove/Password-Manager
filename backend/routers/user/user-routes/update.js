module.exports = (req, res, fs, bcrypt, CryptoJS, keys, data) => {
  if (req.body.password) {
    bcrypt.hash(req.body.password, 10, function (err, hash) {
      if (err) res.status(500).send('Error while hashing password');

      //prettier-ignore
      let key = (Math.random().toString(36) + Math.random().toString(36).toUpperCase() + Math.random().toString(36) + Math.random().toString(36).toUpperCase()).split('').sort(() => 0.5 - Math.random()).join('').replace(/\./g, '')

      //encrypt and store key
      keys[req.headers.user] = {
        password: hash,
        key: CryptoJS.AES.encrypt(key, req.body.password).toString(),
      };

      // //encrypt and store data
      data[req.headers.user] = CryptoJS.AES.encrypt(JSON.stringify(req.decrypted, null, 2), key).toString();
      console.log(data);

      fs.promises.writeFile('./data/keys.json', JSON.stringify(keys, null, 2));
      fs.promises.writeFile('./data/data.json', JSON.stringify(data, null, 2));

      res.status(201).json({ key });
    });
  } else if (req.body.email) {
    if (Object.keys(keys).includes(req.body.email)) return res.status(403).send('User already in exists');

    keys[req.body.email] = keys[req.headers.user];
    data[req.body.email] = data[req.headers.user];

    delete keys[req.headers.user];
    delete data[req.headers.user];

    fs.promises.writeFile('./data/keys.json', JSON.stringify(keys, null, 2));
    fs.promises.writeFile('./data/data.json', JSON.stringify(data, null, 2));

    res.status(200).send('Email updated');
  } else {
    res.status(403).send('You cant update like that');
  }
};

/*
{
  "email" : "fuck"
}

or

{
  "password" : "fuck"
}

*/
