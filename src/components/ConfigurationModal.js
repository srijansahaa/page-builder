// ConfigurationModal.js
import React, { useEffect, useState } from "react";

const ConfigurationModal = ({ onSave, element }) => {
  const [config, setConfig] = useState({});

  useEffect(() => {
    setConfig({
      text: element.text || "",
      x: element.x || 0,
      y: element.y || 0,
      fontSize: element.fontSize || 12,
      fontWeight: element.fontWeight || "normal",
    });
  }, [element]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig((prevConfig) => ({ ...prevConfig, [name]: value }));
  };

  const handleSave = () => {
    onSave(config);
  };

  return (
    <div className="modalWrapper">
      <div className="overlay" />
      <div className="configModal">
        <h2>Edit {element.type}</h2>
        <label>
          Text
          <input
            type="text"
            name="text"
            value={config.text}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          X
          <input
            type="number"
            name="x"
            value={config.x}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Y
          <input
            type="number"
            name="y"
            value={config.y}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Font Size
          <input
            type="number"
            name="fontSize"
            value={config.fontSize}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Font Weight
          <input
            type="text"
            name="fontWeight"
            value={config.fontWeight}
            onChange={handleChange}
          />
        </label>
        <br />
        <button onClick={handleSave}>Save Changes</button>
      </div>
    </div>
  );
};

export default ConfigurationModal;
