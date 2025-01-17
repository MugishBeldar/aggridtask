import React from "react"
import { DashboardInterface } from "../pages/Dashboard/Dashboard.interface";

interface AddProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAdd: React.Dispatch<React.SetStateAction<boolean>>;
  setRowData: [] | DashboardInterface[]
}
const Add = ({ setIsOpen, setIsAdd }: AddProps) => {
  return (
    <div className="add-container">
      <button className="add" onClick={() => { setIsOpen(prev => !prev); setIsAdd(true) }}>Add</button>
    </div>
  )
}

export default Add