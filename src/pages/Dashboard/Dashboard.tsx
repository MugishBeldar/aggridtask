import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Add, ExportExcel, Flyout, Header, Search, Setting } from '../../components';
import { dashboardColumn, defaultColDef } from './Dashboard-column';
import { DashboardInterface } from './Dashboard.interface';
import { themeQuartz } from 'ag-grid-community';
import { data } from '../../utils';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [rowData, setRowData] = useState<DashboardInterface[] | []>([]);
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [columnVisibility, setColumnVisibility] = useState({
    email: true,
    gender: true,
    lastName: true,
  });
  const pagination = true;
  const theme = themeQuartz;
  const paginationPageSize = 10;
  const columns = dashboardColumn({ setIsOpen, setEditData, setIsEdit, setRowData });
  const paginationPageSizeSelector = [10, 15, 20];

  const onColumnVisibilityChange = (column: string) => {
    setColumnVisibility(prevState => ({
      ...prevState,
      [column]: !prevState[column],
    }));
  };

  const updatedColumns = columns.map(col => {
    if (col.field === 'email') {
      return { ...col, hide: !columnVisibility.email };
    } else if (col.field === 'gender') {
      return { ...col, hide: !columnVisibility.gender };
    } else if (col.field === 'lastName') {
      return { ...col, hide: !columnVisibility.lastName };
    }
    return col;
  });

  const onColumnVisible = (event: any) => {
    const updatedVisibility = { ...columnVisibility };
    const column = event.column;
    updatedVisibility[column.getColId()] = column.isVisible();
    setColumnVisibility(updatedVisibility);
  };

  useEffect(() => {
    const fetchedData = localStorage.getItem('data');
    if (JSON.parse(fetchedData) && JSON.parse(fetchedData).length > 1) {
      setRowData(JSON.parse(fetchedData));
    } else {
      localStorage.setItem('data', JSON.stringify(data));
      setRowData(JSON.parse(localStorage.getItem('data')))
    }
  }, []);

  return (
    <div className='dashboard-container'>
      <Flyout isOpen={isOpen} setIsOpen={setIsOpen} setRowData={setRowData} rowData={rowData} editData={editData} setIsEdit={setIsEdit} isEdit={isEdit} isAdd={isAdd} setIsAdd={setIsAdd} />
      <div>
        <div className='dashboard-header'>
          <Header />
        </div>
        <div className='dashboard-search-setting'>
          <div className="search">
            <Search setRowData={setRowData} rowData={rowData} />
          </div>
          <div className="setting">
            <Setting onColumnVisibilityChange={onColumnVisibilityChange} columnVisibility={columnVisibility} />
          </div>
        </div>
        <div className='dashboard-btn'>
          <div className='btn'>
            <Add setIsOpen={setIsOpen} setRowData={rowData} setIsAdd={setIsAdd} />
            <ExportExcel rowData={rowData} />
          </div>
        </div>
      </div>
      <div className='ag-grid-container'>
        <div className='ag-grid'>
          <AgGridReact
            // className={`${isLoading || rowData?.length === 0 ? "hidden" : ""} rtrtr`}
            // rowHeight={40}
            tooltipShowDelay={500}
            columnDefs={updatedColumns}
            defaultColDef={defaultColDef}
            // onGridReady={onGridReady}
            // rowModelType="infinite"
            rowData={rowData}
            theme={theme}
            onColumnVisible={onColumnVisible}
            // pagination
            pagination={pagination}
            paginationPageSize={paginationPageSize}
            paginationPageSizeSelector={paginationPageSizeSelector}
            // height
            // domLayout="autoHeight"
            domLayout="normal"

          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard