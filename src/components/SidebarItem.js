import React from "react";

export default function SidebarItem({ name, active, handleOptionIndex, showEdit, setShowTextBox, setSelectedOptionIndex, index }) {

  function handleClick() {
    // handleOptionIndex();
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
