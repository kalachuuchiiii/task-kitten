import { CredentialsSchema } from "../types/credentials";

import jwt from "jsonwebtoken";

import {
  ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION,
} from "../constants";
import { generateToken, verifyToken } from "@/helpers";
import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "@/utils/errors";
import { Credentials, Task, User } from "@/models";
import { runWithSession } from "@/utils";
import { UserSchema } from "@shared/types";
import { formatDuration, intervalToDuration } from "date-fns";

type UserForm = { username: string; password: string; };
type CreatedEntities = { user: UserSchema; credentials: CredentialsSchema };
const missingUserCode = 'auth.error.user_not_found';
const missingCredentialsCode = 'auth.error.credentials_not_found';

export class AuthService {
  updateUsername = async ({
    userId,
    newUsername,
  }: {
    userId: string;
    newUsername: string;
  }) => {
    const user = await User.findById(userId).orFail(
      new NotFoundError(missingUserCode)
    );
 
    const { update } = await runWithSession(async (session) => {
      const upd = await user.updateOne(
        { username: newUsername },
        { runValidators: true, session }
      );
      const updUser =  user.lastUsernameUpdate = new Date();
      await user.save({ session });
      return {
        update: upd,
      };
    });

    return update;

  };

  updatePassword = async ({
    userId,
    newPassword,
  }: {
    userId: string;
    newPassword: string;
  }) => {
    const credentials = await Credentials.findOne({ userId }).orFail(
      new NotFoundError( missingCredentialsCode)
    );
    const updatedPass = await credentials.updateOne(
      { password: newPassword },
      { runWithValidators: true }
    );
    return updatedPass;
  };

  refresh = async (refreshToken: string | undefined) => {
    const decodedToken = await verifyToken(refreshToken);
    const userId = (decodedToken as jwt.JwtPayload).user;
    await User.exists({ _id: userId })
      .orFail(new UnauthorizedError( missingUserCode))
      .lean();
    const accessToken = await generateToken(
      { user: userId },
      ACCESS_TOKEN_EXPIRATION
    );
    return { accessToken };
  };

  getSession = async (refreshToken: string | undefined) => {
    const decodedToken = await verifyToken(refreshToken);
    const userId = (decodedToken as jwt.JwtPayload).user;
    const user = await User.findById(userId)
      .orFail(new UnauthorizedError( missingUserCode))
      .lean();
      const totalOwnedTasks = await Task.countDocuments({ userId: user._id });
    const accessToken = await generateToken(
      { user: userId },
      ACCESS_TOKEN_EXPIRATION
    );

    return {
      user,
      totalOwnedTasks,
      accessToken,
    };
  };

  register = async (userRequest: UserForm) => {
    const { username, password } = userRequest;

    const doesUserExist = await User.findOne({ username });
    if (doesUserExist)
      throw new ConflictError('auth.error.username_already_taken');

    const created = await runWithSession<CreatedEntities>(async (session) => {
      const user: UserSchema = await new User({ username }).save({ session });
      const credentials: CredentialsSchema = await new Credentials({
        password,
        userId: String(user._id),
      }).save({ session });

      return {
        user,
        credentials,
      };
    });

    return created;
  };

  login = async (userRequest: Omit<UserForm, "confirmPassword">) => {
    const { username, password } = userRequest;

    const doesUserExist = await User.findOne({ username }).orFail(new NotFoundError(missingUserCode));
    const credentials = await Credentials.findOne({
      userId: String(doesUserExist._id),
    }).orFail(new NotFoundError(missingCredentialsCode));

    const isPasswordCorrect = await credentials.isPasswordCorrect(password);
    if (!isPasswordCorrect) throw new UnauthorizedError('auth.error.invalid_credentials');

    const tokenPayload = { user: doesUserExist._id };
    const refreshToken = await generateToken(
      tokenPayload,
      REFRESH_TOKEN_EXPIRATION
    );

    return {
      user: doesUserExist,
      refreshToken,
    };
  };
}
