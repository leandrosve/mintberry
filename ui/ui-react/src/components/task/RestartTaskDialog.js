import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Button } from "bloomer/lib/elements/Button";
import { Control } from "bloomer/lib/elements/Form/Control";
import { LevelLeft } from "bloomer/lib/components/Level/LevelLeft";
import { Level } from "bloomer/lib/components/Level/Level";
import { LevelRight } from "bloomer/lib/components/Level/LevelRight";
import DateTimeField from "../util/DateTimeField";
import { useDispatch, useSelector } from "react-redux";
import { selectTaskById } from "../../redux/reducers";
import { useTranslation } from "react-i18next";
import Modal from "../layout/Modal";
import { Title } from "bloomer/lib/elements/Title";
import { addTask } from "../../redux/actions/task";

const RestartTaskDialog = ({ id = -1, handleClose }) => {
  const task = useSelector((state) => selectTaskById(state, id) || {});
  const { t } = useTranslation();
  console.log("asdasdaaa");
  const dispatch = useDispatch();
  console.log({ task });
  return (
    <>
      <Modal
        isOpen={true}
        style={{ zIndex: "1100", maxWidth: "500px", overflow: "visible" }}
        hasFooter={false}
        handleClose={handleClose}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <Formik
            validateOnChange
            validateOnMount
            initialValues={{
              expiresAt: null,
            }}
            validationSchema={Yup.object({
              expiresAt: Yup.date()
                .typeError(t("fields.validation.pastDate"))
                .required(t("fields.validation.pastDate"))
                .min(new Date(), t("fields.validation.pastDate")),
            })}
            onSubmit={(values, { setSubmitting }) => {
              console.log({ values });
              setTimeout(() => {
                const data = {
                  title: task.title,
                  description: task.description,
                  image: task.image || undefined,
                  expiresAt: values.expiresAt,
                };
                console.log(data);
                dispatch(addTask(data));
                handleClose();
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ isValid }) => (
              <Form>
                <Title>{t("actions.taskRestart", {taskName:task.title})}</Title>
                <Control>
                  <DateTimeField name="expiresAt" label={t("expiracyDate")} />
                </Control>
                <Level isMobile>
                  <LevelLeft />
                  <LevelRight>
                    <Button isColor="info" onClick={handleClose}>
                      {t("confirmation.cancel")}
                    </Button>
                    <Button isColor="primary" type="submit" disabled={!isValid}>
                      {t("actions.add")}
                    </Button>
                  </LevelRight>
                </Level>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </>
  );
};

RestartTaskDialog.propTypes = {};

export default RestartTaskDialog;
