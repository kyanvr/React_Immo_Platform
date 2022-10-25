import Button from "../../../../Design/Buttons/Button";
import FormGroup from "../../../../Design/Form/FormGroup";
import Input from "../../../../Design/Form/Input";
import Label from "../../../../Design/Form/Label";
import * as yup from "yup";
import useForm from "../../../../../core/hooks/useForm";
import { useTranslation } from "react-i18next";
import FileInput from "../../../../Design/Form/FileInput";

const schema = yup.object().shape({
    name: yup.string().required(),
    contactName: yup.string().required(),
    contactEmail: yup.string().email().required(),
});

const HouseForm = ({ initialData = {}, disabled, onSubmit, label }) => {
    const { t } = useTranslation();
    const { values, errors, handleChange, handleSubmit } = useForm(schema, {
        type: "",
        price: "",
        street: "",
        houseNumber: "",
        zipcode: "",
        city: "",
        contactEmail: "",
        ...initialData,
    });

    const handleData = (values) => {
        onSubmit(values);
    };

    return (
        <form onSubmit={handleSubmit(handleData)} noValidate={true}>
            <FormGroup>
                <Label htmlFor="type">{t("fields.type")}</Label>
                <Input
                    name="type"
                    value={values.type}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.type}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="price">{t("fields.price")}</Label>
                <Input
                    name="price"
                    value={values.price}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.price}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="street">{t("fields.street")}</Label>
                <Input
                    name="street"
                    value={values.street}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.street}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="houseNumber">{t("fields.houseNumber")}</Label>
                <Input
                    name="houseNumber"
                    value={values.houseNumber}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.houseNumber}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="zipcode">{t("fields.zipcode")}</Label>
                <Input
                    name="zipcode"
                    value={values.zipcode}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.zipcode}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="city">{t("fields.city")}</Label>
                <Input
                    name="city"
                    value={values.city}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.city}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="buildYear">{t("fields.buildYear")}</Label>
                <Input
                    name="buildYear"
                    value={values.buildYear}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.buildYear}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="surfaceArea">{t("fields.surfaceArea")}</Label>
                <Input
                    name="surfaceArea"
                    value={values.surfaceArea}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.surfaceArea}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="bedrooms">{t("fields.bedrooms")}</Label>
                <Input
                    name="bedrooms"
                    value={values.bedrooms}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.bedrooms}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="images">{t("fields.images")}</Label>
                <FileInput
                    name="images"
                    value={values.images}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.images}
                />
            </FormGroup>
            <Button type="submit" disabled={disabled}>
                {label}
            </Button>
        </form>
    );
};

export default HouseForm;
