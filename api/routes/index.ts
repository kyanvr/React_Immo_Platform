import { NextFunction, Request, Response, Router } from "express";
import path = require("path");
import * as express from "express";
import NotFoundError from "../errors/NotFoundError";
import { authJwt, authLocal, withRole } from "../middleware/auth";
import CategoryController from "../modules/Categories/Category.controller";
import OfficeController from "../modules/Offices/Office.controller";
import AreaController from "../modules/Scraper/Area/Area.controller";
import HouseController from "../modules/Scraper/House/House.controller";
import AuthController from "../modules/User/Auth.controller";
import { UserRole } from "../modules/User/User.constants";
import UserController from "../modules/User/User.controller";

const useMethod =
    (func: (req: any, res: Response, next: NextFunction) => Promise<any>) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await func(req, res, next);
        } catch (err) {
            next(err);
        }
    };

const registerOnboardingRoutes = (router: Router) => {
    const authController = new AuthController();
    const houseController = new HouseController();
    const userController = new UserController();

    router.get("/", useMethod(houseController.all));
    router.get("/detail/:id", useMethod(houseController.find));
    router.get("/for-sale", useMethod(houseController.forSale));
    router.get("/to-rent", useMethod(houseController.toRent));

    router.post("/login", authLocal, useMethod(authController.login));
    router.post("/register", useMethod(userController.create));
};

const registerAdminRoutes = (router: Router) => {
    const adminRouter = Router();

    const userController = new UserController();
    const areaController = new AreaController();
    const houseController = new HouseController();
    const officeController = new OfficeController();
    const categoryController = new CategoryController();

    // routes for scraper
    adminRouter.get("/scrape/houses", houseController.scrapeHousesForSale);
    adminRouter.get("/scrape/areas", areaController.scrapeAreas);

    // routes for offices
    adminRouter.get("/offices", useMethod(officeController.all));
    adminRouter.post("/offices", useMethod(officeController.create));
    adminRouter.get("/offices/:id", useMethod(officeController.find));
    adminRouter.patch("/offices/:id", useMethod(officeController.update));
    adminRouter.delete("/offices/:id", useMethod(officeController.delete));

    // routes for users
    adminRouter.get("/users", useMethod(userController.all));
    adminRouter.post("/users", useMethod(userController.create));
    adminRouter.get("/users/:id", useMethod(userController.find));
    adminRouter.patch("/users/:id", useMethod(userController.update));
    adminRouter.delete("/users/:id", useMethod(userController.delete));

    // routes for houses
    adminRouter.get("/houses", useMethod(houseController.all));
    adminRouter.post("/houses", useMethod(houseController.create));
    adminRouter.get("/houses/:id", useMethod(houseController.find));
    adminRouter.patch("/houses/:id", useMethod(houseController.update));
    adminRouter.delete("/houses/:id", useMethod(houseController.delete));

    // routes for categories
    adminRouter.get("/categories", useMethod(categoryController.all));
    adminRouter.post("/categories", useMethod(categoryController.create));
    adminRouter.get("/categories/:id", useMethod(houseController.find));
    adminRouter.patch("/categories/:id", useMethod(houseController.update));
    adminRouter.delete("/categories/:id", useMethod(houseController.delete));

    router.use(withRole(UserRole.Admin), adminRouter);
};

const registerAuthenticatedRoutes = (router: Router) => {
    const authRouter = Router();

    const userController = new UserController();
    authRouter.get("/profile/:id", useMethod(userController.findCurrent));
    authRouter.patch("/profile/:id", useMethod(userController.update));

    registerAdminRoutes(authRouter);

    // authenticated routes use authJWT
    router.use(authJwt, authRouter);
};

const registerRoutes = (app: Router) => {
    // public folder
    app.use("/public", express.static(path.resolve(__dirname, "../public")));

    // onboarding routes (login, ...)
    registerOnboardingRoutes(app);

    // authenticated routes (authentication required)
    registerAuthenticatedRoutes(app);

    // fallback route, return our own 404 instead of default
    app.use((req: Request, res: Response, next: NextFunction) => {
        next(new NotFoundError());
    });
};

export { registerRoutes, registerOnboardingRoutes };
