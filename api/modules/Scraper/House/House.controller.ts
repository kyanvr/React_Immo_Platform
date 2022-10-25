import { NextFunction, Request, Response } from "express";
import NotFoundError from "../../../errors/NotFoundError";
import AreaService from "../Area/Area.service";
import HouseService from "./House.service";
import { HouseBody } from "./House.types";

const puppeteer = require("puppeteer");

export default class HouseController {
    private houseService: HouseService;
    private areaService: AreaService;

    constructor() {
        this.houseService = new HouseService();
        this.areaService = new AreaService();
    }

    all = async (req: Request, res: Response, next: NextFunction) => {
        const houses = await this.houseService.all();
        const areas = await this.areaService.all();
        return res.json([houses, areas]);
    };

    find = async (
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const house = await this.houseService.findOne(parseInt(req.params.id));
        if (!house) {
            next(new NotFoundError());
            return;
        }
        return res.json(house);
    };

    create = async (
        req: Request<{}, {}, HouseBody>,
        res: Response,
        next: NextFunction
    ) => {
        // const avatar = getAvatar(req);
        // if (avatar) {
        //     req.body.avatar = avatar;
        // }
        const house = await this.houseService.create(req.body);
        return res.json(house);
    };

    update = async (
        req: Request<{ id: string }, {}, HouseBody>,
        res: Response,
        next: NextFunction
    ) => {
        // const avatar = getAvatar(req);
        // if (avatar) {
        //     req.body.avatar = avatar;
        // }
        const house = await this.houseService.update(
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
        const house = await this.houseService.delete(parseInt(req.params.id));
        if (!house) {
            next(new NotFoundError());
            return;
        }
        return res.json({});
    };

    forSale = async (req: Request, res: Response, next: NextFunction) => {
        const housesForSale = await this.houseService.forSale();
        const areas = await this.areaService.all();
        return res.json([housesForSale, areas]);
    };

    toRent = async (req: Request, res: Response, next: NextFunction) => {
        const housesToRent = await this.houseService.toRent();
        const areas = await this.areaService.all();
        return res.json([housesToRent, areas]);
    };

    // scrape functions
    scrapeHousesForSale = async () => {
        const browser = await puppeteer.launch({});
        const page = await browser.newPage();
        page.setDefaultTimeout(240000);

        for (let i = 1; i < 6; i++) {
            await page.goto(process.env.SCRAPE_URL_FOR_SALE + i);

            for (let j = 1; j < 13; j++) {
                const getUrl = await page.waitForSelector(
                    "#divProperties > div:nth-child(" +
                        j +
                        ") > div.propdivimg > div.property-img > a"
                );
                const url = await page.evaluate(
                    (getUrl) => getUrl.href,
                    getUrl
                );
                this.scrapeDetailsForSale(url);
            }
        }
        browser.close();
    };

    scrapeDetailsForSale = async (url: string) => {
        const browser = await puppeteer.launch({});
        const page = await browser.newPage();
        page.setDefaultTimeout(240000);

        const images = [];

        await page.goto(url);
        const getPrice = await page.waitForSelector(
            "#PropertyRegion > div.grid_4.panddetailright > div.detailrechts > h3"
        );
        const price = await page.evaluate(
            (getPrice) => getPrice.textContent,
            getPrice
        );
        const getAddress = await page.waitForSelector(
            "#PropertyRegion > div.grid_4.panddetailright > div.detailrechts > p:nth-child(3)"
        );
        const address = await page.evaluate(
            (getAddress) => getAddress.textContent,
            getAddress
        );
        const getSurfaceArea = await page.waitForSelector(
            "#PropertyRegion > div.grid_4.panddetailright > div.detailrechts > p:nth-child(9)"
        );
        const surfaceArea = await page.evaluate(
            (getSurfaceArea) => getSurfaceArea.textContent,
            getSurfaceArea
        );
        const getBuildYear = await page.waitForSelector(
            "#PropertyRegion > div.grid_4.panddetailright > div.detailrechts > p:nth-child(7)"
        );
        const buildYear = await page.evaluate(
            (getBuildYear) => getBuildYear.textContent,
            getBuildYear
        );
        const getType = await page.waitForSelector(
            "#PropertyRegion > div.grid_4.panddetailright > div.detailrechts > p:nth-child(2)"
        );
        const type = await page.evaluate(
            (getType) => getType.textContent,
            getType
        );
        const getBedrooms = await page.waitForSelector(
            "#PropertyRegion > div.grid_4.panddetailright > div.detailrechts > p:nth-child(2)"
        );
        const bedrooms = await page.evaluate(
            (getBedrooms) => getBedrooms.textContent,
            getBedrooms
        );
        for (let k = 1; k < 11; k++) {
            const getImage = await page.waitForSelector(
                "#pandfotoslider > div > div > div:nth-child(" +
                    k +
                    ") > div > a > img"
            );
            const image = await page.evaluate(
                (getImage) => getImage.src,
                getImage
            );

            images.push(image);
        }

        let houseArray = {
            price: price.substr(12),
            address:
                address.split(" ").length === 6
                    ? address.split(" ").slice(2, 3).join(" ")
                    : address.split(" ").slice(2, 4).join(" "),
            surfaceArea: surfaceArea.split(" ").slice(-2).join(" "),
            buildYear: buildYear.split(" ").slice(-1).join(),
            type: type.split(" ").slice(0, 1).shift(),
            action: "for sale",
            city: address.split(" ").slice(-2)[1],
            zipcode: address.split(" ").slice(-2)[0],
            houseNumber:
                address.split(" ").length === 6
                    ? address.split(" ").slice(3, 4).join().slice(0, -1)
                    : address.split(" ").slice(4, 5).join().slice(0, -1),
            images: images,
            bedrooms: bedrooms,
        };

        const house = await this.houseService.create(houseArray);

        browser.close();
    };

    scrapeHousesToRent = async () => {
        const browser = await puppeteer.launch({});
        const page = await browser.newPage();
        page.setDefaultTimeout(240000);

        for (let i = 1; i < 5; i++) {
            await page.goto(process.env.SCRAPE_URL_TO_RENT + i);

            for (let j = 1; j < 13; j++) {
                const getUrl = await page.waitForSelector(
                    "#divProperties > div:nth-child(" +
                        j +
                        ") > div.propdivimg > div.property-img > a"
                );
                const url = await page.evaluate(
                    (getUrl) => getUrl.href,
                    getUrl
                );
                this.scrapeDetailsToRent(url);
            }
        }
        browser.close();
    };

    scrapeDetailsToRent = async (url: string) => {
        const browser = await puppeteer.launch({});
        const page = await browser.newPage();
        page.setDefaultTimeout(240000);

        const images = [];

        await page.goto(url);
        const getPrice = await page.waitForSelector(
            "#PropertyRegion > div.grid_4.panddetailright > div.detailrechts > h3"
        );
        const price = await page.evaluate(
            (getPrice) => getPrice.textContent,
            getPrice
        );
        const getAddress = await page.waitForSelector(
            "#PropertyRegion > div.grid_4.panddetailright > div.detailrechts > p:nth-child(3)"
        );
        const address = await page.evaluate(
            (getAddress) => getAddress.textContent,
            getAddress
        );
        const getType = await page.waitForSelector(
            "#PropertyRegion > div.grid_4.panddetailright > div.detailrechts > p:nth-child(2)"
        );
        const type = await page.evaluate(
            (getType) => getType.textContent,
            getType
        );
        const getBedrooms = await page.waitForSelector(
            "#PropertyRegion > div.grid_8.panddetailleft > div.tabknoppen > div.detailgreen > div.infogreenaantal"
        );
        const bedrooms = await page.evaluate(
            (getBedrooms) => getBedrooms.textContent,
            getBedrooms
        );

        for (let k = 1; k < 11; k++) {
            const getImage = await page.waitForSelector(
                "#pandfotoslider > div > div > div:nth-child(" +
                    k +
                    ") > div > a > img"
            );
            const image = await page.evaluate(
                (getImage) => getImage.src,
                getImage
            );

            images.push(image);
        }

        let houseArray = {
            price: price.substr(12),
            address:
                address.split(" ").length === 6
                    ? address.split(" ").slice(2, 3).join(" ")
                    : address.split(" ").slice(2, 4).join(" "),
            surfaceArea: "75m²",
            buildYear: "2020",
            type: type.split(" ").slice(0, 1).shift(),
            action: "to rent",
            city: address.split(" ").slice(-2)[1],
            zipcode: address.split(" ").slice(-2)[0],
            houseNumber:
                address.split(" ").length === 6
                    ? address.split(" ").slice(3, 4).join().slice(0, -1)
                    : address.split(" ").slice(4, 5).join().slice(0, -1),
            images: images,
            bedrooms: bedrooms,
        };

        const house = await this.houseService.create(houseArray);

        browser.close();
    };
}
