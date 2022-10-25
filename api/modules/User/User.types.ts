import Office from "../Offices/Office.entity";

export interface UserBody {
    name: string;
    surname: string;
    email: string;
    password?: string;
    officeId: number;
    office?: Office;
}
