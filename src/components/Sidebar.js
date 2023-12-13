// Sidebar.js
import React, { useState } from "react";
import dragIcon from "../assets/grip-vertical.svg";
import ImportModal from "./ImportModal";

const Sidebar = () => {
  const [openImport, setOpenImport] = useState(false);

  const handleExport = () => {
    const jsonData = localStorage.getItem("storedElements");

    const blob = new Blob([jsonData], { type: "application/json" });

    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "config.json";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleDragStart = (e, type) => {
    e.dataTransfer.setData("text/plain", type);
  };

  return (
    <>
    <div className="sidebar">
      <div>
        <h1>BLOCKS</h1>
        <div className="sidebarElementsWrapper">
          <div
            className="sidebarElements"
            draggable
            onDragStart={(e) => handleDragStart(e, "input")}
          >
            <img src={dragIcon} alt="drag-icon" width={11} height={18} />
            Input
          </div>
          <div
            className="sidebarElements"
            draggable
            onDragStart={(e) => handleDragStart(e, "label")}
          >
            <img src={dragIcon} alt="drag-icon" width={11} height={18} />
            Label
          </div>
          <div
            className="sidebarElements"
            draggable
            onDragStart={(e) => handleDragStart(e, "button")}
          >
            <img src={dragIcon} alt="drag-icon" width={11} height={18} />
            Button
          </div>
        </div>
      </div>

      <div className="sidebarActions">
        <button
          className="exportButton"
          aria-label="Export Config"
          onClick={() => setOpenImport(true)}
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
        <button
          onClick={handleExport}
          className="exportButton"
          aria-label="Export Config"
        >
          Export
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
    {
      openImport && <ImportModal setOpenImport={setOpenImport}/>
    }
    </>
  );
};

export default Sidebar;
