import React, { FunctionComponent } from "react";
import { getDescendent, getErrorElement, getValidationErrors } from "./common";

interface CheckboxProps {
  field: string;
  label: string;
  register: any;
  rules?: any;
  errors?: any;

  labelClass?: string;
  inputClass?: string;
  parentClass?: string;
}

const Checkbox: FunctionComponent<CheckboxProps> = ({
  field,
  label,
  register,
  rules = {},
  errors = {},
  labelClass = "form-check-label",
  inputClass = "form-check-input",
  parentClass = "form-group",
}) => {
  const validationError = getValidationErrors(errors, field, "", rules, "");
  return (
    <div className={parentClass}>
      <input className={inputClass} type="checkbox" {...register(field, { ...rules })} />
      <label className={labelClass}>{label}</label>
      {validationError}
    </div>
  );
};

export default Checkbox;

export interface CheckboxListItemProps {
  field: string;
  label: string;
}

export interface CheckboxListProps {
  items: CheckboxListItemProps[];
  getValues: any;
  register: any;
  rules?: any;
  errors?: any;
  isDirty?: boolean;


  labelClass?: string;
  inputClass?: string;
  parentClass?: string;
}

export const CheckboxList: FunctionComponent<CheckboxListProps> = ({
  items,
  getValues,
  register,
  rules = {},
  errors = {},
  isDirty = false,
  labelClass = "form-check-label",
  inputClass = "form-check-input",
  parentClass = "",
}) => {
  const oneRequiredValidation = () => {
    for (let i = 0; i < items.length; i++) {
      if (getValues(items[i].field)) return true;
    }

    return false;
  };

  const oneRequiredValidationError = () => {
    for (let i = 0; i < items.length; i++) {
      if (!getDescendent(errors, items[i].field)) return null;
    }
    return getErrorElement("Please select at least one option");
  };

  const allRequiredValidation = () => {
    if (!isDirty) return true;

    for (let i = 0; i < items.length; i++) {
      if (!getValues(items[i].field)) return false;
    }

    return true;
  }

  const allRequiredValidationError = () => {
    return allRequiredValidation() ? null : getErrorElement("All options must be selected");
  }


  let validationError = null;
  const validationRules = {} as any;
  if (rules.required || rules.oneRequired) {
    validationRules.validate = oneRequiredValidation;
    validationError = oneRequiredValidationError();
  }
  else if (rules.allRequired) {
    validationRules.validate = allRequiredValidation;
    validationError = allRequiredValidationError();
  }

  return (
    <>
      {items.map((x) => (
        <div key={x.field} className={parentClass}>
          <input className={inputClass} type="checkbox" {...register(x.field, validationRules)} />
          <label className={labelClass}>{x.label}</label>
        </div>
      ))}
      {validationError}
    </>
  );
};
