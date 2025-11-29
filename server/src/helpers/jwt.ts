
    import jwt, { SignOptions } from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/errors/Errors';

    type Expiry = NonNullable<SignOptions['expiresIn']>

    export const generateToken = async<T extends {}>(payload: T, expiresIn: Expiry) => {
    const key = process.env.JWT_KEY;
    if(!key)throw new Error('Missing key');

    const signed = await jwt.sign(payload, key, { expiresIn });
    return signed;
    }

    
    export const verifyToken = async (
      token: string | undefined
    ): Promise<jwt.JwtPayload> => {
      if (!token) throw new UnauthorizedError("Invalid Token");

      try {
        const decoded = await jwt.verify(token, process.env.JWT_KEY as string);
        return decoded as jwt.JwtPayload;
      } catch (e) {
        throw new UnauthorizedError("Invalid Token");
      }
    };
