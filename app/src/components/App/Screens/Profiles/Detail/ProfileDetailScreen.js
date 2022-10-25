import { useTranslation } from "react-i18next";
import { Link, useOutletContext } from "react-router-dom";
import useTitle from "../../../../../core/hooks/useTitle";
import { formatName } from "../../../../../core/modules/users/utils";
import { UserRoutes, route, HomeRoutes } from "../../../../../core/routing";
import BackButton from "../../../../Design/Buttons/BackButton";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";

const ProfileDetailScreen = () => {
    const { t } = useTranslation();
    const { user } = useOutletContext();

    useTitle(user ? formatName(user) : "");

    return (
        <>
            <BackButton href={route(HomeRoutes.Index)} />
            <PageHeader>
                <Title>
                    {user.name} {user.surname}
                </Title>
            </PageHeader>
            <p>{user.email}</p>
            <Link to={route(UserRoutes.EditCurrent, { id: user.id })}>
                {t("buttons.edit")}
            </Link>
        </>
    );
};

export default ProfileDetailScreen;
