import Button from "../../../../Design/Buttons/Button";
import FormGroup from "../../../../Design/Form/FormGroup";
import Input from "../../../../Design/Form/Input";
import Label from "../../../../Design/Form/Label";
import * as yup from "yup";
import useForm from "../../../../../core/hooks/useForm";
import { useTranslation } from "react-i18next";
import PasswordInput from "../../../../Design/Form/PasswordInput";
import OfficeSelect from "../../Offices/Select/OfficeSelect";
import { useUser } from "../../../Auth/AuthProvider";
import { UserRoles } from "../../../../../core/modules/users/constants";

const getSchema = (isUpdate) => {
    return yup.object().shape({
        name: yup.string().required(),
        surname: yup.string().required(),
        email: yup.string().email().required(),
        password: isUpdate ? yup.string() : yup.string().required(),
    });
};

const transformValues = (values) => {
    if (values.password.length === 0) {
        const { password, ...rest } = values;
        values = rest;
    }
    return values;
};

const UserForm = ({ initialData = {}, disabled, onSubmit, label }) => {
    const { t } = useTranslation();
    const user = useUser();
    const isUpdate = !!initialData.id;
    const { values, errors, handleChange, handleSubmit } = useForm(
        getSchema(isUpdate),
        {
            name: "",
            surname: "",
            email: "",
            password: "",
            officeId: null,
            role: "",
            ...initialData,
        }
    );

    const handleData = (values) => {
        onSubmit(transformValues(values));
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
                <Label htmlFor="surname">{t("fields.surname")}</Label>
                <Input
                    name="surname"
                    value={values.surname}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.surname}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="email">{t("fields.email")}</Label>
                <Input
                    name="email"
                    value={values.email}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.email}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="password">{t("fields.password")}</Label>
                <PasswordInput
                    name="password"
                    value={values.password}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.password}
                />
                {isUpdate && (
                    <p className="text-muted">
                        {t("users.edit.password_print")}
                    </p>
                )}
            </FormGroup>
            {user.role === "ADMIN" && (
                <FormGroup>
                    <Label htmlFor="officeId">{t("fields.office")}</Label>
                    <OfficeSelect
                        name="officeId"
                        value={values.officeId}
                        disabled={disabled}
                        onChange={handleChange}
                        error={errors.office}
                    />
                </FormGroup>
            )}
            {user.role === "ADMIN" && (
                <FormGroup>
                    <Label></Label>
                    <select
                        className="form-control"
                        name="role"
                        value={values.role}
                        disabled={disabled}
                        onChange={handleChange}
                        error={errors.role}>
                        <option value={UserRoles.User}>{UserRoles.User}</option>
                        <option value={UserRoles.Realtor}>
                            {UserRoles.Realtor}
                        </option>
                    </select>
                </FormGroup>
            )}
            <Button type="submit" disabled={disabled}>
                {label}
            </Button>
        </form>
    );
};

export default UserForm;
