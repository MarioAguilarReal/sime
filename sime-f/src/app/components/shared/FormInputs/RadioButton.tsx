import { FunctionComponent } from "react";
import { getValidationErrors } from "./common";

export interface RadioButtonProps {
  field: string;
  label: string;
  value: any;
  register: any;
  rules?: any;
  errors?: any;

  labelClass?: string;
  inputClass?: string;
  parentClass?: string;
  onChange?: (e: any) => void;
}

const RadioButton: FunctionComponent<RadioButtonProps> = ({
  field,
  label,
  value,
  register,
  rules = {},
  errors = {},
  labelClass = "form-check-label",
  inputClass = "form-check-input",
  parentClass = "form-check radio-element",
  onChange
}) => {
  const validationError = getValidationErrors(errors, field, "Please select an option", rules, "");
  return (
    <div className={parentClass}>
      <input className={inputClass} type="radio" value={value} {...register(field, { ...rules, onChange: (e: any) => onChange?.(e) })} />
      <label className={labelClass}>{label}</label>
      {validationError}
    </div>
  );
};

export default RadioButton;
