import { useCallback, useState } from "react";
import "./styles.css";
import { sanitizeJsonInput } from "./utils";
import { ShortcutType } from "./types";

export default function App() {
  const [jsonInput, setJsonInput] = useState<string>("");
  const [validationMessage, setValidationMessage] = useState<string>("");
  const sanitizedJson = sanitizeJsonInput(jsonInput);

  const handleValidation = useCallback(() => {
    try {
      const parsedJson = JSON.parse(sanitizedJson);
      const shortcut = ShortcutType.safeParse(parsedJson);
      if (shortcut.success) {
        setValidationMessage("Valid JSON adhering to Shortcut schema");
      } else {
        setValidationMessage(`Invalid schema: ${shortcut.error.message}`);
      }
    } catch (err) {
      console.error(err);
      setValidationMessage("Invalid JSON, please try again");
    }
  }, [jsonInput]);

  const handleFormat = useCallback(() => {
    try {
      const parsedJson = JSON.parse(sanitizedJson);
      const formatted = JSON.stringify(parsedJson, null, 2);
      setJsonInput(formatted);
    } catch (err) {
      console.error(err);
      setValidationMessage("Invalid JSON, cannot format");
    }
  }, [jsonInput]);

  return (
    <div className="App">
      <h1>Wallet Shortcuts JSON Validator</h1>
      <textarea
        rows={10}
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
      </div>
      <br />
      <div style={{ color: "purple" }}>{validationMessage}</div>
    </div>
  );
}
