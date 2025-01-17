import React, { useState } from "react";
import { DashboardInterface } from "../pages/Dashboard/Dashboard.interface";

interface SearchProps {
  setRowData: React.Dispatch<React.SetStateAction<[] | DashboardInterface[]>>;
  rowData: DashboardInterface[]; // Added to get the original row data for filtering
}

const Search = ({ setRowData, rowData }: SearchProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter the row data based on the search query
    const filteredData = rowData.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase())
    );

    setRowData(filteredData);

    if (!query) {
      const response = JSON.parse(localStorage.getItem('data'))
      setRowData(response);
    }
  };

  return (
    <div className="search-container">
      <label>Search: </label>
      <input
        type="text"
        placeholder="Enter any text to filter."
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default Search;
