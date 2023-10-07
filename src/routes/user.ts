import { Router } from "express";
import {
  //borrarUser,
  loginUser,
  getAllUsers
  //obtenerUsers,
  //crearUser,
} from "../controllers/user";
import auth from "../middleware/auth";
//import { getAllUsers } from "../services/user";
//import { router } from ".";

//import express, { Request, Response } from 'express';
//export const calcRoute = express.Router();

//calcRoute.post('/calc', (req: Request, res: Response) => {

//});



const routerUser = Router();

//routerUser.get("/", obtenerUsers);

//routerUser.get("/:id", obtenerUser);
routerUser.get("/users",auth(), getAllUsers);

//routerUser.post("/", crearUser);
//routerUser.delete("/:id", borrarUser);

export { routerUser };