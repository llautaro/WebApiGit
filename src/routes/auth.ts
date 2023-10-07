import { Router } from "express";
import { registerUser,loginUser } from "../controllers/user";
import validation  from "../middleware/validation";
import auth from "../middleware/auth";
import Joi from "joi";
const routerAuth = Router();

routerAuth.post("/register", 
validation(
  Joi.object({
    email: Joi.string().required(),
    password:Joi.string().required(),
})),
registerUser);


routerAuth.post("/login",
validation(
  Joi.object({
    email: Joi.string().required(),
    password:Joi.string().required(),
})),
loginUser
);

export { routerAuth };