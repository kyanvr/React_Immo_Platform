import { Repository } from "typeorm";

import { AppDataSource } from "../../../database/DataSource";
import Area from "./Area.entity";
import { AreaBody } from "./Area.types";

export default class AreaService {
    private repository: Repository<Area>;

    constructor() {
        this.repository = AppDataSource.getRepository(Area);
    }

    all = async () => {
        const areas = await this.repository.find({
            order: {
                city: "ASC",
            },
        });
        return areas;
    };

    findOne = async (id: number) => {
        const area = await this.repository.findOneBy({ id });
        return area;
    };

    create = async (body: AreaBody) => {
        const area = await this.repository.save(this.repository.create(body));
        return area;
    };

    update = async (id: number, body: AreaBody) => {
        let area = await this.findOne(id);
        if (area) {
            area = await this.repository.save({ ...area, ...body });
        }
        return area;
    };

    delete = async (id: number) => {
        // make sure the findOne has relation "projects" and "projects.logs" -> due to "cascade: true" projects and logs will be deleted as well
        let area = await this.repository.findOne({
            where: { id },
            relations: ["projects", "projects.logs"],
        });
        if (area) {
            await this.repository.softRemove(area);
        }
        return area;
    };
}
