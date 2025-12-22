import { nicknameSchema } from "@shared/schema";
import { RequestHandler } from "express";


export class UserController {


    updateNickname: RequestHandler = async(req, res) => {
        const nickname = nicknameSchema.parse(req.body.newNickname);
        
    }
}