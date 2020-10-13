import React, { useState } from "react";
import PropTypes from "prop-types";
import DateTimePicker from "react-datetime-picker";
import { Control } from "bloomer/lib/elements/Form/Control";
import {  useField } from "formik";
import { Help } from "bloomer/lib/elements/Form/Help";
import { Label } from "bloomer/lib/elements/Form/Label";
import i18n from "../../i18n";
import { Field } from "bloomer/lib/elements/Form/Field/Field";
import useFieldDecorations from "../../hooks/useFieldDecorations";

const DateTimeField = ({ label, name }) => {
    const [field, meta, helpers] = useField(name);
    const [isActive, setIsActive] = useState(false);
    const [severity, help] = useFieldDecorations( meta, isActive);
  return (
    <Field >
      <Control>
        <Label>{label}</Label>
        <DateTimePicker
            onFocus={()=>setIsActive(true)}
            onBlur={()=>{setIsActive(false);helpers.setTouched(true)}}
          locale={i18n.language}
          minDate={new Date()}
          className={"input is-" + severity}
          value={field.value}
          onChange={(date)=>{helpers.setValue(date)}}
          disableClock
        />
        <Help isColor={severity}>{help}</Help>
      </Control>
    </Field>
  );
};

DateTimeField.propTypes = {
    label:PropTypes.string,
    name:PropTypes.string.isRequired,
};

export default DateTimeField;
