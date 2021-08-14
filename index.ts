import { IncomingMessage, ServerResponse } from "http";

import * as http from "http";
import * as fs from "fs";
import * as p from "path";
import express from 'express';
import path from 'path';
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(9000);
// const server=http.createServer();
// const publicDir = p.resolve(__dirname,'build/index.html')
// server.on("request",(request: IncomingMessage,response:ServerResponse)=>{
//     const {method,url,headers} = request;
//     console.log(url);

//          response.setHeader('Content-Type','text/html;charset-utf-8')
//       //   const stream = fs.createReadStream(publicDir)
//       // stream.pipe(response)
//     fs.readFile(__dirname+"/build/index.html",(error,data)=>{
//       response.end(data.toString())
//     })
// })

// server.listen(8888)


