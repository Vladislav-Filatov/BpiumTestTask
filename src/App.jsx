import "./App.css";
import UniversalInput from "./components/UniversalInput";
import useLocalStorageState from "./hooks/useLocalStorageState.js";

const App = () => {
  const [numberValue, setNumberValue] = useLocalStorageState("form:number", null);
  const [textValue, setTextValue] = useLocalStorageState("form:text", "");
  const [textareaValue, setTextareaValue] = useLocalStorageState("form:multiline", "");
  const [maskedValue, setMaskedValue] = useLocalStorageState("form:masked", "");
  const [selectValue, setSelectValue] = useLocalStorageState("form:select", null);
  const [scriptValue, setScriptValue] = useLocalStorageState("form:script", "");

  return (
    <div className="main">
      <h1 className="title">THIS IS NOT A TEST TASK</h1>
      <div className="inputItems">
        <UniversalInput
          type="number"
          disabled={false}
          value={numberValue}
          onChange={setNumberValue}
          placeholder="Number type"
          style={{ width: "100%" }}
          className="inputItem"
        />
        <UniversalInput
          type="text"
          disabled={false}
          value={textValue}
          onChange={setTextValue}
          placeholder="Text type"
          style={{ width: "100%" }}
          className="inputItem"
        />
        <UniversalInput
          type="textarea"
          value={textareaValue}
          onChange={setTextareaValue}
          placeholder="Text multiline type"
          style={{ width: "100%" }}
          className="inputItem"
        />
        <UniversalInput
          type="masked"
          value={maskedValue}
          onChange={setMaskedValue}
          mask={"(111) 111"}
          placeholder="With mask"
          style={{
            width: "100%",
            backgroundColor: "white",
            color: "black",
            borderRadius: "15px",
          }}
          className="inputItem"
        />
        <UniversalInput
          type="select"
          value={selectValue}
          onChange={setSelectValue}
          options={[
            { value: "first element", label: "first element" },
            { value: "second element", label: "second element" },
            { value: "third element", label: "third element" }
          ]}
          placeholder="Another type"
          style={{
            width: "100%",
            backgroundColor: "white",
            color: "black",
            borderRadius: "15px",
          }}
          className="inputItem"
        />
        <UniversalInput
          type="script"
          value={scriptValue}
          onChange={setScriptValue}
          config={{ rows: 4 }}
          allowTabs
          placeholder="Введите код"
          style={{ width: "100%", fontFamily: "monospace" }}
          className="inputItem"
        />
        <UniversalInput
          type="custom"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
          className="inputItem"
        >
          <span>{textValue || "Текстовое поле пустое"}</span>
          <button
            type="button"
            disabled={!textValue}
            onClick={() => setTextValue("")}
          >
            Очистить текст
          </button>
        </UniversalInput>
      </div>
    </div>
  );
};

export default App;
