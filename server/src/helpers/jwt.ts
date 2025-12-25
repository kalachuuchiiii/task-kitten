
import { config } from "@/config/env";
import { UnauthorizedError } from "@/utils/errors";
import jwt, { SignOptions } from "jsonwebtoken";

type Expiry = NonNullable<SignOptions["expiresIn"]>;

export const generateToken = async <T extends {}>(
  payload: T,
  expiresIn: Expiry
) => {
  const key = config.JWT_KEY;
  const signed = await jwt.sign(payload, key, { expiresIn });
  return signed;
};

export const verifyToken = async (
  token: string | undefined,
  throwImmediately: boolean = true
): Promise<jwt.JwtPayload> => {
  if (!token) throw new UnauthorizedError('auth.error.token_not_found');

  try {
    const decoded = await jwt.verify(token, config.JWT_KEY as string);
    return decoded as jwt.JwtPayload;
  } catch (e) {
    if(throwImmediately){
      throw new UnauthorizedError('auth.error.expired_token');
    }
    return new UnauthorizedError( 'auth.error.expired_token')
  }
};
