import { Select } from "antd";
import cn from "classnames";
import filterSelectOption from "../utils/filterSelectOption.js";
import styles from "../styles.module.css";

const { Option, OptGroup } = Select;

function renderOption(option) {
  return (
    <Option
      key={option.value}
      value={option.value}
      label={option.label}
    >
      {option.label}
      {option.subLabel && (
        <span className={styles.optionSubLabel}>
          {option.subLabel}
        </span>
      )}
    </Option>
  );
}

function SelectControl({
  value,
  options,
  onValueChange,
  onCommit,
  onBlur,
  onKeyDown,
  readOnly,
  disabled,
  inputRef,
  className,
  style,
  ...inputProps
}) {
  const valueInOptions = options.some(option => {
    if (Array.isArray(option.options)) {
      return option.options.some(item => item.value === value);
    }
    return option.value === value;
  });

  const hasValue =
    value !== undefined && value !== null && value !== "";

  const handleBlur = event => {
    if (!readOnly) {
      onCommit?.(value);
    }
    onBlur?.(event);
  };

  const handleChange = nextValue => {
    onValueChange?.(nextValue ?? null);
  };

  return (
    <Select
      {...inputProps}
      ref={inputRef}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      onInputKeyDown={onKeyDown}
      disabled={disabled || readOnly}
      className={cn(className, {
        [styles.invalidValue]: hasValue && !valueInOptions,
      })}
      style={{ width: "100%", ...style }}
      showSearch={true}
      variant="borderless"
      suffixIcon={null}
      popupMatchSelectWidth={300}
      filterOption={filterSelectOption}
    >
      {options.map(option => {
        if (Array.isArray(option.options)) {
          return (
            <OptGroup key={option.value} label={option.label}>
              {option.options.map(renderOption)}
            </OptGroup>
          );
        }
        return renderOption(option);
      })}
    </Select>
  );
}

export default SelectControl;