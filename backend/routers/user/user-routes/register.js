module.exports = (req, res, fs, bcrypt, CryptoJS, keys, data) => {
  //check if email is already in use
  if (Object.keys(keys).includes(req.body.email)) return res.send('User already in exists');
  //check if password is strong
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    if (err) res.status(500).send('Error while hashing password');

    //prettier-ignore
    let key = (Math.random().toString(36) + Math.random().toString(36).toUpperCase() + Math.random().toString(36) + Math.random().toString(36).toUpperCase()).split('').sort(() => 0.5 - Math.random()).join('').replace(/\./g, '')

    //encrypt and store key
    keys[req.body.email] = {
      password: hash,
      key: CryptoJS.AES.encrypt(key, req.body.password).toString(),
    };
    fs.promises.writeFile('./data/keys.json', JSON.stringify(keys, null, 2));

    //encrypt and store data
    data[req.body.email] = CryptoJS.AES.encrypt('{}', key).toString();
    fs.promises.writeFile('./data/data.json', JSON.stringify(data, null, 2));

    res.status(201).json({ key });
  });
};
