import React, { useEffect, useState } from 'react';
import { DashboardInterface } from '../pages/Dashboard/Dashboard.interface';

interface FlyOutProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRowData: React.Dispatch<React.SetStateAction<[] | DashboardInterface[]>>;
  rowData: [] | DashboardInterface[];
  editData: undefined | DashboardInterface;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit: boolean;
  isAdd: boolean;
  setIsAdd: React.Dispatch<React.SetStateAction<boolean>>;
}

const Flyout = ({ isOpen, setIsOpen, editData, setRowData, setIsEdit, isAdd, setIsAdd }: FlyOutProps) => {
  const [localEditData, setLocalEditData] = useState<DashboardInterface | undefined>(editData);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (isAdd) {
      setLocalEditData({} as DashboardInterface); // Reset to empty object when adding new data
    } else {
      setLocalEditData(editData); // Set the current data when editing
    }
  }, [editData, isAdd]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof DashboardInterface) => {
    if (localEditData) {
      setLocalEditData({
        ...localEditData,
        [field]: e.target.value,
      });
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!localEditData?.firstName) errors.firstName = 'First Name is required';
    if (!localEditData?.lastName) errors.lastName = 'Last Name is required';
    if (!localEditData?.dateOfBirth) errors.dateOfBirth = 'Date of Birth is required';
    if (!localEditData?.gender) errors.gender = 'Gender is required';
    if (!localEditData?.email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(localEditData.email)) errors.email = 'Email format is invalid';

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Returns true if no errors
  };

  const handleSave = () => {
    if (localEditData && validateForm()) {
      const fetchedData = localStorage.getItem('data');
      const parsedData = fetchedData ? JSON.parse(fetchedData) : [];

      if (isAdd) {
        let maxId = 0;
        for (let d of parsedData) {
          if (d.id > maxId) {
            maxId = d.id;
          }
        }
        // const newId = parsedData.length > 0 ? parsedData.reverse()[0].id + 1 : 1;
        localEditData.id = maxId + 1;
        const newData = [...parsedData, localEditData];
        localStorage.setItem('data', JSON.stringify(newData));
        setRowData(newData);
      } else {
        const updatedData = parsedData.map((item: DashboardInterface) =>
          item.id === localEditData.id ? localEditData : item
        );
        localStorage.setItem('data', JSON.stringify(updatedData));
        setRowData(updatedData);
      }

      setIsOpen(false);
      setIsEdit(false);
      setIsAdd(false);
    }
  };

  const handleCancel = () => {
    setLocalEditData(editData);
    setIsOpen(false);
    setIsEdit(false);
    setIsAdd(false);
  };

  return (
    <div className="flyout-container">
      <div className={`flyout ${isOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
          <div className="flyout-content" style={{ width: '100%' }}>
            <h2 className="flyout-title">{isAdd ? 'Add Data' : 'Edit Data'}</h2>
            <div className="form-container">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  value={localEditData?.firstName || ''}
                  onChange={(e) => handleChange(e, 'firstName')}
                  className="input-field"
                />
                {formErrors.firstName && <span className="error">{formErrors.firstName}</span>}
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  value={localEditData?.lastName || ''}
                  onChange={(e) => handleChange(e, 'lastName')}
                  className="input-field"
                />
                {formErrors.lastName && <span className="error">{formErrors.lastName}</span>}
              </div>
              <div className="form-group">
                <label>Date Of Birth</label>
                <input
                  type="text"
                  value={localEditData?.dateOfBirth || ''}
                  onChange={(e) => handleChange(e, 'dateOfBirth')}
                  className="input-field"
                />
                {formErrors.dateOfBirth && <span className="error">{formErrors.dateOfBirth}</span>}
              </div>
              <div className="form-group">
                <label>Gender</label>
                <input
                  type="text"
                  value={localEditData?.gender || ''}
                  onChange={(e) => handleChange(e, 'gender')}
                  className="input-field"
                />
                {formErrors.gender && <span className="error">{formErrors.gender}</span>}
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  value={localEditData?.email || ''}
                  onChange={(e) => handleChange(e, 'email')}
                  className="input-field"
                />
                {formErrors.email && <span className="error">{formErrors.email}</span>}
              </div>
              <div className="button-container">
                <button onClick={handleSave} className="save-button">Save</button>
                <button onClick={handleCancel} className="cancel-button">Cancel</button>
              </div>
            </div>
          </div>
          <div style={{ cursor: 'pointer' }}>
            <p onClick={handleCancel}>Close</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flyout;
