import React from "react";
import { Container } from "bloomer/lib/layout/Container";
import { useTranslation } from "react-i18next";
import { Title } from "bloomer/lib/elements/Title";
import { Form, Formik } from "formik";
import TextField from "../TextField";
import storeSchema from "../../validations/storeSchema";
import { Level } from "bloomer/lib/components/Level/Level";
import { LevelLeft } from "bloomer/lib/components/Level/LevelLeft";
import { LevelRight } from "bloomer/lib/components/Level/LevelRight";
import { LevelItem } from "bloomer/lib/components/Level/LevelItem";
import { Button } from "bloomer/lib/elements/Button";

const StoreForm = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Title>{t("actions.storeAdd")}</Title>
      <Formik
        validateOnChange
        validateOnMount
        {...storeSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {(formik) => (
          <Form>
             <TextField name="name" type="text"label={t("fields.name")} />
             <TextField name="address" type="text"label={t("fields.address")} />
             <Level>
              <LevelLeft/>                   
              <LevelRight>
                <LevelItem>
                  <Button             
                    isColor="primary"
                    type="submit"
                    disabled={!formik.isValid}             
                  >
                    {t("actions.storeAdd")}
                  </Button>                 
                </LevelItem>
              </LevelRight>
            </Level>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

StoreForm.propTypes = {};

export default StoreForm;
