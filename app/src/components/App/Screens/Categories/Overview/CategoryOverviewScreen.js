import useFetch from "../../../../../core/hooks/useFetch";
import Alert from "../../../../Design/Alert";
import { Link } from "react-router-dom";
import { CategoryRoutes, route } from "../../../../../core/routing";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import { useTranslation } from "react-i18next";
import Title from "../../../../Design/Typography/Title";
import DeleteButton from "../../../Shared/Generic/Buttons/DeleteButton";
import PageHeader from "../../../../Design/PageHeader";
import Button from "../../../../Design/Buttons/Button";
import useTitle from "../../../../../core/hooks/useTitle";
import Table from "../../../../Design/Table/Table";
import TableHeader from "../../../../Design/Table/TableHeader";
import TableRow from "../../../../Design/Table/TableRow";

const CategoryOverviewScreen = () => {
    const { t } = useTranslation();
    const {
        isLoading,
        data: categories,
        error,
        invalidate,
    } = useFetch("/categories");

    useTitle(t("houses.overview.title"));

    const handleCategoryDelete = () => {
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
                <Title>{t("categories.overview.title")}</Title>
                <Button href={CategoryRoutes.New}>{t("buttons.create")}</Button>
            </PageHeader>
            <Table
                header={
                    <TableHeader>
                        <th>{t("fields.type")}</th>
                        <th></th>
                    </TableHeader>
                }>
                {categories.map((category) => (
                    <TableRow key={category.id}>
                        <td>
                            <Link
                                to={route(CategoryRoutes.Edit, {
                                    id: category.id,
                                })}>
                                {category.name}
                            </Link>
                        </td>
                        <td>
                            <DeleteButton
                                size="sm"
                                id={category.id}
                                scope="categories"
                                onSuccess={handleCategoryDelete}
                            />
                        </td>
                    </TableRow>
                ))}
            </Table>
        </>
    );
};

export default CategoryOverviewScreen;
