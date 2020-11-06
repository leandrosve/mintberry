import React, { useState } from "react";
import { Container } from "bloomer/lib/layout/Container";
import { Title } from "bloomer/lib/elements/Title";
import { Button } from "bloomer/lib/elements/Button";
import { Level } from "bloomer/lib/components/Level/Level";
import { LevelRight } from "bloomer/lib/components/Level/LevelRight";
import { LevelItem } from "bloomer/lib/components/Level/LevelItem";
import { LevelLeft } from "bloomer/lib/components/Level/LevelLeft";
import { Form, Formik } from "formik";
import TextField from "./TextField";
import { useDispatch, useSelector } from "react-redux";
import { openRegisterForm } from "../redux/actions/modal";
import loginSchema from "../validations/loginSchema";
import { useTranslation } from "react-i18next";
import NotificationContainer from "../containers/NotificationContainer";
import { login } from "../redux/actions/session";
import { LOGIN_REQUEST, SIGNUP_REQUEST } from "../redux/actions/types";
import Spinner from "./util/Spinner";
import { selectIsRequestLoading } from "../redux/reducers";

const LoginForm = ({showSignupSuccess = true}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [canSubmit, setCanSubmit] = useState(true);
  const loading = useSelector(state => selectIsRequestLoading(state, LOGIN_REQUEST))
  return (
    <Formik
      validateOnChange
      validateOnMount
      {...loginSchema}
      onSubmit={(values) => {
        setCanSubmit(false);
        dispatch(login(values)); 
        setTimeout(()=>{setCanSubmit(true)},3000)            
      }}
    >
      {(formik) => (
        <Form>
          <Container>
            <Title className="has-text-centered" isSize={4}>
              {t("login")}
            </Title>
            <NotificationContainer concerns={[LOGIN_REQUEST, showSignupSuccess ? SIGNUP_REQUEST : undefined]}/>
            <Spinner isVisible={loading}/>
            <TextField
              label={t("fields.email")}
              type="email"
              name="email"
              isQuiet
            />
            <TextField
              label={t("fields.password")}
              type="password"
              name="password"
              isQuiet
            />
            <Level>
              <LevelLeft>
                <LevelItem>
                  <Button
                    isColor="info"
                    onClick={() => dispatch(openRegisterForm())}
                  >
                    {t("links.signup")}
                  </Button>
                </LevelItem>
              </LevelLeft>
              <LevelRight>
                <LevelItem>
                  <Button
                    isColor="primary"
                    type="submit"
                    disabled={!canSubmit || !formik.isValid }
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

export default React.memo(LoginForm);
