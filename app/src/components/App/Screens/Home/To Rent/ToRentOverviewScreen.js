import useFetch from "../../../../../core/hooks/useFetch";
import Alert from "../../../../Design/Alert";
import { Link } from "react-router-dom";
import { route, HomeRoutes } from "../../../../../core/routing";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import { useTranslation } from "react-i18next";
import useTitle from "../../../../../core/hooks/useTitle";
import Card from "../../../../Design/Card/Card";
import Container from "../../../../Design/Container";
import Grid from "../../../../Design/Grid";
import Col from "../../../../Design/Col";
import Hero from "../../../../Design/Hero/Hero";
import HomeForm from "../../../Shared/Home/Form/HomeForm";
import Header from "../../../Shared/Generic/Header/Header";
import Button from "../../../../Design/Buttons/Button";
import { useState } from "react";

const ToRentOverviewScreen = () => {
    const { t } = useTranslation();
    const { isLoading, data, error } = useFetch("/to-rent");

    // lazy loading
    const [count, setCount] = useState(10);
    const addMore = () => {
        // function that will make count add by 10 to show 10 more items
        setCount(count + 10);
    };

    useTitle(t("onboarding.home.title"));

    if (isLoading) {
        return <LoadingIndicator />;
    }
    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    const options = data[1].map((a) => ({ value: a.id, label: a.city }));

    return (
        <>
            <Header />
            <Hero quote={t("home.overview.message")}>
                <HomeForm initialData={options} label={t("buttons.filter")} />
            </Hero>
            <Container>
                <Grid>
                    {data[0].slice(0, count).map((house) => (
                        <Col key={house.id}>
                            <Link
                                to={route(HomeRoutes.Detail, {
                                    id: house.id,
                                })}>
                                <Card
                                    image={house.images[0]}
                                    type={house.type}
                                    price={house.price}
                                    action={house.action}
                                    key={house.id}
                                />
                            </Link>
                        </Col>
                    ))}
                </Grid>
                <Button color="primary" onClick={addMore}>
                    {t("buttons.viewMore")}
                </Button>
            </Container>
        </>
    );
};

export default ToRentOverviewScreen;
