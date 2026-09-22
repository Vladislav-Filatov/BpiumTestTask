import { Input } from "antd";

const { TextArea } = Input;

function CodeEditor({
  value,
  onValueChange,
  onCommit,
  onFocus,
  onBlur,
  inputRef,
  className,
  style,
  rows = 4,
  readOnly,
  disabled,
  placeholder,
  onKeyDown,
  ...inputProps
}) {

  const handleChange = event => {
    onValueChange?.(event.target.value);
  };

  const handleBlur = event => {
    if (!readOnly) onCommit?.(event.target.value);
    onBlur?.(event);
  };

  return (
    <TextArea
      {...inputProps}
      ref={inputRef}
      rows={rows}
      value={value ?? ""}
      onChange={handleChange}
      onFocus={onFocus}
      onBlur={handleBlur}
      className={className}
      style={style}
      readOnly={readOnly}
      disabled={disabled}
      placeholder={placeholder}
      onKeyDown={onKeyDown}
    />
  );
}

export default CodeEditor;
