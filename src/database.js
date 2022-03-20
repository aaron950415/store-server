
  let mysql = require("mysql");
  let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "wy0930788745",
  });

  connection.connect();

  connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
  });

  connection.query(
    "CREATE DATABASE IF NOT EXISTS aaron DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_unicode_520_ci;",
    function (error, results, fields) {
      if (error) throw error;
    }
  );
  connection.query("use aaron;");
  connection.query(
    `CREATE TABLE IF NOT EXISTS user(
      name text,
      age int
      ) ;`,
    function (error, results, fields) {
      if (error) throw error;
    }
  );
  
  const addInfo = (name, age) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `INSERT INTO user (name,age) VALUES ('${name}',${age});`,
        function (error, results, fields) {
          if (error) throw error;
          console.log("add successful");
          resolve("addSuccessful");
        }
      );
    });
  };
  const updateInfo = (name, age,ageChange) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE user SET age=${ageChange} WHERE name = '${name}' AND age = ${age} ;`,
        function (error, results, fields) {
          if (error) throw error;
          console.log("update successful");
          resolve("modifySuccessful");
        }
      );
    });
  };
  const deleteInfo = (name, age) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `DELETE FROM user WHERE name='${name}' AND age=${age};`,
        function (error, results, fields) {
          if (error) throw error;
          console.log("delete successful");
          resolve("deleteSuccessful");
        }
      );
    });
  };
  const findInfo = (name) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM user WHERE name = "${name}";`,
        function (error, results, fields) {
          if (error) throw error;
          console.log("search successful");
          resolve(results);
        }
      );
    });
  };

module.exports = {addInfo,updateInfo,deleteInfo,findInfo};
