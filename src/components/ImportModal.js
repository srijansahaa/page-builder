import React, { useState } from "react";

const ImportModal = ({ setOpenImport }) => {
  const [jsonInput, setJsonInput] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);

    try {
      JSON.parse(e.target.value);
      setIsValid(true);
    } catch (error) {
      setIsValid(false);
    }
  };

  const handleImport = () => {
    localStorage.setItem(
      "storedElements",
      jsonInput.length > 0 ? jsonInput : JSON.stringify([])
    );
    setOpenImport(false);
    window.location.reload();
  };

  return (
    <div className="modalWrapper">
      <div className="overlay" />
      <div className="configModal">
        <textarea
          placeholder="Paste or type JSON data here"
          onChange={handleInputChange}
        />
        {!isValid && <p className="validation">Enter a Valid JSON</p>}
        <button
          className="exportButton"
          aria-label="Export Config"
          onClick={handleImport}
          disabled={!isValid && jsonInput.length > 0}
          style={{ marginTop: "20px" }}
        >
          Import
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#ffffff"
            viewBox="0 0 256 256"
          >
            <path d="M216,112v96a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V112A16,16,0,0,1,56,96H80a8,8,0,0,1,0,16H56v96H200V112H176a8,8,0,0,1,0-16h24A16,16,0,0,1,216,112ZM93.66,69.66,120,43.31V136a8,8,0,0,0,16,0V43.31l26.34,26.35a8,8,0,0,0,11.32-11.32l-40-40a8,8,0,0,0-11.32,0l-40,40A8,8,0,0,0,93.66,69.66Z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ImportModal;
