import useFetch from "../../../../../core/hooks/useFetch";
import Alert from "../../../../Design/Alert";
import { Link } from "react-router-dom";
import { route, HouseRoutes } from "../../../../../core/routing";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import { useTranslation } from "react-i18next";
import Title from "../../../../Design/Typography/Title";
import DeleteButton from "../../../Shared/Generic/Buttons/DeleteButton";
import PageHeader from "../../../../Design/PageHeader";
import Button from "../../../../Design/Buttons/Button";
import useTitle from "../../../../../core/hooks/useTitle";
import Container from "../../../../Design/Container";
import Grid from "../../../../Design/Grid";
import Col from "../../../../Design/Col";
import Card from "../../../../Design/Card/Card";

const HouseOverviewScreen = () => {
    const { t } = useTranslation();
    const { isLoading, data: houses, error, invalidate } = useFetch("/houses");

    useTitle(t("houses.overview.title"));

    const handleHouseDelete = () => {
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
                <Title>{t("houses.overview.title")}</Title>
                <Button href={HouseRoutes.New}>{t("buttons.create")}</Button>
            </PageHeader>
            <Container>
                <Grid>
                    {houses[0].map((house) => (
                        <Col key={house.id}>
                            <Link
                                to={route(HouseRoutes.Detail, {
                                    id: house.id,
                                })}>
                                <Card
                                    image={house.images[0]}
                                    type={house.type}
                                    price={house.price}
                                    action={house.action}
                                />
                            </Link>
                            <DeleteButton
                                onSuccess={handleHouseDelete}
                                scope="houses"
                                id={house.id}
                            />
                        </Col>
                    ))}
                </Grid>
            </Container>
        </>
    );
};

export default HouseOverviewScreen;
