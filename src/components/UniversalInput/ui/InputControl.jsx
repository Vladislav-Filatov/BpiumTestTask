import cn from "classnames";

import CodeEditor from "./CodeEditor.jsx";
import NumberControl from "./NumberControl.jsx";
import SelectControl from "./SelectControl.jsx";
import MaskedControl from "./MaskedControl.jsx";
import TextControl from "./TextControl.jsx";
import maskIsValid from "../utils/maskValidator.js";

function InputControl({
  type,
  mask,
  options,
  prepareNumber,
  formatter,
  minRows,
  maxRows,
  config,
  children,
  ...inputProps
}) {

  switch (type) {
    case "number":
      return (
        <NumberControl
          {...inputProps}
          prepareNumber={prepareNumber}
          formatter={formatter}
        />
      );

    case "masked":
      return maskIsValid(mask)
        ? <MaskedControl {...inputProps} mask={mask} />
        : <TextControl {...inputProps} />;

    case "script": {
      const rows = typeof config?.get === "function"
        ? config.get("rows")
        : config?.rows;

      return <CodeEditor {...inputProps} rows={rows} />;
    }

    case "select":
      return <SelectControl {...inputProps} options={options ?? []} />;

    case "textarea":
      return (
        <TextControl
          {...inputProps}
          multiline
          minRows={minRows}
          maxRows={maxRows}
        />
      );

    case "custom":
      return (
        <div style={inputProps.style} className={cn("ant-input", inputProps.className)}>
          {children}
        </div>
      );

    case "text":
      return <TextControl {...inputProps} />;

    default:
      throw new Error(`Неизвестный type ${type}`);
  }
}

export default InputControl;