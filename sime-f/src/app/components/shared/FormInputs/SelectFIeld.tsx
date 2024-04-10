import { FC } from 'react';
import Select from 'react-select';
import { getValidationErrors } from './common';
import { Controller } from 'react-hook-form';

export interface SelectFieldProps {
  field: string;
  label: any;
  initialValue?: any;
  control: any;
  rules?: any;
  errors?: any;
  visible?: boolean;
  disabled?: boolean;
  valueKey?: string;
  labelKey?: string;
  placeHolder?: string;

  multiSelect?: boolean;
  canClear?: boolean;
  options: any[];
  labelClass?: string;
  parentClass?: string;
  includeColon?: boolean;
  controlClass?: string;
  showIsrequired?: boolean;

  onChange?: (value: any) => void;
}

const SelectField: FC<SelectFieldProps> = ({
  field,
  label,
  initialValue,
  control,
  rules = {},
  errors = null,
  visible = true,
  disabled = false,
  valueKey = 'value',
  labelKey = 'label',
  placeHolder = '',

  multiSelect = false,
  canClear = true,
  options = [],
  labelClass = 'd-block',
  includeColon = true,
  showIsrequired = true,
  parentClass = 'form-group select-form-group',
  controlClass = 'select',

  onChange = () => {},
}) => {
  const validationError = errors && getValidationErrors(errors, field, label, rules);

  const onChangeHandler = (value: any, formOnChange: any) => {
    if (multiSelect) {
      let settingVal = value.map((c: any) => c[valueKey]);
      formOnChange(settingVal);
    } else if (value) {
      formOnChange(value[valueKey]);
    } else formOnChange(null);

    onChange(value);
  };

  const isRequired = () => {
    return rules && rules.required;
  }

  const getRules = () => {
    if (!visible && rules) {
      rules['required'] = false;
    }
    return rules;
  };

  const getSelectedValues = (value: any) => {
    // check if value is array
    if (multiSelect &&  Array.isArray(initialValue)) {
      return options.filter((c: any) => initialValue.includes(c[valueKey]));
    }

    return options.find((c) => c[valueKey] === (value || initialValue));
  };

  return visible ? (
    <div className={parentClass}>
      <label className={labelClass}>
        {showIsrequired && isRequired() && <span className="required">*</span>}
        {label}
        {includeColon && ':'}
      </label>
      <Controller
        control={control}
        defaultValue={initialValue}
        name={field}
        rules={getRules()}
        render={({ field: { onChange, value, ref } }) => (
          <Select
            isDisabled={disabled}
            // inputRef={ref}
            placeholder={placeHolder}
            isClearable={canClear}
            isMulti={multiSelect}
            options={options}
            getOptionLabel={(option: any) => option[labelKey]}
            getOptionValue={(option: any) => option[valueKey]}
            className={validationError ? `${controlClass} invalid-control` : `${controlClass}`}
            value={getSelectedValues(value)}
            onChange={(val: any) => {
              onChangeHandler(val, onChange);
            }}
          />
        )}
      />
      {validationError}
    </div>
  ) : null;
};

export default SelectField;
