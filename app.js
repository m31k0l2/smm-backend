const express = require('express');
const accounts = require('./accounts');
const vk = require('./vk');
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.use('/accounts', accounts);
app.use('/vk', vk);

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});

/*
  API:
  /auth?accessToken={accessToken} - авторизация пользователя, id храним в куки или запрашиваем у vk
    return: ok, error.
      groupID
      error - пользователь отсутствует в базе;

  /posts/{userID}?from={time}&to=(time) - запросов постов
    return [..], error - список постов

  /vk/post/{userId}?accessToken={accessToken}
    POST: text,
          time
    return id, error
      id - id поста в vk
*/