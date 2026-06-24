import express from 'express';
import matchRouter from "./routes/matches.js"
import { number } from 'zod';
import { attachwebSocketServer } from './server.js';

const app=express();
const PORT=Number(process.env.port||8000);
const HOST=process.env.HOST;

const server=httpUrl.createServer(app);

app.get('/',(req,res)=>{  res.send('Hello World!');  });

app.use('/matches',matchRouter)

const {broadcastMatchCreated}=attachwebSocketServer(server);

app.locals.broadcastMatchCreated=broadcastMatchCreated;

// stores that function on Express app locals
// makes it available elsewhere in the app via req.app.locals.broadcastMatchCreated
// So together:

// you create the WebSocket server
// get the broadcastMatchCreated helper
// save it on app.locals so other code 
// (like route handlers) can call it when a match is created

server.listen(PORT,HOST,()=>{
    console.log(`Server started on port ${PORT}`);
});

 