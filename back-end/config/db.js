// Create connexion
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ssMRhrc68xVReAJtIxFg",
  database: "groupomania",
});

// i don't use .env because its my openclassrooms project so it's not sensible data. In real project, i will use .env and put it in .gitignore
db.connect((err, connection) => {
  if (err) {
    console.error("error connecting: " + err.stack);
  } else {
    console.log("Connection Successful and Connected");
  }
});

module.exports.getDB = () => {
  return db;
};
