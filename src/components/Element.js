import React from "react";
import ConfigurationModal from "./ConfigurationModal";

const Element = ({
  id,
  type,
  x,
  y,
  text,
  fontSize,
  fontWeight,
  onSaveConfig,
  isActive,
  setActiveElement,
  onDelete,
}) => {
  const handleElementClick = () => {
    setActiveElement(id);
  };

  const handleSaveConfigModal = (config) => {
    onSaveConfig(id, config);
    setActiveElement(null);
  };

  return (
    <>
      <div
        className="elementWrapper"
        onKeyDown={(e) =>
          e.key === "Enter"
            ? handleElementClick()
            : e.key === "Delete" || e.key === "Backspace"
            ? onDelete(id)
            : null
        }
      >
        {(() => {
          switch (type) {
            case "input":
              return (
                <input
                  className="customInput"
                  style={{
                    left: x + "px",
                    top: y + "px",
                    fontSize: fontSize + "px",
                    fontWeight: fontWeight,
                  }}
                  placeholder={text}
                />
              );
            case "label":
              return (
                <label
                  className="customLabel"
                  style={{
                    left: x + "px",
                    top: y + "px",
                    fontSize: fontSize + "px",
                    fontWeight: fontWeight,
                  }}
                  tabIndex={id.toString()}
                >
                  {text}
                </label>
              );
            case "button":
              return (
                <button
                  className="customButton"
                  style={{
                    left: x + "px",
                    top: y + "px",
                    fontSize: fontSize + "px",
                    fontWeight: fontWeight,
                  }}
                >
                  {text}
                </button>
              );
            default:
              return null;
          }
        })()}
      </div>
      {isActive && (
        <ConfigurationModal
          element={{ id, type, x, y, text, fontSize, fontWeight }}
          onSave={handleSaveConfigModal}
        />
      )}
    </>
  );
};

export default Element;
