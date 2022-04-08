module.exports = (req, res, bcrypt, CryptoJS, keys) => {
  //check if user exists
  if (!Object.keys(keys).includes(req.body.email)) return res.send('User does not exist');

  //check if password is correct
  bcrypt.compare(req.body.password, keys[req.body.email].password, function (err, result) {
    if (err) res.status(500).send('Error while comparing password');
    if (!result) return res.status(401).send('Wrong password');

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
