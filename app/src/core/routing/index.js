const AuthRoutes = {
    Index: "/auth",
    Login: "/auth/login",
    Register: "/auth/register",
    Logout: "/logout",
};

const OfficeRoutes = {
    Index: "/offices",
    New: "/offices/new",
    Detail: "/offices/:id",
    Edit: "/offices/:id/edit",
};

const UserRoutes = {
    Index: "/users",
    New: "/users/new",
    Detail: "/users/:id",
    Edit: "/users/:id/edit",
    Favourites: "/profile/favourites",
    FindCurrent: "profile",
    EditCurrent: "edit",
};

const HomeRoutes = {
    Index: "/",
    Detail: "/detail/:id",
    ForSale: "/for-sale",
    ToRent: "to-rent",
};

const HouseRoutes = {
    Index: "/houses",
    New: "/houses/new",
    Detail: "/houses/:id",
    Edit: "/houses/:id/edit",
};

const CategoryRoutes = {
    Index: "/categories",
    New: "/categories/new",
    Detail: "/categories/:id",
    Edit: "/categories/:id/edit",
};

// replaces : values with values from object
// e.g. route('/projects/:id', { id : 9 }) -> /projects/9
export const route = (path, options = {}) => {
    Object.keys(options).forEach((key) => {
        path = path.replace(`:${key}`, options[key]);
    });
    return path;
};

export {
    AuthRoutes,
    OfficeRoutes,
    UserRoutes,
    HomeRoutes,
    HouseRoutes,
    CategoryRoutes,
};
