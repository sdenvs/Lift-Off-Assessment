import React from "react";
import { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { Checkbox, Button, TextField } from "@mui/material";
import { GridCellEditCommitParams } from "@mui/x-data-grid";
import { faker } from "@faker-js/faker";

function EmployeeData() {
  const [isLoading, setIsLoading] = useState(true);
  const [employeeData, setEmployeeData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [SearchText, setSearchText] = useState("");

  const columns = [
    {
      field: "employee_id",
      headerName: "ID",
      flex: 1,
    },
    { field: "employee_name", headerName: "Name", flex: 1 },
    {
      field: "date_of_birth",
      headerName: "DOB",
      flex: 1,
      type: "date",
    },
    {
      field: "designation",
      headerName: "Designation",
      flex: 1,
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
      let employeeArray = [];
      for (let i = 1; i < 11; i++) {
        let Employee = {
          id: i,
          employee_id: i,
          employee_name: faker.name.findName(),
          date_of_birth: faker.date.betweens(
            "1990-01-01T00:00:00.000Z",
            "2000-01-01T00:00:00.000Z"
          ),
          designation: faker.name.jobTitle(),
        };
        employeeArray.push(Employee);
      }
      localStorage.setItem("employeeData", JSON.stringify(employeeArray));
      console.log(employeeArray);
      setEmployeeData(employeeArray);
      setIsLoading(false);
    }, 3000);
  }, []);

  const ChangeSearchText = (event) => {
    setSearchText(event.target.value);
  };

  const clearSearch = () => {
    setSearchText("");
  };

  const renderEmployes = () => {
    const FilteredList = employeeData.filter((eachItem) =>
      eachItem.employee_name.toLowerCase().includes(SearchText.toLowerCase())
    );
    return (
      <div>
        <div className="d-flex">
          <TextField
            onChange={ChangeSearchText}
            employee_id="outlined-basic"
            label="Search For Employee By Name"
            variant="outlined"
          />
          <div>
            <Button variant="contained" component="span" onClick={clearSearch}>
              Refresh
            </Button>
          </div>
        </div>

        <div style={{ width: "100%" }}>
          <DataGrid
            rows={FilteredList}
            columns={columns}
            editMode="row"
            autoHeight
            pageSize={10}
            pagination
            sx={{
              boxShadow: 2,
              border: 2,
              borderColor: "primary.light",
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
              },
            }}
          />
        </div>
      </div>
    );
  };

  const renderLoading = () => (
    <div>
      <TailSpin color="#00BFFF" height={80} width={80} />
    </div>
  );
  return <div>{isLoading ? renderLoading() : renderEmployes()}</div>;
}

export default EmployeeData;
