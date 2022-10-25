import { Repository } from "typeorm";

import { AppDataSource } from "../../../database/DataSource";
import House from "./House.entity";
import { HouseBody } from "./House.types";

export default class HouseService {
    private repository: Repository<House>;

    constructor() {
        this.repository = AppDataSource.getRepository(House);
    }

    all = async () => {
        const houses = await this.repository.find({
            order: {
                id: "ASC",
            },
        });
        return houses;
    };

    findOne = async (id: number) => {
        const house = await this.repository.findOneBy({ id });
        return house;
    };

    create = async (body: HouseBody) => {
        const house = await this.repository.save(this.repository.create(body));
        return house;
    };

    update = async (id: number, body: HouseBody) => {
        let house = await this.findOne(id);
        if (house) {
            house = await this.repository.save({ ...house, ...body });
        }
        return house;
    };

    delete = async (id: number) => {
        // make sure the findOne has relation "projects" and "projects.logs" -> due to "cascade: true" projects and logs will be deleted as well
        let house = await this.repository.findOne({
            where: { id },
        });
        if (house) {
            await this.repository.softRemove(house);
        }
        return house;
    };

    forSale = async () => {
        const housesForSale = await this.repository.find({
            where: { action: "for sale" },
            order: {
                id: "ASC"
            }
        });
        return housesForSale;
    };

    toRent = async () => {
        const housesToRent = await this.repository.find({
            where: { action: "to rent" },
            order: {
                id: "ASC"
            }
        });
        return housesToRent;
    }
}