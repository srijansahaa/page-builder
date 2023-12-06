import React, { useCallback, useEffect, useState } from "react";
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
  const [isDragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x, y });

  const handleMouseDown = (e) => {
    setDragging(true);
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (isDragging) {
        setPosition({ x: e.clientX, y: e.clientY });
      }
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setDragging(false);
      onSaveConfig(id, { x: position.x, y: position.y });
    }
  }, [isDragging, id, onSaveConfig, position]);

  const handleElementClick = () => {
    setActiveElement(id);
  };

  const handleSaveConfigModal = (config) => {
    onSaveConfig(id, config);
    setActiveElement(null);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseUp, handleMouseMove]);

  return (
    <>
      <div
        className="elementWrapper"
        onMouseDown={handleMouseDown}
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
                  tabIndex={0}
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
