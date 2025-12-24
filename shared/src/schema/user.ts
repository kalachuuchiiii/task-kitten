import { USER_LIMITS } from "../limits";
import { applyLimits } from "../utils";


export const nicknameSchema = applyLimits(USER_LIMITS.nickname);