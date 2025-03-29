import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { GET_ALL_EMPLOYEES } from "../graphql/Quries";
import { Link } from 'react-router-dom';
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function DisplayEmp() {
  const [selectedEmployeeType, setSelectedEmployeeType] = useState("All");
  const { loading, error, data } = useQuery(GET_ALL_EMPLOYEES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const setData = (Employee) => {

    let{_id,Age,
      CurrentStatus,
      Retirement,
      DateOfJoining,
      Department,
      EmployeeType,
      FirstName,
      LastName,
      Title } = Employee
    console.log(_id)
    localStorage.setItem('_id', _id);
    localStorage.setItem('Age', Age);
    localStorage.setItem('CurrentStatus', CurrentStatus);
    localStorage.setItem('Retirement', Retirement);
    localStorage.setItem('DateOfJoining', DateOfJoining);
    localStorage.setItem('Department',  Department)
    localStorage.setItem('EmployeeType', EmployeeType)
    localStorage.setItem('FirstName', FirstName)
    localStorage.setItem('LastName', LastName)
    localStorage.setItem('Title ', Title )
}


const calculateRetirement = (Employee) => {
  const employeeAge = parseInt(Employee.Age);

  if (employeeAge === 64) {
    return 'Retirement in 6 months';
  } 
  else if (employeeAge > 64){
    return 'Retirement in 1 months';
  }else {
    return 'Retirement coming soon';
  }
};


  const employeeTypes = ["All", "FullTime", "PartTime", "Contract", "Seasonal"];

  const filteredEmployees = selectedEmployeeType === 'All'
    ? data.getAllEmployees
    : data.getAllEmployees.filter(employee => employee.EmployeeType === selectedEmployeeType);

    const filteredEmployeesWithRetirement = filteredEmployees.filter((employee)=>{
      

      if(employee.Retirement === 'Retirement in 6 months'){
        return employee.EmployeeType === selectedEmployeeType;
      }
      return true;
    })

    .map((Employee) => ({
      ...Employee,
      Retirement: calculateRetirement(Employee),
    }));

  return (
    <>
      <main class="insertbody">
        <div className="container">
          <div className="col-sm-6" style={{margin:"0px auto", marginBottom:"20px"}}>
            <label htmlFor="employeeType" style={{color:"#fff"}}>Filter by Employee Type:</label>
          <select
            id="employeeType"
            className="col-sm-6"
            value={selectedEmployeeType}
            onChange={(e) => setSelectedEmployeeType(e.target.value)}
          >
            {employeeTypes.map((type) => (
              <option key={type} value={type}>
                {type === 'All' ? 'All Employees' : type + ' Employee'}
              </option>
            ))}
          </select></div>
        

          <table border={"5"} width={"100%"} class={"table table-striped "}>
            <tbody>
              <tr class={"thead-dark"}>
                <th>ID</th>
                <th>FIRST NAME</th>
                <th>LAST NAME</th>
                <th>AGE</th>
                <th>DATE OF JOINING</th>
                <th>TITLE</th>
                <th>DEPARTMENT</th>
                <th>EMPLOYEE TYPE</th>
                <th>CURRENT STATUS</th>
                <th>RETIREMENT</th>
                <th>UPDATE</th>
                <th>DELETE</th>
              </tr>

              {filteredEmployeesWithRetirement.map((Employee) => (
                <tr key={Employee._id}>
                  <td>{Employee._id}</td>
                  <td>{Employee.FirstName}</td>
                  <td>{Employee.LastName}</td>
                  <td>{Employee.Age}</td>

                  <td>{Employee.DateOfJoining.split("T")[0]}</td>

                  <td>{Employee.Title}</td>
                  <td>{Employee.Department}</td>
                  <td>{Employee.EmployeeType}</td>
                  <td>{Employee.CurrentStatus ? "Active" : "Not Active"}</td>
                  <td>{Employee.Retirement}</td>
                  <td><Link to={`/Update/${Employee._id}`}    class="btn btn-link"  onClick={() => setData(Employee)}    >Update</Link></td>
                  <td><Link to={`/Delete/${Employee._id}`}    class="btn btn-link"  onClick={() => setData(Employee)}    >Delete</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <br></br>
      </main>
      <footer>
        <p>
          <em>&copy; Employee Information</em>
        </p>
      </footer>
    </>
  );
}

export default DisplayEmp;
