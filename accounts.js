const express = require('express');
const router = express.Router();
const DAO = require("./dao.js");

/*
  /accounts/reg/{social}/{userID}?accessToken={accessToken}&name={name}
  1. social+userID - существует?
    да: -> ошибка;
    нет: -> добавить пользователя, присвоить groupID      
*/
router.get('/reg/*/*', (req, res) => {
  const name = req.query.name;
  if (name === undefined) throw "name error";
  const accessToken = req.query.accessToken;
  if (accessToken === undefined) throw "accessToken error";
  const social = req.params[0];
  if (social !== "vk") throw "social error"
  const userID = req.params[1];
  DAO.regUser({social: social, userID: social+userID, name: name, accessToken: accessToken})
  .then( out => res.send(out.ops[0]))
  .catch(e => res.send(e.errmsg));
});

/* 
  /accounts/add/{groupID}/{social}/{userID}?accessToken={accessToken}&name={name}
  1. social+userID - существует?
    да: -> вернуть ошибку.
    нет:
      существует userID == groupID ?
        да: -> добавить пользователя;
        нет: -> ошибка.
*/
router.get('/add/*/*/*/', (req, res) => {
  const name = req.query.name;
  if (name === undefined) throw "name error";
  const accessToken = req.query.accessToken;
  if (accessToken === undefined) throw "accessToken error";
  const groupID = req.params[0];  
  const social = req.params[1];
  if (social !== "vk") throw "social error";
  const userID = req.params[2];
  const obj = {
    name: name,
    accessToken: accessToken,
    groupID: groupID,
    social: social,
    userID: social+userID
  }
  DAO.addUserToGroup(obj)
  .then( out => res.send(out.ops[0]))
  .catch(e => res.send(e));
});

/*
  /accounts/{groupID} - запрос связанных аккаунтов
    return [..accounts]
*/
router.get("/group/*/", (req, res) => {
  const groupID = req.params[0];
  DAO.getAccountsByGroupId(groupID)
  .then( out => res.send(out))
  .catch(e => res.send(e));
});

/*
  /accounts/auth/{accessToken}/ - авторизация
    -> account || error
*/
router.get("/auth/*/", (req, res) => {
  const token = req.params[0];
  console.log(token);
  DAO.getAccountByToken(token)
  .then( out => {
    if (!out) throw "not auth";
    res.send(out);
  })
  .catch(e => res.send(e));
});

module.exports = router;