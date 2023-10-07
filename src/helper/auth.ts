import _ from 'lodash';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { jwtSecret, jwtExpiresIn } from '../config';
import { IUser } from '../types/user';

const auth = {
  /**
   * Generate hash password
   * @param password: string
   * @param salt: number
   * @return hash password
   */
  hashPassword(password: string, saltRounds: number = 10) {
    return bcrypt
      .genSalt(saltRounds)
      .then(salt => {
        return bcrypt.hash(password, salt);
      })
      .then(hash => {
        return hash;
      });
  },

  /**
   * Compare password for validation
   *
   * @param hashPassword : String
   * @param password : String
   * @returns boolean
   */
  comparePassword(hashPassword: string, password: string) {
    return bcrypt.compareSync(password, hashPassword);
  },

  /**
   * Generate token for user
   *
   * @param {IUser} user
   * @param {any} organizationData
   * @return token string
   */
  generateToken(user: IUser) {
    //const Organization = _.get(user, 'OrganizationUserMapping.Organization', null) || organizationData;
    //const OrganizationType = _.get('Lautaro', 'Type', null);
    const OrganizationID = "Culos SA";// _.get(Organization, 'ID', null);
    const token = jwt.sign(
      {
        userID: user.id ? user.id : "0",
        email:user.email,
        type: user.roles,
        isUserActive: user.isActive,
        OrganizationID:OrganizationID
      },
      jwtSecret,
      { expiresIn: jwtExpiresIn }
    );
    return token;
  }
};

export default auth;