import Carousel from "react-gallery-carousel";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import useTitle from "../../../../../core/hooks/useTitle";
import { HouseRoutes, route } from "../../../../../core/routing";
import BackButton from "../../../../Design/Buttons/BackButton";
import Col from "../../../../Design/Col";
import Container from "../../../../Design/Container";
import Grid from "../../../../Design/Grid";
import PageHeader from "../../../../Design/PageHeader";
import Row from "../../../../Design/Row";
import Title from "../../../../Design/Typography/Title";

const HouseDetailScreen = () => {
    const { t } = useTranslation();
    const { house } = useOutletContext();

    useTitle(house ? house.type : "");

    const images = house.images.map((image) => ({
        src: image,
    }));

    const address = `${house.address} ${house.houseNumber}, ${house.zipcode} ${house.city}`;

    return (
        <>
            <Container>
                <BackButton href={route(HouseRoutes.Index)} />
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
                            <h2>{t("houses.address")}</h2>
                            <p>{address}</p>
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
                        </Col>
                    </Row>
                </Grid>
            </Container>
        </>
    );
};

export default HouseDetailScreen;
