import React, { useState } from "react";
import { Container } from "bloomer/lib/layout/Container";
import { useTranslation } from "react-i18next";
import { Title } from "bloomer/lib/elements/Title";
import TextField from "../TextField";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Button } from "bloomer/lib/elements/Button";
import ImagePicker from "../util/ImagePicker";
import { Control } from "bloomer/lib/elements/Form/Control";
import TaskAvatar from "../util/TaskAvatar";
import { LevelLeft } from "bloomer/lib/components/Level/LevelLeft";
import { Level } from "bloomer/lib/components/Level/Level";
import { LevelRight } from "bloomer/lib/components/Level/LevelRight";
import DateTimeField from "../util/DateTimeField";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../redux/actions/task";
import imageList from "./imageList";
import { selectTaskById } from "../../redux/reducers";
import { openTaskDetail } from "../../redux/actions/modal";

const EditTaskForm = ({id}) => {
  const task = useSelector(state=>selectTaskById(state, id)|| {});
  const { t } = useTranslation();
  const [avatar, setAvatar] = useState(task.image);
  const dispatch = useDispatch();
  const [openImagePicker, setOpenImagePicker] = useState(false);
  return (
    <Container>
      <Title>{t("actions.taskEdit")}</Title>
      <Formik
        validateOnChange
        validateOnMount
        initialValues={{
          title: task.title,
          description: task.description,
          image: task.image,
          expiresAt: task.expiresAt,
        }}
        validationSchema={Yup.object({
          title: Yup.string().required(t("fields.validation.required")),
          description: Yup.string(),
          image: Yup.string(),
          expiresAt: Yup.date()
            .typeError(t("fields.validation.pastDate"))
            .required(t("fields.validation.pastDate"))
            .min(new Date(), t("fields.validation.pastDate")),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {         
            dispatch(addTask(values));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ setFieldValue, isValid }) => (
          <Form>
            <Control>
              <TaskAvatar src={avatar} alt="avatar" />
              <Button onClick={() => setOpenImagePicker(true)}>{t("actions.avatarChange")}</Button>
              <ImagePicker
                handlePick={(src) => {
                  setAvatar(src);
                  setFieldValue("image", src);
                }}
                handleClose={()=>setOpenImagePicker(false)}
                images={imageList}
                isOpen={openImagePicker}
              />
              <Field type="hidden" name="avatar" />
            </Control>
            <TextField label={t("fields.title")} name="title" />
            <TextField
              isQuiet
              label={t("fields.description")}
              name="description"
            />

            <DateTimeField name="expiresAt" label={t("expiracyDate")} />
            <Level>
              <LevelLeft />
              <LevelRight className="is-pulled-right">
                <Button className="mr-2" isColor="info" onClick={()=>dispatch(openTaskDetail(id))}>
                  {t("confirmation.cancel")}
                </Button>
                <Button isColor="primary" disabled={!isValid} type="submit">
                  {t("actions.save")}
                </Button>
              </LevelRight>
            </Level>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

EditTaskForm.propTypes = {};

export default EditTaskForm;
