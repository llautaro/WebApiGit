import { IBaseType } from './base';



interface IUser extends IBaseType {

  email: string;
  password: string;
  //fullName: string;
  isActive: boolean;
  roles: string[];
  name?:string,
  firstName?:string
}

export { IUser,IUserV2};



interface IUserV2 {
  email: string;
  roles: string[];
  firstName?:string
}


