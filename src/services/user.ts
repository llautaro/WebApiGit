import db from "../db";
import Sequelize from 'sequelize';
import { sequelize } from '../db/models';
import { IQuery } from '../types/common';
import { BadRequestError, constants, dbHelper, InternalError, NotFoundError } from '../helper';
import { IUser, IUserV2 } from "../types/user";
import { error } from "console";


const {Op} = sequelize;


const getAllUsers = async () => {
  console.log("lautaro")

  const myResponseCount: any = await dbHelper.selectQuery("select email,roles from public.user");
 console.log(JSON.stringify(myResponseCount));

  return await dbHelper.findAll(db.User,
    {}
    //attributes:[['email','roles','firstName']]
    //{attributes: { include: ['email','roles'] }}
  ).then((users:IUser)=>{

    
    if(users){
      return users;
    }
    console.log("NAAAAAAAAAAAAA")
    //throw new InternalError(constants.CODE.GENERAL_EXCEPTION_MESSAGE, constants.TITLE.GENERAL_EXCEPTION_MESSAGE);
  })
  .catch((error:Error) =>{
    console.log("PASO POR ACA")
    console.log(JSON.stringify(error))
    throw error;
  });
  /*
  const getStatelist = () => {
  return dbHelper
    .findAll(db.State, {
      attributes: ['ID', 'StateName'],
      order: [['ID', 'ASC']],
      where: { Status: 1 }
    })
    .then((state: IState) => {
      if (state) {
        return state;
      }
      throw new InternalError(constants.CODE.GENERAL_EXCEPTION_MESSAGE, constants.TITLE.GENERAL_EXCEPTION_MESSAGE);
    })
    .catch((error: Error) => {
      logger.error(error);
      throw error;
    });
};
  */


};

/*
const insertUser = async (item:any) => {
  const responseInsert = await User.create(item);
  return responseInsert;
};

const getUsers = async () => {
  const responseItem = await db.User.findAll();
  return responseItem;
};
*/




const getUser = async (id: string) => {

  const query: any = {};
  query.attributes = {
    exclude: ['password']
  };
  query.where = { id:id}
  return dbHelper
      .findOne(db.User,query)
      .then((userProfile:IUser) =>{
        if(!userProfile){
          throw new NotFoundError("constants.CODE.PROFILE_NOT_FOUND", "constants.TITLE.PROFILE_NOT_FOUND");
        }
        return userProfile;

      }).catch((error: Error) => {
        throw error;
      });

  //const responseItem = await db.User.findOne({ _id: id });
  //return responseItem;
};
/*
const deleteUser = async (id: string) => {
  const responseItem = await db.User.remove({ _id: id });
  return responseItem;
};

export { insertUser, getUsers, getUser, deleteUser };

*/

export default {getUser,getAllUsers}
