import React from "react";
import { Container } from "bloomer/lib/layout/Container";
import { Title } from "bloomer/lib/elements/Title";
import { Button } from "bloomer/lib/elements/Button";
import { Level } from "bloomer/lib/components/Level/Level";
import { LevelRight } from "bloomer/lib/components/Level/LevelRight";
import { LevelItem } from "bloomer/lib/components/Level/LevelItem";
import { LevelLeft } from "bloomer/lib/components/Level/LevelLeft";
import { Form, Formik } from "formik";
import TextField from "./TextField";
import Alert from "./layout/Alert";
import { openLoginForm } from "../redux/actions/modal";
import { useDispatch } from "react-redux";
import signupSchema from "../validations/signupSchema";
import { useTranslation } from "react-i18next";

const SignupForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return (
    <Formik
      validateOnChange
      validateOnMount
      {...signupSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isValid}) => (
        <Form>
          <Container>
            <Title className="has-text-centered" isSize={4}>
              {t("signup")}
            </Title>
            <Alert
              type="danger"            
              message={t("fields.validation.usernameTaken")}
            />
            <TextField label={t("fields.username")} type="text" name="username" />
            <TextField label={t("fields.name")} type="text" name="name" />
            <TextField
              label={t("fields.password")}
              type="password"
              name="password"
              help= {"*"+t("fields.validation.passwordWeak")}
            />
            <TextField
              label={t("fields.passwordConfirm")}
              type="password"
              name="passwordRepeat"
            />
            <Level>            
              <LevelRight>
                <LevelItem>
                  <Button isColor="primary" type="submit" disabled={!isValid}>
                  {t("signup")}
                  </Button>
                </LevelItem>
              </LevelRight>
              <LevelLeft>
                <LevelItem>
                  <Button
                    href="#login"
                    isColor="info"
                    onClick={() => dispatch(openLoginForm())}
                  >
                    {t("links.login")}
                  </Button>
                </LevelItem>
              </LevelLeft>
            </Level>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

SignupForm.propTypes = {};

export default SignupForm;
