import { NextFunction, Response } from "express";
import { createToken } from "../../middleware/auth";
import { AuthRequest } from "../../middleware/auth/auth.types";

export default class AuthController {
    login = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { user } = req;
        return res.json({
            user,
            token: createToken(user),
        });
    };

    register = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { user } = req;
        return res.json({
            user,
            token: createToken(user),
        });
    };

}
