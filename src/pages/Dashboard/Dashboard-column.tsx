// import React from "react";
import { ColDef } from 'ag-grid-community';
import { DashboardInterface } from './Dashboard.interface';
import { MdModeEditOutline } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import React from 'react';
const defaultColDef = {
  flex: 1,
  minWidth: 100,
  filter: true,
}
const dashboardColumn = ({ setIsOpen, setEditData, setIsEdit, setRowData }): ColDef<DashboardInterface>[] => {
  return [
    {
      headerName: 'First Name',
      // maxWidth: 100,
      field: 'firstName',
      suppressMovable: true,
      suppressHeaderMenuButton: true,
      onCellClicked: (event) => {
        setIsEdit(true)
        setIsOpen((prev: boolean) => {
          setEditData(event.data)
          return !prev
        })
      }
    },
    {
      headerName: 'Last Name',
      field: 'lastName',
      onCellClicked: (event) => {
        setIsEdit(true)
        setIsOpen((prev: boolean) => {
          setEditData(event.data)
          return !prev
        })
      }
    },
    {
      headerName: 'Gender',
      field: 'gender',
      onCellClicked: (event) => {
        setIsEdit(true)
        setIsOpen((prev: boolean) => {
          setEditData(event.data)
          return !prev
        })
      }
    },
    {
      headerName: 'Date of Birth',
      field: 'dateOfBirth',
      suppressMovable: true,
      suppressHeaderMenuButton: true,
      onCellClicked: (event) => {
        setIsEdit(true)
        setIsOpen((prev: boolean) => {
          setEditData(event.data)
          return !prev
        })
      }
    },
    {
      headerName: 'Email',
      field: 'email',
      onCellClicked: (event) => {
        setIsEdit(true)
        setIsOpen((prev: boolean) => {
          setEditData(event.data)
          return !prev
        })
      }
    },
    {
      headerName: 'Actions',
      suppressMovable: true,
      suppressHeaderMenuButton: true,
      cellRenderer: (data: any) => {
        if (data?.data) {
          return (
            <div style={{ display: 'flex', gap: '2rem' }}>
              <span
                style={{ cursor: 'pointer', color: 'blue', }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEdit(true)
                  setIsOpen((prev: boolean) => {
                    setEditData(data.data)
                    return !prev
                  })
                }}
              >
                <MdModeEditOutline size={20} />
              </span>
              <span
                style={{ cursor: 'pointer', color: 'red' }}
                onClick={(e) => {
                  e.stopPropagation();
                  let localStorageData = JSON.parse(localStorage.getItem('data'));
                  let filterData = localStorageData.filter((user: DashboardInterface) => {
                    return user.id !== data.data.id
                  })
                  setRowData(filterData);
                  localStorage.removeItem('data');
                  localStorage.setItem('data', JSON.stringify(filterData));
                }}
              >
                <FaTrashAlt/>
              </span>
            </div>
          );
        }
        return null;
      },
    }
  ]
}

export {
  dashboardColumn,
  defaultColDef
};