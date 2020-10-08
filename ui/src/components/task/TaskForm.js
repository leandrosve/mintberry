import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container } from "bloomer/lib/layout/Container";
import { useTranslation } from "react-i18next";
import { Title } from "bloomer/lib/elements/Title";
import TextField from "../TextField";
import { FastField, Field, Form, Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import { Button } from "bloomer/lib/elements/Button";
import ImagePicker from "../util/ImagePicker";
import { Control } from "bloomer/lib/elements/Form/Control";
import TaskAvatar from "../util/TaskAvatar";
import { LevelLeft } from "bloomer/lib/components/Level/LevelLeft";
import { Level } from "bloomer/lib/components/Level/Level";
import { LevelRight } from "bloomer/lib/components/Level/LevelRight";
import DateTimePicker from 'react-datetime-picker';
import { Label } from "bloomer/lib/elements/Form/Label";
import i18n from "../../i18n";

const TaskForm = () => {
  const { t } = useTranslation();
  const [avatar, setAvatar] = useState(
    "https://www.freevector.com/uploads/vector/preview/28383/small_1x_Time_backgrounds_vector_3.jpg"
  );
  const [date, setDate] = useState(new Date());
  return (
    <Container>
      <Title>{t("actions.taskAdd")}</Title>
      <Formik
        validateOnChange
        validateOnMount
        initialValues={{
          title: "",
          description: "",
          avatar: "",
          expiracy: new Date(),
        }}
        validationSchema={Yup.object({
          title: Yup.string().required(t("fields.validation.required")),
          description: Yup.string(),
          avatar: Yup.string(),
          expiracy: Yup.date().required().min(new Date())
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log(JSON.stringify(values, null, 1));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({setFieldValue, isValid, ...formik}) => (
          <Form>
            <Control>
              <TaskAvatar src={avatar} alt="avatar" />
              <ImagePicker handlePick={(src) => {setAvatar(src); setFieldValue("avatar", src)}} />
              <Field
                type="hidden"
                name="avatar"
              />
            </Control>
            <TextField label={t("fields.title")} name="title" />
            <TextField label={t("fields.description")} name="description" />
            <Control className="field">
              <Label>{t("expiresAt")}</Label>
          <DateTimePicker locale={i18n.language} minDate={new Date()} className="input"  onChange={(value)=>setFieldValue("expiracy", value)} value={formik.getFieldMeta.expiracy.value}/>
          </Control>
            <Level>
              <LevelLeft />
              <LevelRight>
                <Button isColor="primary" disabled={!isValid} type="submit">
                  {t("actions.add")}
                </Button>
              </LevelRight>
            </Level>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

TaskForm.propTypes = {};

export default TaskForm;
