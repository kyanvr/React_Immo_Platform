import {
    CategoryRoutes,
    HomeRoutes,
    HouseRoutes,
    OfficeRoutes,
    UserRoutes,
} from "../../../../../core/routing";
import { useAuthContext, useUser } from "../../../Auth/AuthProvider";
import NavBar from "../../../../Design/NavBar/NavBar";
import { useTranslation } from "react-i18next";
import {
    isAdmin,
    isRealtor,
    isUser,
} from "../../../../../core/modules/users/utils";

const Header = () => {
    const { t } = useTranslation();
    const user = useUser();
    const { logout } = useAuthContext();

    // default routes
    let routes = [
        {
            href: HomeRoutes.ForSale,
            label: t("navigation.forSale"),
        },
        {
            href: HomeRoutes.ToRent,
            label: t("navigation.toRent"),
        },
    ];

    if (user) {
        // admin only routes
        if (isAdmin(user)) {
            routes = [
                {
                    href: OfficeRoutes.Index,
                    label: t("navigation.offices"),
                },
                {
                    href: UserRoutes.Index,
                    label: t("navigation.users"),
                },
                {
                    href: HouseRoutes.Index,
                    label: t("navigation.houses"),
                },
                {
                    href: CategoryRoutes.Index,
                    label: t("navigation.categories"),
                },
            ];

            return (
                <NavBar
                    onLogout={logout}
                    logoutLabel={t("onboarding.logout.button")}
                    navItems={routes}
                />
            );
        }
        // user only routes
        if (isUser(user)) {
            routes = [
                {
                    href: HomeRoutes.ForSale,
                    label: t("navigation.forSale"),
                },
                {
                    href: HomeRoutes.ToRent,
                    label: t("navigation.toRent"),
                },
                {
                    href: UserRoutes.Favourites,
                    label: t("navigation.favourites"),
                },
                {
                    href: UserRoutes.FindCurrent,
                    label: t("navigation.profile"),
                },
            ];

            return (
                <NavBar
                    onLogout={logout}
                    logoutLabel={t("onboarding.logout.button")}
                    navItems={routes}
                />
            );
        }
        // realtor only routes
        if (isRealtor(user)) {
            routes = [
                {
                    href: HomeRoutes.ForSale,
                    label: t("navigation.forSale"),
                },
                {
                    href: HomeRoutes.ToRent,
                    label: t("navigation.toRent"),
                },
                {
                    href: UserRoutes.FindCurrent,
                    label: t("navigation.profile"),
                },
            ];

            return (
                <NavBar
                    onLogout={logout}
                    logoutLabel={t("onboarding.logout.button")}
                    navItems={routes}
                />
            );
        }
    }

    return (
        <NavBar
            onLogin={true}
            loginLabel={t("onboarding.login.button")}
            navItems={routes}
            onRegister={true}
            registerLabel={t("onboarding.register.button")}
        />
    );
};

export default Header;
