import "reflect-metadata";
import { DataSource } from "typeorm";
import Category from "../modules/Categories/Category.entity";
import Office from "../modules/Offices/Office.entity";
import Area from "../modules/Scraper/Area/Area.entity";
import House from "../modules/Scraper/House/House.entity";
import User from "../modules/User/User.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Area, House, User, Office, Category],
    migrations: [],
    subscribers: [],
    ...(process.env.ENV === "production"
        ? {
              ssl: {
                  rejectUnauthorized: false,
              },
          }
        : {}),
});
