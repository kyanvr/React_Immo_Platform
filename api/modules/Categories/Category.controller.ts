import { NextFunction, Request, Response } from "express";
import NotFoundError from "../../errors/NotFoundError";
import CategoryService from "./Category.service";
import { CategoryBody } from "./Category.types";

export default class CategoryController {
    private categoryService: CategoryService;

    constructor() {
        this.categoryService = new CategoryService();
    }

    all = async (req: Request, res: Response, next: NextFunction) => {
        const offices = await this.categoryService.all();
        return res.json(offices);
    };

    find = async (
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const office = await this.categoryService.findOne(
            parseInt(req.params.id)
        );
        if (!office) {
            next(new NotFoundError());
            return;
        }
        return res.json(office);
    };

    create = async (
        req: Request<{}, {}, CategoryBody>,
        res: Response,
        next: NextFunction
    ) => {
        const office = await this.categoryService.create(req.body);
        console.log(office);
        return res.json(office);
    };

    update = async (
        req: Request<{ id: string }, {}, CategoryBody>,
        res: Response,
        next: NextFunction
    ) => {
        const office = await this.categoryService.update(
            parseInt(req.params.id),
            req.body
        );
        if (!office) {
            next(new NotFoundError());
            return;
        }
        return res.json(office);
    };

    delete = async (
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const office = await this.categoryService.delete(
            parseInt(req.params.id)
        );
        if (!office) {
            next(new NotFoundError());
            return;
        }
        return res.json({});
    };
}
