import { config } from "@/config/env";
import { CREDENTIAL_LIMITS } from "@shared/limits";
import { applyLimits } from "@shared/utils"
import bcrypt from 'bcryptjs';


export class AuthHelper {

    hashPassword = async(pass: string) => {
        const password = applyLimits(CREDENTIAL_LIMITS.password).parse(pass);
        const passwordToHash = `${config.PEPPER}${password.trim()}`;
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(passwordToHash, salt)
    }

}