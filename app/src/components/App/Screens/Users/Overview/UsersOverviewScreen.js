import useFetch from "../../../../../core/hooks/useFetch";
import Alert from "../../../../Design/Alert";
import { Link } from "react-router-dom";
import { route, UserRoutes } from "../../../../../core/routing";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import { useTranslation } from "react-i18next";
import Table from "../../../../Design/Table/Table";
import TableHeader from "../../../../Design/Table/TableHeader";
import TableRow from "../../../../Design/Table/TableRow";
import { formatName } from "../../../../../core/modules/users/utils";
import Button from "../../../../Design/Buttons/Button";
import Title from "../../../../Design/Typography/Title";
import PageHeader from "../../../../Design/PageHeader";
import useTitle from "../../../../../core/hooks/useTitle";

const UsersOverviewScreen = () => {
    const { t } = useTranslation();
    const { isLoading, data: users, error } = useFetch("/users");

    useTitle(t("users.title"));

    if (isLoading) {
        return <LoadingIndicator />;
    }
    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    return (
        <>
            <PageHeader>
                <Title>{t("users.overview.title")}</Title>
                <Button href={UserRoutes.New}>
                    {t("users.overview.create")}
                </Button>
            </PageHeader>
            <Table
                header={
                    <TableHeader>
                        <th>{t("fields.id")}</th>
                        <th>{t("fields.name")}</th>
                        <th>{t("fields.email")}</th>
                        <th>{t("fields.role")}</th>
                    </TableHeader>
                }>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <td>{user.id}</td>
                        <td>
                            <Link
                                to={route(UserRoutes.Detail, {
                                    id: user.id,
                                })}>
                                {formatName(user)}
                            </Link>
                        </td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                    </TableRow>
                ))}
            </Table>
        </>
    );
};

export default UsersOverviewScreen;
