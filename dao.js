const db = require("./db");

const regUser = user => db.insertUnique("accounts", "userID", user );

const addUserToGroup = user => ( async () => {
  const account = await db.getAccountByUserID(user.userID);
  if (account) throw "user exists";
  const groupOwner = await db.getAccountByID(user.groupID);
  if (!groupOwner) throw "group not exists";
  return regUser(user);
})()

const getAccountsByGroupId = groupID => db.findAccountsByGroupID(groupID);

const getAccountByToken = token => db.getAccountByToken(token);

module.exports = {
  regUser: regUser,
  addUserToGroup: addUserToGroup,
  getAccountsByGroupId: getAccountsByGroupId,
  getAccountByToken: getAccountByToken,
}