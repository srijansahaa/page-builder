import React, { useEffect, useState } from "react";
import Element from "./Element";

const Canvas = () => {
  const localElements = localStorage.getItem("storedElements");
  const [elements, setElements] = useState(
    JSON.parse(localStorage.getItem("storedElements")) || []
  );

  const [tempElements, setTempElement] = useState([]);

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

  const handleUndo = () => {
    const toRemove = elements.pop();
    setTempElement([...tempElements, toRemove]);
  };

  const handleRedo = () => {
    const toRemove = tempElements.pop();
    setElements([...elements, toRemove]);
  };

  useEffect(() => {
    setElements(JSON.parse(localStorage.getItem("storedElements")) || []);
  }, [localElements]);

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

      <div className="canvasActions">
        <button onClick={handleUndo} disabled={elements.length < 1}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#2d2d2d"
            viewBox="0 0 256 256"
          >
            <path d="M224,128a96,96,0,0,1-94.71,96H128A95.38,95.38,0,0,1,62.1,197.8a8,8,0,0,1,11-11.63A80,80,0,1,0,71.43,71.39a3.07,3.07,0,0,1-.26.25L44.59,96H72a8,8,0,0,1,0,16H24a8,8,0,0,1-8-8V56a8,8,0,0,1,16,0V85.8L60.25,60A96,96,0,0,1,224,128Z"></path>
          </svg>
        </button>
        <button onClick={handleRedo} disabled={tempElements.length < 1}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#2d2d2d"
            viewBox="0 0 256 256"
          >
            <path d="M240,56v48a8,8,0,0,1-8,8H184a8,8,0,0,1,0-16H211.4L184.81,71.64l-.25-.24a80,80,0,1,0-1.67,114.78,8,8,0,0,1,11,11.63A95.44,95.44,0,0,1,128,224h-1.32A96,96,0,1,1,195.75,60L224,85.8V56a8,8,0,1,1,16,0Z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Canvas;
