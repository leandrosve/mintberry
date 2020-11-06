import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Label } from "bloomer/lib/elements/Form/Label";
import { Control } from "bloomer/lib/elements/Form/Control";
import { Field as FormikField, useField } from "formik";
import { Field } from "bloomer/lib/elements/Form/Field/Field";
import { Help } from "bloomer/lib/elements/Form/Help";
import useFieldDecorations from "../hooks/useFieldDecorations";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const TextField = ({ label, type, name, placeholder, help, isQuiet=false }) => {
  const [field, meta, helpers] = useField(name);
  const [isActive, setIsActive] = useState(false);
  const [severity, error] = useFieldDecorations(meta, isActive)
  const {t} = useTranslation();
  return (
    <Field onFocus={() => setIsActive(true)} onBlur={() => setIsActive(false)}>
      <Label>{label}</Label>
      <Control>      
          <FormikField
            className={"input " + (!isQuiet && severity ? "is-" + severity : null)}           
            type={type}
            name={name}
            placeholder={placeholder}
          />       
        {!isQuiet && (error || help) && (
          <Help isColor={severity}>
            {(t(error)) || help}
          </Help>
        )}
      </Control>
    </Field>
  );
};

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  help: PropTypes.string,
  isQuiet: PropTypes.bool,
};

export default memo(TextField);
