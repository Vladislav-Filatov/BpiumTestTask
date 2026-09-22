import { useLayoutEffect, useRef } from "react";
import cn from "classnames";

import InputControl from "./InputControl.jsx";
import styles from "../styles.module.css";

function InputWithActions({
  wrapperClassName,
  className,
  style,
  actionsClassName,
  actions,
  type = "text",
  onEndEditing,
  allowTabs,
  onChange,
  readOnly,
  autoFocus,
  onKeyDown,
  ...inputProps
}) {
  const inputRef = useRef(null);
  const initialAutoFocusRef = useRef(autoFocus);
  const wasEditedRef = useRef(false);

  const handleCommit = nextValue => {
    wasEditedRef.current = true;
    onChange?.(nextValue);
  };

  const handleSetBlur = nextValue => {
    if (!wasEditedRef.current) return;
    wasEditedRef.current = false;
    onEndEditing?.(nextValue);
  };

  const handleKeyDown = event => {
    onKeyDown?.(event);

    if (
      !allowTabs ||
      event.defaultPrevented ||
      readOnly ||
      event.key !== "Tab" ||
      event.shiftKey ||
      event.ctrlKey ||
      event.altKey ||
      event.metaKey
    ) return;

    const target = event.target;
    if (!(target instanceof HTMLTextAreaElement) || target.readOnly || target.disabled) return;

    event.preventDefault();
    document.execCommand("insertText", false, "\t");
  };

  useLayoutEffect(() => {
    if (initialAutoFocusRef.current) inputRef.current?.focus();
  }, []);

  return (
    <div className={cn(styles.field, wrapperClassName)}>
      <div className={styles.control}>
        <InputControl
          {...inputProps}
          type={type}
          inputRef={inputRef}
          onValueChange={handleCommit}
          onCommit={handleSetBlur}
          onKeyDown={handleKeyDown}
          readOnly={readOnly}
          autoFocus={autoFocus}
          className={className}
          style={style}
        />
      </div>

      {actions?.length > 0 && (
        <ul className={cn(styles.actions, actionsClassName)}>
          {actions.map((node, index) => (
            <li key={index}>{node}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default InputWithActions;
