import { createRestraints } from "../utils";

export const USER_LIMIT = {
  username: createRestraints(6, 26, 'Username', { pattern: "alpha_numeric" }),
  nickname: createRestraints(3, 36, 'Nickname', { pattern: 'alpha_numeric' }),
  password: createRestraints(6, 36, 'Password', { pattern: 'alpha_numeric' })
};
