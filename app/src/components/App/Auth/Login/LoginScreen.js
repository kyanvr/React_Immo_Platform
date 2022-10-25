import useForm from "../../../../core/hooks/useForm";
import useMutation from "../../../../core/hooks/useMutation";
import Alert from "../../../Design/Alert";
import Button from "../../../Design/Buttons/Button";
import Container from "../../../Design/Container";
import FormGroup from "../../../Design/Form/FormGroup";
import Input from "../../../Design/Form/Input";
import Label from "../../../Design/Form/Label";
import { useAuthContext } from "../AuthProvider";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import useTitle from "../../../../core/hooks/useTitle";

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

const defaultData = {
    email: "",
    password: "",
};

const LoginScreen = () => {
    const { t } = useTranslation();
    const { login } = useAuthContext();
    const { isLoading, error, mutate } = useMutation();

    useTitle("Login");

    const { values, errors, handleChange, handleSubmit } = useForm(schema, {
        ...defaultData,
    });

    const handleData = (values) => {
        mutate(`${process.env.REACT_APP_API_URL}/login`, {
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
            <h1>{t("onboarding.login.title")}</h1>
            <form onSubmit={handleSubmit(handleData)} noValidate={true}>
                {error && <Alert color="danger">{error}</Alert>}
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
                    {t("onboarding.login.button")}
                </Button>
            </form>
        </Container>
    );
};

export default LoginScreen;
