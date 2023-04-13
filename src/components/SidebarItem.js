import React from 'react';

export default function SidebarItem({ name, active }) {
  return (
    <button className={`sidebar-item ${active ? "active" : ""}`} >{name}</button>
  )
}
