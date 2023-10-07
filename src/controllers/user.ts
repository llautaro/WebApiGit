import { NextFunction, Request, Response } from "express";
//import db from "../db/models";
import { handleHttp } from "../utils/error.handle";
import authService from '../services/auth';
import userService from '../services/user';
import { error } from "console";
import { apiResponse } from "../helper";

/*
app.put(
    '/signup/municipality/outsider/:invitationCode/:memberId',
    validation(signupOutsiderParamsSchema, validationSource.PARAM),
    validation(signupMunicipalitySchema),
    (req: Request, res: Response, next: NextFunction) => {
      const { body, params } = req;
      return signupWithCodeService
        .signUpOutsiderWithCode(params, body, 'municipality')
        .then(user => res.status(200).json(apiResponse.success(user)))
        .catch((error: Error) => {
          next(error);
        });
    }
  );
*/

const getAllUsers = async(req:Request,res:Response,next:NextFunction)=>{
  return await userService.getAllUsers()
                      .then(users=>res.status(200).json(users))
                      .catch((error: Error) => {
                        next(error);
                      });
}
/*
app.get('/state', (req: Request, res: Response, next: NextFunction) => {
  return State.getStatelist()
    .then((stateData: IState) => {
      res.status(200).json(apiResponse.success(stateData));
    })
    .catch((error: Error) => {
      next(error);
    });
});
*/
const registerUser = async (req:Request, res: Response,next:NextFunction) => {
  
  const { body, params } = req;
  return authService.singup(body)
  .then(user=>res.status(200).json(user))
  .catch((error: Error) => {
    next(error);
  });

}


const loginUser = async (req: Request, res: Response,next:NextFunction) => {
    const start = req.headers.startTime || Date.now();
    const { email, password } = req.body;
    return authService
      .login(email,password)
      .then((user:any)=>{
        const end = Date.now();
        res.setHeader('X-Response-Time', end - +start);
        res.status(200).json(user);
      })
      .catch((error:Error) => {
        next(error);
      });
};

export { loginUser,registerUser,getAllUsers };

//export { obtenerUser,borrarUser, crearUser, obtenerUsers,crearSesion,consultarSesion};


/*
const obtenerUsers = async (req: Request, res: Response) => {
  try {
    const response = await getUsers();
    res.send(response);
  } catch (e) {
    handleHttp(res, "ERROR_GET_ITEMS obtenerUsers");
  }
};

const crearUser = async ({ body }: Request, res: Response) => {
  try {
    const responseItem = await insertUser(body);
    res.send(responseItem);
  } catch (e) {
    handleHttp(res, "ERROR_POST_ITEM", e);
  }
};

const borrarUser = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await deleteUser(id);
    res.send(response);
  } catch (e) {
    handleHttp(res, "ERROR_DELETE_ITEM");
  }
};
*/

