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
import { useDispatch } from "react-redux";
import { openRegisterForm } from "../redux/actions/modal";
import loginSchema from "../validations/loginSchema";
import { useTranslation } from "react-i18next";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return (
    <Formik
      validateOnChange
      validateOnMount
      {...loginSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {(formik) => (
        <Form>
          <Container>
            <Title className="has-text-centered" isSize={4}>
              {t("login")}
            </Title>           
            <Alert type="success" message={t("success.signup")}/>
            <TextField label={t("fields.username")} type="text" name="username" isQuiet/>
            <TextField label={t("fields.password")} type="password" name="password" isQuiet/>
            <Level>
              <LevelLeft>
                <LevelItem>
                  <Button href="#register" isColor="info" onClick={()=>dispatch(openRegisterForm())}>
                  {t("links.signup")}
                  </Button>
                </LevelItem>
              </LevelLeft>
              <LevelRight>
                <LevelItem>
                  <Button               
                    isColor="primary"
                    type="submit"
                    disabled={!formik.isValid}             
                  >
                    {t("login")}
                  </Button>                 
                </LevelItem>
              </LevelRight>
            </Level>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
