import useFetch from "../../../../../core/hooks/useFetch";
import Alert from "../../../../Design/Alert";
import { Link } from "react-router-dom";
import { route, OfficeRoutes } from "../../../../../core/routing";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import { useTranslation } from "react-i18next";
import Table from "../../../../Design/Table/Table";
import TableHeader from "../../../../Design/Table/TableHeader";
import TableRow from "../../../../Design/Table/TableRow";
import Title from "../../../../Design/Typography/Title";
import DeleteButton from "../../../Shared/Generic/Buttons/DeleteButton";
import PageHeader from "../../../../Design/PageHeader";
import Button from "../../../../Design/Buttons/Button";
import useTitle from "../../../../../core/hooks/useTitle";
import isVoid from "../../../../../core/helpers/isVoid";
import { getImagePath } from "../../../../../core/helpers/api";

const OfficeOverviewScreen = () => {
    const { t } = useTranslation();
    const {
        isLoading,
        data: offices,
        error,
        invalidate,
    } = useFetch("/offices");

    useTitle(t("offices.title"));

    const handleOfficeDelete = () => {
        invalidate();
    };

    if (isLoading) {
        return <LoadingIndicator />;
    }
    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    return (
        <>
            <PageHeader>
                <Title>{t("offices.overview.title")}</Title>
                <Button href={OfficeRoutes.New}>
                    {t("offices.overview.create")}
                </Button>
            </PageHeader>
            <Table
                header={
                    <TableHeader>
                        <th></th>
                        <th>{t("fields.name")}</th>
                        <th>{t("offices.fields.contact")}</th>
                        <th></th>
                    </TableHeader>
                }>
                {offices.map((office) => (
                    <TableRow key={office.id}>
                        <td>
                            {!isVoid(office.avatar) && (
                                <img
                                    style={{ width: "3rem", height: "3rem" }}
                                    src={getImagePath(office.avatar)}
                                    alt={office.name}
                                />
                            )}
                        </td>
                        <td>
                            <Link
                                to={route(OfficeRoutes.Detail, {
                                    id: office.id,
                                })}>
                                {office.name}
                            </Link>
                        </td>
                        <td>
                            {office.contactName} ({office.contactEmail})
                        </td>
                        <td>
                            <DeleteButton
                                size="sm"
                                id={office.id}
                                scope="offices"
                                onSuccess={handleOfficeDelete}
                            />
                        </td>
                    </TableRow>
                ))}
            </Table>
        </>
    );
};

export default OfficeOverviewScreen;
