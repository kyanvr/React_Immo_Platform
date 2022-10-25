import useForm from "../../../../core/hooks/useForm";
import useMutation from "../../../../core/hooks/useMutation";
import Alert from "../../../Design/Alert";
import Button from "../../../Design/Buttons/Button";
import Container from "../../../Design/Container";
import FormGroup from "../../../Design/Form/FormGroup";
import Input from "../../../Design/Form/Input";
import Label from "../../../Design/Form/Label";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import useTitle from "../../../../core/hooks/useTitle";
import { useAuthContext } from "../AuthProvider";

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
    name: yup.string().required(),
    surname: yup.string().required(),
});

const defaultData = {
    email: "",
    password: "",
    name: "",
    surname: "",
};

const RegisterScreen = () => {
    const { t } = useTranslation();
    const { isLoading, error, mutate } = useMutation();
    const { login } = useAuthContext();

    useTitle(t("onboarding.register.title"));

    const { values, errors, handleChange, handleSubmit } = useForm(schema, {
        ...defaultData,
    });

    const handleData = (values) => {
        mutate(`${process.env.REACT_APP_API_URL}/register`, {
            method: "POST",
            data: values,
            onSuccess: (data) => {
                login(data);
            },
        });
    };

    return (
        <Container
            className={
                "vh-100 d-flex flex-column justify-content-center align-items-center"
            }>
            <h1>{t("onboarding.register.title")}</h1>
            <form onSubmit={handleSubmit(handleData)} noValidate={true}>
                {error && <Alert color="danger">{error}</Alert>}
                <FormGroup>
                    <Label htmlFor="name">{t("fields.name")}</Label>
                    <Input
                        name="name"
                        value={values.name}
                        error={errors.name}
                        disabled={isLoading}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="surname">{t("fields.surname")}</Label>
                    <Input
                        name="surname"
                        value={values.surname}
                        error={errors.surname}
                        disabled={isLoading}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="email">{t("fields.email")}</Label>
                    <Input
                        name="email"
                        value={values.email}
                        error={errors.email}
                        disabled={isLoading}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">{t("fields.password")}</Label>
                    <Input
                        name="password"
                        type="password"
                        value={values.password}
                        error={errors.password}
                        disabled={isLoading}
                        onChange={handleChange}
                    />
                </FormGroup>
                <Button type="submit" disabled={isLoading}>
                    {t("onboarding.register.button")}
                </Button>
            </form>
        </Container>
    );
};

export default RegisterScreen;
