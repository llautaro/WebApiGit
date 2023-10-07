
import { addAttribute, Sequelize } from 'sequelize-typescript';
import db from '../db';
import { auth, AuthFailureError, BadRequestError, constants, dbHelper, InternalError, NotFoundError } from '../helper';
import { IUser } from '../types/user';
import { Op } from 'sequelize';
import _ from 'lodash';

/** Login user */
const login = async (email:string,password:string)=>{//(Email: string, Password: string) => {
 
const emailLowercase = _.toLower(email);

 return await dbHelper.findOne(db.User,
  //{where:{email:email}}, 
  {where: {
    [Op.and]: [Sequelize.literal(`LOWER("email") = '${emailLowercase}'`)]
  }},
  true,
  ).then((userdb: any) => {

    if (userdb) {
      //if (!auth.comparePassword(userdb.EncryptedPassword, password)) {
      //  throw new AuthFailureError('constants.CODE.INVALID_LOGIN_PASSWORD', 'constants.TITLE.INVALID_LOGIN_PASSWORD');
      //}

      const responseData: any = {
       // FirstName: userdb.firstname,
        paramemail: userdb.email,
      }

      responseData.token = auth.generateToken(userdb);
        return responseData;

    }

    throw new NotFoundError('constants.CODE.INVALID_LOGIN_EMAIL', 'constants.TITLE.INVALID_LOGIN_EMAIL');

  }).catch((error: Error) => {
    throw error;
  });

};


const singup = async(data: any)=>{

  const user = await dbHelper.findOne(db.User,
    {where:{email:data.email}},
    true,
    );

  if(!user){
    console.log(" Se puede crear");

    const encryptedPassword = await auth.hashPassword(data.password);
    const userData: IUser = {
      email: data.email,
      password: encryptedPassword,
      isActive:true,
      roles:['user'],
      dateCreated:new Date()
    };

    await dbHelper.create(db.User,userData);

  }else{
    throw new NotFoundError('555', 'Email ya existe');
  }

// if(result.length != 0){ /* do somthing */ } else { res.status(404) }
/*
  if(user.length == 0){

    
  }else{
      throw new NotFoundError('Existe el email', 'Email ya existe');
  }*/

  return true;

  /*
      .findOne(
      db.User,
      {
        where: {
          ID: userID,
          VerificationCode: data.VerificationCode
        },
        include: ['OrganizationUserMapping']
      },
      true
    )
  */
}

export default {
  login,
  singup
};


