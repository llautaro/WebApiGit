
import http from 'http';
import express, { json }  from "express";
import cors from "cors";
import "dotenv/config";
//import  {routerUser}  from "./routes/user";

const PORT = process.env.PORT || 9000 ;
const app = express()

const startServer = async () => {

  require('./loaders').default(app);

  app.listen(PORT,()=> console.log('Listo levanto'));

}


startServer();

//app.use(cors())
//app.use(json())
//app.use(routerUser)






