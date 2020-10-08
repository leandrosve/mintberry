import React, { useState } from "react";
import PropTypes from "prop-types";
import { Label } from "bloomer/lib/elements/Form/Label";
import { Control } from "bloomer/lib/elements/Form/Control";
import { Field as FormikField, useField } from "formik";
import { Field } from "bloomer/lib/elements/Form/Field/Field";
import { Help } from "bloomer/lib/elements/Form/Help";

const TextField = ({ label, type, name, placeholder, help, isQuiet=false }) => {
  const [field, meta] = useField(name);
  const isEmpty = (field && field.value) ? field.value.length === 0 : true;
  const shouldDisplayError = meta && (meta.touched || !isEmpty) && meta.error;
  const [isActive, setIsActive] = useState(false);
  const severity = shouldDisplayError ? isActive ? "info" : "danger" : !isEmpty ? "success" : null;
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
        {!isQuiet && (shouldDisplayError || help) && (
          <Help isColor={severity}>
            {(shouldDisplayError && meta.error) || help}
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

export default TextField;
