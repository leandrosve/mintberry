import React, { useState } from "react";
import { Container } from "bloomer/lib/layout/Container";
import { Title } from "bloomer/lib/elements/Title";
import { Button } from "bloomer/lib/elements/Button";
import { Level } from "bloomer/lib/components/Level/Level";
import { LevelRight } from "bloomer/lib/components/Level/LevelRight";
import { LevelItem } from "bloomer/lib/components/Level/LevelItem";
import { LevelLeft } from "bloomer/lib/components/Level/LevelLeft";
import { Form, Formik } from "formik";
import TextField from "../TextField";
import { openLoginForm } from "../../redux/actions/modal";
import { useDispatch, useSelector } from "react-redux";
import signupSchema from "../../validations/signupSchema";
import { useTranslation } from "react-i18next";
import { SIGNUP_REQUEST } from "../../redux/actions/types";
import NotificationContainer from "../../containers/NotificationContainer";
import { signup } from "../../redux/actions/user";
import { selectIsRequestLoading } from "../../redux/reducers";
import Spinner from "../util/Spinner";

const SignupForm = ({showNotifications=true}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [canSubmit, setCanSubmit] = useState(true);
  const loading = useSelector(state=>selectIsRequestLoading(state, SIGNUP_REQUEST));
  return (
    <Formik
      validateOnChange
      validateOnMount
      {...signupSchema}
      onSubmit={(values) => {
        setCanSubmit(false);
        dispatch(signup(values));
        setTimeout(setCanSubmit(true), 2000);
      }}
    >
      {({ isValid }) => (
        <Form>
          <Container>
            <Title className="has-text-centered" isSize={4}>
              {t("signup")}
            </Title>
            {showNotifications &&
              <>
                <NotificationContainer
                  concerns={[SIGNUP_REQUEST]}
                  onlyErrors={true}
                />
                <Spinner isVisible={loading}/>
              </>
            }
            <TextField
              label={t("fields.username")}
              type="text"
              name="username"
            />
            <TextField label={t("fields.email")} type="email" name="email" />
            <TextField
              label={t("fields.password")}
              type="password"
              name="password"
              help={"*" + t("fields.validation.passwordWeak")}
            />
            <TextField
              label={t("fields.passwordConfirm")}
              type="password"
              name="passwordConfirmation"
            />
            <Level>
              <LevelRight>
                <LevelItem>
                  <Button
                    isColor="info"
                    onClick={() => dispatch(openLoginForm())}
                    className="m-2"
                  >
                    {t("links.login")}
                  </Button>
                </LevelItem>
              </LevelRight>
              <LevelLeft>
                <LevelItem>
                  <Button
                    isColor="primary"
                    type="submit"
                    className="m-2"
                    disabled={!canSubmit || !isValid}
                  >
                    {t("signup")}
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
