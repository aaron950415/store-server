const p = require("path");
const http = require("http");
const fs = require("fs");
const url = require("url");
const server = http.createServer();
const publicDir = p.resolve(__dirname + "/public");
const common = require("./src/common.js")
// const database = require("./src/database")
server.on("request", async (request, response) => {
  const { url: path } = request;
  const { pathname, query } = url.parse(path);

  switch (pathname) {
    case "/":
      response.setHeader("Content-Type", "text/html;charset-utf-8");
      const stream = fs.createReadStream(publicDir + "/index.html");
      stream.pipe(response);
      break;

    case "/find":
      let searchTitle;
          let searchContent;
      if (query !== null) {
        searchTitle = query.substring(0, 4);
        searchContent = query.substring(5);
      }

      switch (searchTitle) {
        case "name":
          let findResult;
          await database.findInfo(searchContent).then((chunk) => (findResult = chunk));
          response.end(JSON.stringify(findResult));

          break;
      }
      break;

    case "/add":
      const addData = {
        name: "",
        age: 0,
        ageChange: 0
      };

      await new Promise((resolve, reject) => {
        request.on("data", (chunk) => {
          resolve(JSON.parse(decodeURIComponent(chunk)));
        });
      }).then((chunk) => {
        addData.name = chunk.name;
        addData.age = parseInt(chunk.age);
      });
      let addResult;
      await database.addInfo(addData.name, addData.age).then(
        (chunk) => (addResult = chunk)
      );
      response.end(JSON.stringify(addResult));
      break;
      
    case "/update":
      const updateData = {
        name: "",
        age: 0,
        ageChange: 0
      };

      await new Promise((resolve, reject) => {
        request.on("data", (chunk) => {
          resolve(JSON.parse(decodeURIComponent(chunk)));
        });
      }).then((chunk) => {
        updateData.name = chunk.name;
        updateData.age = parseInt(chunk.age);
        updateData.ageChange = parseInt(chunk.ageChange);
      });

      let updateResult;
      await database.updateInfo(updateData.name, updateData.age,updateData.ageChange).then(
        (chunk) => (updateResult = chunk)
      );
      response.end(JSON.stringify(updateResult));
      break;

    case "/delete":
      const deleteData = {
        name: "",
        age: 0,
        ageChange: 0
      };

      await new Promise((resolve, reject) => {
        request.on("data", (chunk) => {
          resolve(JSON.parse(decodeURIComponent(chunk)));
        });
      }).then((chunk) => {
        deleteData.name = chunk.name;
        deleteData.age = parseInt(chunk.age);
      });

      let deleteResult;
      await database.deleteInfo(deleteData.name, deleteData.age).then(
        (chunk) => (deleteResult = chunk)
      );
      response.end(JSON.stringify(deleteResult));
      break;

    default:
      extname=path.split('.');
      common.getContentType("."+extname[1], (contentType)=>{
        response.setHeader("Content-Type", contentType+";charset-utf-8");
        const stream2 = fs.createReadStream(publicDir + pathname);
        stream2.pipe(response);
      })
      break;
  }
});


server.listen(3000);
