import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import useTitle from "../../../../../core/hooks/useTitle";
import {
    CategoryRoutes,
    HouseRoutes,
    route,
} from "../../../../../core/routing";
import Alert from "../../../../Design/Alert";
import BackButton from "../../../../Design/Buttons/BackButton";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import CategoryForm from "../../../Shared/Category/Form/CategoryForm";

const CategoryAddScreen = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    useTitle(t("offices.create.title"));

    const { isLoading, error, mutate } = useMutation();

    const handleSubmit = (data) => {
        mutate(`${process.env.REACT_APP_API_URL}/houses`, {
            method: "POST",
            data,
            multipart: true,
            onSuccess: () => {
                navigate(HouseRoutes.Index);
            },
        });
    };

    return (
        <>
            <BackButton href={route(CategoryRoutes.Index)} />
            <PageHeader>
                <Title>{t("categories.create.title")}</Title>
            </PageHeader>
            {error && <Alert color="danger">{error}</Alert>}
            <CategoryForm
                label={t("buttons.create")}
                disabled={isLoading}
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default CategoryAddScreen;
