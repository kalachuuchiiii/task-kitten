import { USER_LIMIT } from "../limits";
import { applyRestraints } from "../utils";


export const nicknameSchema = applyRestraints(USER_LIMIT.nickname);