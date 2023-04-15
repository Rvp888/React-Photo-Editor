import React from "react";

export default function SidebarItem({ name, active, handleOptionIndex, showEdit, setShowTextBox }) {

  function handleClick() {
    handleOptionIndex();
    if(name === "Add text"){
      // console.log("Add text clicked");
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
