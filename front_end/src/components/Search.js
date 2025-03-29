import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_EMPLOYEES } from "../graphql/SearchQuery";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const EmployeeSearchComponent = () => {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");

  const [searchEmployees, { loading, data }] = useLazyQuery(SEARCH_EMPLOYEES);

  const handleSearch = () => {
    searchEmployees({
      variables: { searchInput: { FirstName, LastName } },
    });
  };

  return (
    <>
       <main class="insertbody">

      <div className="container">
    
      <div className="col-sm-4">
        <label style={{color:"#fff"}}>First Name:</label>
        <input
          type="text"
          className="form-control"
          value={FirstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <br></br> <br></br>
      <div className="col-sm-4">
        <label style={{color:"#fff"}}>Last Name:</label>
        <input
          type="text"
          value={LastName}
          className="form-control"
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <button onClick={handleSearch} className="btn btn-primary">
        Search
      </button>

      <br></br><br></br>
      {loading && <p>Help...</p>}
      {data && data.searchEmployees && (
        <EmployeeTable employees={data.searchEmployees} />
      )}
    </div>
   </main>

   <footer>
        <p>
          <em>&copy; Employee Information</em>{" "}
        </p>
      </footer>
   </>
  );
};

const EmployeeTable = ({ employees }) => {
  return (
    <table border={"5"} width={"100%"} class={"table table-striped "}>
      <thead>
        <tr class={"thead-dark"}>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Age</th>
          <th>Current Status</th>
          <th>Date of Joining</th>
          <th>Department</th>
          <th>Employee Type</th>
          <th>Title</th>
          <th>ID</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id} id="search_tr">
            <td>{employee.FirstName}</td>
            <td>{employee.LastName}</td>
            <td>{employee.Age}</td>
            <td>{employee.CurrentStatus}</td>
            <td>{employee.DateOfJoining.split("T")[0]}</td>
            <td>{employee.Department}</td>
            <td>{employee.EmployeeType}</td>
            <td>{employee.Title}</td>
            <td>{employee._id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeSearchComponent;
