import { NextFunction, Request, Response } from "express"
import NotFoundError from "../../../errors/NotFoundError";
import AreaService from "./Area.service"
import { AreaBody } from "./Area.types";

const puppeteer = require('puppeteer')

export default class AreaController {
    private areaService: AreaService;

    constructor() {
        this.areaService = new AreaService();
    }

    all = async (req: Request, res: Response, next: NextFunction) => {
        const areas = await this.areaService.all();
        return res.json(areas);
    };

    find = async (
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const house = await this.areaService.findOne(parseInt(req.params.id));
        if (!house) {
            next(new NotFoundError());
            return;
        }
        return res.json(house);
    };

    create = async (
        req: Request<{}, {}, AreaBody>,
        res: Response,
        next: NextFunction
    ) => {
        const house = await this.areaService.create(req.body);
        return res.json(house);
    };

    update = async (
        req: Request<{ id: string }, {}, AreaBody>,
        res: Response,
        next: NextFunction
    ) => {
        const house = await this.areaService.update(
            parseInt(req.params.id),
            req.body
        );
        if (!house) {
            next(new NotFoundError());
            return;
        }
        return res.json(house);
    };

    delete = async (
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const house = await this.areaService.delete(parseInt(req.params.id));
        if (!house) {
            next(new NotFoundError());
            return;
        }
        return res.json({});
    };

    // scrape functions
    scrapeHouses = async () => {
        const browser = await puppeteer.launch({});
        const page = await browser.newPage();

        await page.goto(
            "https://www.immotwins.be/nl/te-koop?view=list&page=1&goal=0"
        );
        for (let index = 1; index < 10; index++) {
            const titlePage = await page.waitForSelector(
                "#divProperties > div:nth-child(" +
                    index +
                    ") > div.propdivinfo > h3"
            );
            const title = await page.evaluate(
                (titlePage) => titlePage.textContent,
                titlePage
            );
            const pricePage = await page.waitForSelector(
                "#divProperties > div:nth-child(" +
                    index +
                    ") > div.propdivinfo > h4.propprijs"
            );
            const price = await page.evaluate(
                (pricePage) => pricePage.textContent,
                pricePage
            );
            console.log(title);
            console.log(price);
        }
        browser.close();
    };

    scrapeAreas = async (req: Request, res: Response) => {
        const browser = await puppeteer.launch({});
        const page = await browser.newPage();
        const timeout = 10000;
        page.setDefaultTimeout(timeout);

        await page.goto("https://www.immotwins.be/nl/");
        for (let index = 2; index < 100; index++) {
            const selector = await page.waitForSelector(
                "#cbocities > option:nth-child(" + index + ")"
            );
            if (!selector) return;
            const areaText = await page.evaluate(
                (selector) => selector.textContent,
                selector
            );
            let areaArray = {
                city: areaText,
            };
            const area = await this.areaService.create(areaArray);
        }
        browser.close();
    };
}
