import { Input } from "antd";

function TextControl({
  value,
  onValueChange,
  onCommit,
  onBlur,
  readOnly,
  inputRef,
  multiline = false,
  minRows = 1,
  maxRows = 20,
  ...inputProps
}) {
  const handleChange = event => {
    onValueChange?.(event.target.value);
  };

  const handleBlur = event => {
    if (!readOnly) onCommit?.(event.target.value);
    onBlur?.(event);
  };

  const Control = multiline ? Input.TextArea : Input;

  const multilineProps = multiline
    ? {
      rows: 4,
      spellCheck: false,
      autoSize: {
        minRows: readOnly ? 1 : minRows,
        maxRows,
      },
    }
    : {};

  return (
    <Control
      {...inputProps}
      {...multilineProps}
      ref={inputRef}
      value={value ?? ""}
      readOnly={readOnly}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
}

export default TextControl;