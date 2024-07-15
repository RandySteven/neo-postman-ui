import json5 from 'json5';
import React, { useState } from 'react';

const JsonTextarea = (jsonTextArea: JsonTextAreaProps) => {
    const [jsonInput, setJsonInput] = useState<string>('');

    const [formattedJson, setFormattedJson] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = event.target.value;
    setJsonInput(input);

    try {
      const parsedJson = json5.parse(input);
      setFormattedJson(JSON.stringify(parsedJson, null, 2));
      setError(null);
    } catch (e) {
      setFormattedJson(null);
      setError((e as Error).message);
    }
  };

  return (
    <div>
      <textarea
        name={jsonTextArea.name}
        className={jsonTextArea.className}
        value={jsonInput}
        onChange={handleChange}
        placeholder="Enter JSON here"
        rows={jsonTextArea.rows}
      />
      {formattedJson && (
        <div>
          <h3>Formatted JSON:</h3>
          <pre>{formattedJson}</pre>
        </div>
      )}
      {error && (
        <div style={{ color: 'red' }}>
          <h3>Error:</h3>
          <pre>{error}</pre>
        </div>
      )}
    </div>
  );
};

export default JsonTextarea;
