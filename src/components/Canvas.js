// Canvas.js
import React, { useState } from "react";
import Element from "./Element";

const Canvas = () => {
  const [elements, setElements] = useState(
    JSON.parse(localStorage.getItem("storedElements")) || []
  );

  const [activeElement, setActiveElement] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const elementType = e.dataTransfer.getData("text/plain");
    const newPosition = { x: e.clientX, y: e.clientY };
    const newElement = {
      id: elements.length + 1,
      type: elementType.toString(),
      text: "Add Text",
      fontSize: "16px",
      fontWeight: "light",
      ...newPosition,
    };
    setElements([...elements, newElement]);
    localStorage.setItem(
      "storedElements",
      JSON.stringify([...elements, newElement])
    );

    setActiveElement(newElement.id);
  };

  const handleDelete = (id) => {
    const afterDelete = elements.filter((element) => element.id !== id);
    setElements(afterDelete);
    localStorage.setItem("storedElements", JSON.stringify(afterDelete));
  };

  const handleSaveConfig = (elementId, config) => {
    const updatedElements = elements.map((element) =>
      element.id === elementId ? { ...element, ...config } : element
    );

    setElements(updatedElements);
    localStorage.setItem("storedElements", JSON.stringify(updatedElements));
  };

  return (
    <div
      className="canvas"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {elements.map((element, index) => (
        <Element
          key={index.toString()}
          {...element}
          onSaveConfig={handleSaveConfig}
          isActive={element.id === activeElement}
          setActiveElement={setActiveElement}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default Canvas;
