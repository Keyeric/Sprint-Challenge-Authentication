const bcrypt = require("bcryptjs");
const password = "code";
const hash = bcrypt.hashSync(password, 10);

exports.seed = function (knex) {
  return knex("users")
    .truncate()
    .then(function () {
      return knex("users").insert([
        {
          username: "Todd",
          password: hash,
        },
        {
          username: "Bill",
          password: hash,
        },
      ]);
    });
};
