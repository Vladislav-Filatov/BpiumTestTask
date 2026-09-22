import { Input } from "antd";
import MaskedInput from "react-input-mask";
import { formatCharsInput } from "../utils/maskFormat.js";
import { getPlaceHolderMask } from "../utils/getPlaceHolderMask.js";

function MaskedControl({
  value,
  mask,
  onValueChange,
  onCommit,
  onBlur,
  readOnly,
  disabled,
  inputRef,
  ...inputProps
}) {
  const emptyMask = getPlaceHolderMask(mask);

  const normalizeValue = nextValue =>
    nextValue === emptyMask ? "" : nextValue;

  const handleChange = () => {
    const input = inputRef.current?.input;
    if (!input) return;

    const nextValue = normalizeValue(input.value);
    const currentValue = normalizeValue(value ?? "");
    if (nextValue === currentValue) return;

    onValueChange?.(nextValue);
  };

  const handleBlur = event => {
    if (!readOnly) onCommit?.(normalizeValue(event.target.value));
    onBlur?.(event);
  };

  return (
    <MaskedInput
      {...inputProps}
      formatChars={formatCharsInput}
      mask={mask}
      placeholder={emptyMask}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      readOnly={readOnly}
      disabled={disabled}
    >
      {maskedInputProps => (
        <Input
          {...maskedInputProps}
          ref={inputRef}
          disabled={disabled}
          readOnly={readOnly}
        />
      )}
    </MaskedInput>
  );
}

export default MaskedControl;