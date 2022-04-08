const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const userRouter = require('./routers/user/router.js');
app.use('/user', userRouter);

app.use((req, res, next) => {
  res.status(404).send('Not found');
});

app.listen(3030, () => {
  console.log('Example app listening on port 3030!');
});
