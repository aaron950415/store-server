const fs = require("fs");
const getContentType = (extName, callBack) => {
    fs.readFile("./src/mime.json", (err, data) => {
      if (err) {
        return
      }
      let mimeJson = JSON.parse(data);
      let contentType = mimeJson[extName] || "text/plain";
      callBack(contentType);
    });
  };

module.exports = {getContentType};