import Button from "../../../../Design/Buttons/Button";
import FormGroup from "../../../../Design/Form/FormGroup";
import Label from "../../../../Design/Form/Label";
import * as yup from "yup";
import useForm from "../../../../../core/hooks/useForm";
import { useTranslation } from "react-i18next";
import Select from "../../../../Design/Form/Select";

const schema = yup.object().shape({
    name: yup.string().required(),
    contactName: yup.string().required(),
    contactEmail: yup.string().email().required(),
});

const HomeForm = ({ initialData = {}, disabled, onSubmit, label }) => {
    const { t } = useTranslation();
    const { values, errors, handleChange, handleSubmit } = useForm(schema, {
        name: "",
        contactName: "",
        contactEmail: "",
        ...initialData,
    });

    const handleData = (values) => {
        onSubmit(values);
    };

    return (
        <form onSubmit={handleSubmit(handleData)} noValidate={true}>
            <FormGroup>
                <Label htmlFor="areaFilter">{t("fields.areas")}</Label>
                <Select
                    name="area"
                    value={values.area}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.area}
                    options={initialData}
                />
            </FormGroup>
            <Button type="submit" disabled={disabled}>
                {label}
            </Button>
        </form>
    );
};

export default HomeForm;
