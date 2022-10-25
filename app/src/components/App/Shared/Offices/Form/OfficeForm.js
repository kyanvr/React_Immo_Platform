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

const OfficeForm = ({ initialData = {}, disabled, onSubmit, label }) => {
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
                <Label htmlFor="name">{t("fields.name")}</Label>
                <Input
                    name="name"
                    value={values.name}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.name}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="avatar">{t("fields.avatar")}</Label>
                <FileInput
                    name="avatar"
                    value={values.avatar}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.avatar}
                />
            </FormGroup>
            <h3>{t("offices.fields.contact")}</h3>
            <FormGroup>
                <Label htmlFor="contactName">{t("fields.name")}</Label>
                <Input
                    name="contactName"
                    value={values.contactName}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.contactName}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="contactEmail">{t("fields.email")}</Label>
                <Input
                    name="contactEmail"
                    value={values.contactEmail}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.contactEmail}
                />
            </FormGroup>
            <Button type="submit" disabled={disabled}>
                {label}
            </Button>
        </form>
    );
};

export default OfficeForm;
