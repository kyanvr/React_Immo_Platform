import { useTranslation } from "react-i18next";
import { Link, useOutletContext } from "react-router-dom";
import useTitle from "../../../../../core/hooks/useTitle";
import { OfficeRoutes, route } from "../../../../../core/routing";
import BackButton from "../../../../Design/Buttons/BackButton";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";

const OfficeDetailScreen = () => {
    const { t } = useTranslation();
    const { office } = useOutletContext();

    useTitle(office ? office.name : "");

    return (
        <>
            <BackButton href={route(OfficeRoutes.Index)} />
            <PageHeader>
                <Title>{office.name}</Title>
            </PageHeader>
            <p>{office.contactName}</p>
            <p>{office.contactEmail}</p>
            <p>{office.city}</p>
            <Link to={route(OfficeRoutes.Edit, { id: office.id })}>
                {t("buttons.edit")}
            </Link>
        </>
    );
};

export default OfficeDetailScreen;
