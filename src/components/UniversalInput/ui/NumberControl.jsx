import { useLayoutEffect, useRef } from "react";
import { InputNumber } from "antd";

function NumberControl({
  value,
  onValueChange,
  onCommit,
  onBlur,
  prepareNumber,
  formatter,
  readOnly,
  inputRef,
  className,
  ...inputProps
}) {
  const latestValueRef = useRef(value);

  const handleChange = nextValue => {
    const preparedValue = prepareNumber ? prepareNumber(nextValue) : nextValue;
    latestValueRef.current = preparedValue;
    onValueChange?.(preparedValue);
  };

  const handleBlur = event => {
    if (!readOnly) onCommit?.(latestValueRef.current);
    onBlur?.(event);
  };

  const displayValue = value || value === 0 ? value : "";

  useLayoutEffect(() => {
    latestValueRef.current = value;
  }, [value]);

  if (readOnly) {
    return (
      <span className={className}>
        {formatter ? formatter(displayValue) : displayValue}
      </span>
    );
  }

  return (
    <InputNumber
      {...inputProps}
      ref={inputRef}
      className={className}
      formatter={formatter}
      value={displayValue}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
}

export default NumberControl;