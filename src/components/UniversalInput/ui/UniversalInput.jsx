import { useState } from "react";
import cn from "classnames";

import InputWithActions from "./InputWithActions.jsx";
import styles from "../styles.module.css";

function UniversalInput({
  updateProcess,
  eventable,
  actions,
  onEndEditing,
  onChange,
  ...props
}) {
  const [shouldProcess, setShouldProcess] = useState(false);

  const handleOnChange = value => {
    onChange?.(value);
    if (eventable) setShouldProcess(true);
  };

  const handleOnEndEditing = value => {
    onEndEditing?.(value);
    setShouldProcess(false);
  };

  const inProcess = updateProcess?.get("inProcess");
  const newActions = [...(actions || [])];

  if (shouldProcess || inProcess) {
    newActions.push(
      <span
        className={cn(styles.actionIcon, inProcess && styles.actionIconGray)}
        title={inProcess ? "" : "ready to send"}
      >
      </span>
    );
  }

  return (
    <InputWithActions
      {...props}
      onEndEditing={handleOnEndEditing}
      onChange={handleOnChange}
      actions={newActions}
    />
  );
}

export default UniversalInput;
