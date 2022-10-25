import { useTranslation } from "react-i18next";
import { Link, useOutletContext } from "react-router-dom";
import useTitle from "../../../../../core/hooks/useTitle";
import { HomeRoutes, route } from "../../../../../core/routing";
import BackButton from "../../../../Design/Buttons/BackButton";
import Container from "../../../../Design/Container";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import Carousel from "react-gallery-carousel";
import "react-gallery-carousel/dist/index.css";
import { useUser } from "../../../Auth/AuthProvider";
import Header from "../../../Shared/Generic/Header/Header";
import Grid from "../../../../Design/Grid";
import Row from "../../../../Design/Row";
import Col from "../../../../Design/Col";
import { FaHeart } from "react-icons/fa";

const HomeDetailScreen = () => {
    const { t } = useTranslation();
    const { house } = useOutletContext();
    const user = useUser();

    useTitle(house ? house.type : "");

    const images = house.images.map((image) => ({
        src: image,
    }));

    const address = `${house.address} ${house.houseNumber}, ${house.zipcode} ${house.city}`;

    return (
        <>
            <Header />
            <Container>
                <BackButton href={route(HomeRoutes.Index)} />
                <PageHeader>
                    <Title>
                        {house.type} te {house.city}
                    </Title>
                </PageHeader>
                <Grid>
                    <Row>
                        <Col>
                            <Carousel
                                images={images}
                                style={{ height: 500, width: 800 }}
                            />
                        </Col>
                        <Col>
                            {user && (
                                <>
                                    <h2>{t("houses.address")}</h2>
                                    <p>{address}</p>
                                </>
                            )}
                            <h2 className="h3">{t("houses.price")}</h2>
                            {house.action === "to rent" && (
                                <p>
                                    {house.price} {t("houses.perMonth")}
                                </p>
                            )}
                            {house.action === "for sale" && (
                                <p>{house.price}</p>
                            )}
                            <h3>{t("houses.surfaceArea")}</h3>
                            <p>{house.surfaceArea}</p>
                            <h4 className="h3">{t("houses.buildYear")}</h4>
                            <p>{house.buildYear}</p>
                            {user && (
                                <Link to={""} className="btn btn-primary">
                                    {t("buttons.favourite")} <FaHeart />
                                </Link>
                            )}
                        </Col>
                    </Row>
                </Grid>
            </Container>
        </>
    );
};

export default HomeDetailScreen;
