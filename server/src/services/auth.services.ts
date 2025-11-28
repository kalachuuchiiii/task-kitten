import { accessTokenExpiration } from './../data/constants';
import { ConflictError, NotFoundError, UnauthorizedError } from "../utils/errors/Errors";
import { runWithSession } from "../utils/runWithSession";
import { Credentials } from "../models/credentials/credentials";
import { UserSchema } from "../types/user";
import { CredentialsSchema } from "../types/credentials";
import { generateToken, verifyToken } from "../helpers/jwt";
import jwt from 'jsonwebtoken';
import { User } from "../models/user/user";
type UserForm = { username: string; password: string; confirmPassword: string; };
type CreatedEntities = { user: UserSchema; credentials: CredentialsSchema};

export class AuthService {


  async refresh(refreshToken: string | undefined) {
    const decodedToken = await verifyToken(refreshToken);
    const userId = (decodedToken as jwt.JwtPayload).user;
     await User.exists({ _id: userId })
       .orFail(new UnauthorizedError("User not found."))
       .lean();
    const accessToken = await generateToken({ user: userId }, accessTokenExpiration);
    return { accessToken }; 
  }

  async getSession(refreshToken: string | undefined) {
    const decodedToken = await verifyToken(refreshToken);

    const userId = (decodedToken as jwt.JwtPayload).user;
    const user = await User.findById(userId).orFail(new UnauthorizedError('User not found.')).lean();
    const accessToken = await generateToken({ user: userId }, accessTokenExpiration );

    return {
      user,
      accessToken
    }


  }
  
  async register(userRequest: UserForm) {

   const { username, password, confirmPassword } = userRequest;

   if(String(password) !== String(confirmPassword)){
    throw new UnauthorizedError('Passwords do not match.')
   }

    const doesUserExist = await User.findOne({ username });
    if (doesUserExist) throw new ConflictError('This username is already taken.');
    
   const created = await runWithSession<CreatedEntities>(async(session) => {
  
    const user: UserSchema = await new User({ username }).save({ session });
      const credentials: CredentialsSchema = await new Credentials({
        password,
        user: String(user._id)
      }).save({ session });

      return {
        user,
        credentials
      }
    });
     
    return created;
  }

  async login(userRequest: Omit<UserForm, 'confirmPassword'>){
    const { username, password } = userRequest;

    const doesUserExist = await User.findOne({ username });
    if(!doesUserExist)throw new NotFoundError('User not found.');
     
    const credentials = await Credentials.findOne({ user: String(doesUserExist._id) });
    if(!credentials)throw new NotFoundError('Credentials not found.');

    const isPasswordCorrect = await credentials.isPasswordCorrect(password);
    if(!isPasswordCorrect)throw new UnauthorizedError('Invalid Credentials');
    
    const tokenPayload = { user: doesUserExist._id };
    const refreshToken = await generateToken(tokenPayload, '30D');
    
    return {
        user: doesUserExist,
        refreshToken,
    }
  }


}