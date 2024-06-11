import React, { FC } from 'react';
import { getValidationErrors } from './common';
import InputMask from 'react-input-mask';
import './FieldsStyles.scss';

export interface TextInputProps {
  field: string;
  mask?: string;
  label?: string;
  labelAfter?: string;
  type: string;
  value?: string;
  register:any;
  rules?: any;
  placeholder?: string;
  errors?: any;
  visible?: boolean;
  labelVisible?: boolean;
  maxLength?: string;
  minDate?: string;
  disabled?: boolean;
  onChange?: (e: any)=>void;
  onBlur?: (e: any)=>void;

  multiLine?: boolean;
  rows?: number;
  labelClass?: string;
  parentClass?: string;
  includeColon?: boolean;
  showIsRequired?: boolean;
  detailText?: string;
}

const TextField : FC<TextInputProps> = ({
  field,
  mask,
  label = "",
  labelAfter = null,
  type,
  value = null,
  register,
  rules = {},
  placeholder = "",
  errors = null,
  visible = true,
  labelVisible = true,
  maxLength = "",
  minDate,
  disabled = false,
  onChange = () => {},
  onBlur = () => {},
  multiLine = false,
  rows = 3,
  labelClass = "d-block",
  parentClass = "form-group",
  includeColon = true,
  showIsRequired = true,
  detailText = "",
}) => {

  const validationError = errors && getValidationErrors(errors, field, label, rules);

  const isRequired = () =>{
    return rules && rules.required;
  };

  const getRules = () => {
    if (!visible && rules) {
      rules["required"] = false;
    }
    return rules;
  };

  const getMultiLineControl = () => {
    return (
      <>
        <textarea
          placeholder={placeholder}
          value={value || undefined}
          type={type}
          rows={rows}
          disabled={disabled}
          className={validationError ? "form-control  invalid-control" : "form-control "}
          maxLength={maxLength}
          {...register(field, { ...getRules(), onChange: (e: any) => onChange?.(e), onBlur: (e: any) => onBlur?.(e) })}
        ></textarea>
        {detailText ? <p className="details">{detailText}</p> : null}
      </>
    );
  };

  const getMaskedInput = () => {
    return (
      <InputMask
        mask={mask}
        placeholder={placeholder}
        value={value || undefined}
        disabled={disabled}
        autoComplete="false"
        className={validationError ? 'form-control  invalid-control' : 'form-control '}
        {...register(field, { ...getRules(), onChange: (e: any) => onChange?.(e), onBlur: (e: any) => onBlur?.(e) })}
      />
    );
  };

  const getTextInput = () => {
    return (
      <input
        placeholder={placeholder}
        value={value || undefined}
        type={type}
        disabled={disabled}
        className={validationError ? "form-control  invalid-control" : "form-control "}
        maxLength={maxLength}
        min={minDate}
        {...register(field, { ...getRules(), onChange: (e: any) => onChange?.(e), onBlur: (e: any) => onBlur?.(e) })}
      />
    );
  };

  const getInputControl = () => {
    if (multiLine) return getMultiLineControl();

    if (mask) return getMaskedInput();

    return getTextInput();
  };

  return visible ? (
    <div className={parentClass}>
      {labelVisible && (
        <label className={labelClass}>
          {showIsRequired && isRequired() && <span className="required">*</span>}
          {label}
          {includeColon && ":"}
          {labelAfter}
        </label>
      )}

      {getInputControl()}
      {validationError}
    </div>
  ) : null;
};

export default TextField;
