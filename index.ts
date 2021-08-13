import { IncomingMessage, ServerResponse } from "http";

import * as http from "http";
import * as fs from "fs";
import * as p from "path";
const server=http.createServer();
const publicDir = p.resolve(__dirname,'build/index.html')
server.on("request",(request: IncomingMessage,response:ServerResponse)=>{
    const {method,url,headers} = request;
    console.log(url);
    if(url === "/"){
        response.setHeader('Content-Type','text/html;charset-utf-8')
        const stream = fs.createReadStream(publicDir)
      stream.pipe(response)

    }
    
})

server.listen(8888)


