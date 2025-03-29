import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

import { GET_EMPLOYEE_BY_ID } from "../graphql/GetEmployeeId";
import { GET_ALL_EMPLOYEES } from "../graphql/Quries";
import { UPDATE_EMPLOYEE_BY_ID } from "../graphql/UpdateEmployee";
import { useNavigate } from "react-router-dom";

function UpdateEmployeess() {
  const navigate = useNavigate();
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Age, setAge] = useState("");
  const [DateOfJoining, setDateOfJoining] = useState("");
  const [Title, setTitle] = useState("");
  const [Department, setDepartment] = useState("");
  const [EmployeeType, setEmployeeType] = useState("");

  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_EMPLOYEE_BY_ID, {
    variables: { id: id },
  });
  

 
  useEffect(() => {
    if (data && data.getEmployeeById) {
      // Retrieve data from localStorage
      setFirstName(localStorage.getItem('FirstName') );
      setLastName(localStorage.getItem('LastName'));
      setAge(localStorage.getItem('Age') );
      setDateOfJoining(localStorage.getItem('DateOfJoining') || data.getEmployeeById.DateOfJoining || "");
      setTitle(localStorage.getItem('Title') || data.getEmployeeById.Title || "");
      setDepartment(localStorage.getItem('Department'));
      setEmployeeType(localStorage.getItem('EmployeeType') );
    }
  }, [data]);
  

  
  

  console.log(`url paramaeter:${id}`);

  const [updateEmp, { loading1, error1, data1 }] = useMutation(
    UPDATE_EMPLOYEE_BY_ID
  );

  console.log("GraphQL Data:", data);
  console.log("Title:", data?.getEmployeeById?.Title);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const handleSubmit = (e) => {
    e.preventDefault();

    updateEmp({
      variables: {
        currId: id,
        updatedData: {
          Age: parseInt(Age),
          DateOfJoining: DateOfJoining,
          Department: Department,
          EmployeeType: EmployeeType,
          FirstName: FirstName,
          LastName: LastName,
          Title: Title,
        },
      },
      refetchQueries: [{ query: GET_ALL_EMPLOYEES }],
    });

    navigate("/");
  };

  return (
    <>
      <h3 style={{ color: "red", textAlign: "center" }}>Update Car</h3>

      <form
        onSubmit={handleSubmit}
        class="form_glassmorphism"
        style={{ margin: "0 auto", width: "550px", padding: "15px" }}
      >
        <div class="formcontainer" style={{ margin: "0 auto" }}>
          <div className="col-md-11" class="formcontainer">
            <label htmlFor="FirstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              id="FirstName"
              className="form-control"
              name="FirstName"
              value={FirstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="col-sm-11" class="formcontainer">
            <label htmlFor="LastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="LastName"
              name="LastName"
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="col-sm-11" class="formcontainer">
            <label htmlFor="Age" className="form-label">
              Age
            </label>
            <input
              type="number"
              id="Age"
              className="form-control"
              name="Age"
              value={Age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <div className="col-sm-11" class="formcontainer">
            <label htmlFor="DateOfJoining" className="form-label">
              Date of Joining
            </label>
            <input
              id="DateOfJoining"
              className="form-control"
              type="date"
              name="DateOfJoining"
              value={DateOfJoining}
              onChange={(e) => setDateOfJoining(e.target.value)}
            />
          </div>

          <div className="col-sm-11" class="formcontainer">
            <label htmlFor="Title" className="form-label">
              Title
            </label>
            <select
          id="Title"
          className="form-control"
          name="Title"
          value={Title}
          onChange={(e) => setTitle(e.target.value)}
            >
           <option value="">Select Title</option>
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
              <option value="Director">Director</option>
              <option value="VP">VP</option>
            </select>
          </div>

          <div className="col-sm-11" class="formcontainer">
            <label htmlFor="Department" className="form-label">
              Department
            </label>
            <select
              id="Department"
              className="form-control"
              name="Dapartment"
              value={Department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="">Select Department</option>
                {["IT", "Marketing", "HR", "Engineering"].map((Department) => (
              <option key={Department} value={Department}>
                  {Department}
    </option>
  ))}
            </select>
          </div>

          <div className="col-sm-11" class="formcontainer">
            <label htmlFor="EmployeeType" className="form-label">
              Employee Type
            </label>
            <select
              id="EmployeeType"
              className="form-control"
              name="EmployeeType"
              value={EmployeeType}
              onChange={(e) => setEmployeeType(e.target.value)}
            >
              
              <option value="FullTime">Full Time</option>
              <option value="PartTime">Part Time</option>
              <option value="Contract">Contract</option>
              <option value="Seasonal">Seasonal</option>
            </select>
          </div>
          <br></br>
          <input
            type="submit"
            class="btn btn-primary "
            value="Submit"
            style={{ margin: "0 auto" }}
          />
        </div>
      </form>
    </>
  );
}

export default UpdateEmployeess;
