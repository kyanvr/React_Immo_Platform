import { NextFunction, Response } from "express";
import NotFoundError from "../../errors/NotFoundError";
import { createToken } from "../../middleware/auth";
import { AuthRequest } from "../../middleware/auth/auth.types";
import OfficeService from "../Offices/Office.service";
import UserService from "./User.service";
import { UserBody } from "./User.types";

export default class UserController {
    private userService: UserService;
    private officeService: OfficeService;

    constructor() {
        this.userService = new UserService();
        this.officeService = new OfficeService();
    }

    all = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const users = await this.userService.all();
        return res.json(users);
    };

    find = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const user = await this.userService.findOneBy({ id: req.params.id });
        if (!user) {
            next(new NotFoundError());
        }
        return res.json(user);
    };

    create = async (
        req: AuthRequest<{}, {}, UserBody>,
        res: Response,
        next: NextFunction
    ) => {
        if(req.body.officeId) {
            req.body.office = await this.officeService.findOne(req.body.officeId)
        }
        const user = await this.userService.create(req.body);
        const data = await this.userService.findOne(user["id"]);
        return res.json({
            user,
            token: createToken(data),
        });
    };

    update = async (
        req: AuthRequest<{ id: string }, {}, UserBody>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const user = await this.userService.update(
                parseInt(req.params.id),
                req.body
            );
            if (!user) {
                next(new NotFoundError());
            }
            return res.json(user);
        } catch (err) {
            next(err);
        }
    };

    delete = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const user = await this.userService.delete(parseInt(req.params.id));
            if (!user) {
                next(new NotFoundError());
            }
            return res.json({});
        } catch (err) {
            next(err);
        }
    };

    findCurrent = async (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) => {
        const user = await this.userService.findOneBy({ id: req.user.id });
        if (!user) {
            next(new NotFoundError());
        }
        return res.json(user);
    };

    updateCurrent = async (
        req: AuthRequest<{ id: number }, {}, UserBody>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const user = await this.userService.updateCurrent(
                req.user.id,
                req.body
            );
            if (!user) {
                next(new NotFoundError());
            }
            return res.json(user);
        } catch (err) {
            next(err);
        }
    };
}
