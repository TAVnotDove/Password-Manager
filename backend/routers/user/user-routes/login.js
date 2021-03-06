module.exports = (req, res, bcrypt, CryptoJS, keys) => {
  //check if user exists
  if (!Object.keys(keys).includes(req.body.email)) return res.status(404).send({ msg: 'User does not exist' });

  //check if password is correct
  bcrypt.compare(req.body.password, keys[req.body.email].password, function (err, result) {
    if (err) res.status(500).send({ msg: 'Error while comparing password' });
    if (!result) return res.status(401).send({ msg: 'Wrong password' });

    //get key
    let key = CryptoJS.AES.decrypt(keys[req.body.email].key, req.body.password).toString(CryptoJS.enc.Utf8);

    res.json({ key });
  });
};

/*
{
  email: 'stefano',
  password: '123456789'
}
*/
