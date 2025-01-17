// import { EuiIcon } from '@elastic/eui'
import React, { useState } from 'react'
import { FaEye, FaEyeSlash, FaGear } from "react-icons/fa6"

interface SettingProps {
  onColumnVisibilityChange: (column: string) => void;
  columnVisibility: {
    email: boolean;
    gender: boolean;
    lastName: boolean;
  }
}

const Setting = ({ onColumnVisibilityChange, columnVisibility }: SettingProps) => {
  const [openSetting, setOpenSetting] = useState<boolean>(false);
  const handleSetting = () => {
    setOpenSetting(prev => !prev);
  }

  return (
    <div className='setting-container'>
      <div className='setting' onClick={handleSetting}>
        <FaGear />
        <p>View Settings</p>
      </div>
      {
        openSetting &&
        <div className='setting-option'>
          <p onClick={() => onColumnVisibilityChange('lastName')} style={{ display: 'flex', gap: '5px', padding: '15px 5px 0 5px' }}>
            {columnVisibility.lastName ? <FaEye /> : <FaEyeSlash />} <p>Last Name</p>
          </p>
          <p onClick={() => onColumnVisibilityChange('email')} style={{ display: 'flex', gap: '5px', padding: '15px 5px 0 5px' }}>
            {columnVisibility.email ? <FaEye /> : <FaEyeSlash />} <p>Email</p>
          </p>
          <p onClick={() => onColumnVisibilityChange('gender')} style={{ display: 'flex', gap: '5px', padding: '15px 5px 10px 5px' }}>
            {columnVisibility.gender ? <FaEye /> : <FaEyeSlash />} <p>Gender</p>
          </p>
        </div>
      }

    </div>
  )
}

export default Setting