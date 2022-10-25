import { UserRoles } from "./constants";

const formatName = (user) => {
    return `${user.name} ${user.surname}`;
};

const isAdmin = (user) => {
    return user.role === UserRoles.Admin;
};

const isUser = (user) => {
    return user.role === UserRoles.User;
};

const isRealtor = (user) => {
    return user.role === UserRoles.Realtor;
};

export { formatName, isAdmin, isUser, isRealtor };
