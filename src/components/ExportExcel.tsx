import React from "react"
import * as XLSX from "xlsx";
import { DashboardInterface } from "../pages/Dashboard/Dashboard.interface";
interface ExportExcelProps {
  rowData: [] | DashboardInterface[]
}
const ExportExcel = ({ rowData }: ExportExcelProps) => {
  const handleExport = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(rowData);
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    const currentDate = new Date().toISOString().split('T')[0];
    const fileName = `${currentDate}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };
  return (
    <div className='exportexcel-container'>
      <button className="exportexcel" onClick={handleExport}>Export to Excel</button>
    </div>
  )
}

export default ExportExcel