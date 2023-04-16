import React from "react";

export default function SidebarItem({ name, active, showEdit, setShowTextBox, setSelectedOptionIndex, index }) {

  function handleClick() {
    setSelectedOptionIndex(index);
    if(name === "Add text"){
      setShowTextBox(true);
    }
  }


  return (
    <>
      {showEdit && (
        <button
          className={`sidebar-item ${active ? "active" : ""}`}
          onClick={handleClick}
        >
          {name}
        </button>
      )}
    </>
  );
}
