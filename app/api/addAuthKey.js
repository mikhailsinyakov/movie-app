const randomstring = require("randomstring");
const db = require("../db");

module.exports = async () => {
  let authKey = randomstring.generate(20);
  while (await db.isUserExist(authKey)) {
    authKey = randomstring.generate(20);
  }
  await db.addUser(authKey);
  return authKey;
};
