import { useCallback, useState } from "react";
import "./styles.css";
import { sanitizeJsonInput } from "./utils";
import { SchemaType } from "./types";
import { IconPhantomLogo } from "./icons";

type JsonType = "success" | "error" | "invalid";

export default function App() {
  const [jsonInput, setJsonInput] = useState<string>("");
  const [validationMessage, setValidationMessage] = useState<{
    type: JsonType;
    message: string;
  }>({ type: "invalid", message: "" });
  const sanitizedJson = sanitizeJsonInput(jsonInput);

  const handleValidation = useCallback(() => {
    try {
      const parsedJson = JSON.parse(sanitizedJson);
      const shortcut = SchemaType.safeParse(parsedJson);
      if (shortcut.success) {
        setValidationMessage({
          type: "success",
          message: "SUCCESS: JSON adheres to Shortcut schema",
        });
      } else {
        setValidationMessage({
          type: "error",
          message: `ERROR: ${shortcut.error.message}`,
        });
      }
    } catch (err) {
      console.error(err);
      setValidationMessage({
        type: "invalid",
        message: "INVALID JSON: Please fix your JSON and try again",
      });
    }
  }, [jsonInput]);

  const handleFormat = useCallback(() => {
    try {
      const parsedJson = JSON.parse(sanitizedJson);
      const formatted = JSON.stringify(parsedJson, null, 2);
      setJsonInput(formatted);
    } catch (err) {
      console.error(err);
      setValidationMessage({
        type: "invalid",
        message: "INVALID JSON: Cannot format",
      });
    }
  }, [jsonInput]);

  const handleClear = useCallback(() => {
    setJsonInput("");
    setValidationMessage({ type: "invalid", message: "" });
  }, []);

  return (
    <div className="App">
      <div className="header">
        <div className="header-icon">
          <IconPhantomLogo width={72} />
        </div>
        <h1>Wallet Shortcuts JSON Validator</h1>
      </div>
      <textarea
        rows={16}
        cols={50}
        value={jsonInput}
        onChange={(e) => {
          setJsonInput(e.target.value);
        }}
        placeholder="Paste your JSON here..."
      />
      <div>
        <button onClick={handleValidation}>Validate</button>
        <button onClick={handleFormat}>Format</button>
        <button onClick={handleClear}>Clear</button>
      </div>
      <br />
      <div className={`validation-message ${validationMessage.type}`}>
        {validationMessage.message}
      </div>
    </div>
  );
}
