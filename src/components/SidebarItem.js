import React from "react";

export default function SidebarItem({ name, active, handleOptionIndex, showEdit }) {

  function handleClick() {
    handleOptionIndex();
    if(name === "Add text"){
      console.log("Add text clicked");
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
