import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useQuery , useMutation } from '@apollo/client'
import { GET_EMPLOYEE_BY_ID } from '../graphql/GetEmployeeId';
import { GET_ALL_EMPLOYEES } from '../graphql/Quries';
import {UPDATE_EMPLOYEE_BY_ID} from '../graphql/UpdateEmployee';
import{ DELETE_EMPLOYEE_BY_ID} from '../graphql/DeleteEmpMutation';
import {Link, Outlet} from 'react-router-dom'
import { useNavigate } from "react-router-dom";


function DeleteEmployee() {

  const navigate = useNavigate();
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Age, setAge] = useState("");
  const [DateOfJoining, setDateOfJoining] = useState("");
  const [Title, setTitle] = useState("");
  const [Department, setDepartment] = useState("");
  const [EmployeeType, setEmployeeType] = useState("");
  const [CurrentStatus, setCurrentStatus] = useState("");

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
      setCurrentStatus(
        localStorage.getItem("CurrentStatus") === "true" ||
        data.getEmployeeById.CurrentStatus ||
        ""
      );
    }
  }, [data]);


  console.log(`url paramaeter:${id}`);

  const [DeleteEmp, { loading1, error1, data1 }] = useMutation(
    DELETE_EMPLOYEE_BY_ID
  );



  console.log("GraphQL Data:", data);
  console.log("Title:", data?.getEmployeeById?.Title);

  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (CurrentStatus) {
    
      alert("CAN'T DELETE EMPLOYEE- STATUS ACTIVE");
    }else{
    DeleteEmp({
      variables: {
        employeeId: id,
      },
      refetchQueries: [{ query: GET_ALL_EMPLOYEES }],
    });
  }
    navigate("/Information");
  };
     
     
    



   
     

  return (
    <>
    <main class="insertbody">
    <h3 style={{color:"#fff",textAlign:"center"}}>Delete Employee</h3>

   
<form onSubmit={handleSubmit}  class="form_glassmorphism"    style={{ margin: '0 auto', width: '550px', padding: '15px' }}>
      <div class="formcontainer"  style={{ margin: '0 auto' }}>
        <div className="col-md-11" class="formcontainer" >
          <label htmlFor="FirstName" className="form-label">First Name</label>
          <input type="text" id="FirstName" className="form-control" name="FirstName" value={FirstName} onChange={(e) => setFirstName(e.target.value)} readOnly />
        </div>

        <div className="col-sm-11" class="formcontainer" >
          <label htmlFor="LastName" className="form-label">Last Name</label>
          <input type="text" className="form-control" id="LastName" name="LastName" value={LastName} onChange={(e) => setLastName(e.target.value)} readOnly />
        </div>

        <div className="col-sm-11" class="formcontainer" >
          <label htmlFor="Age" className="form-label">Age</label>
          <input type="number" id="Age" className="form-control" name="Age" value={Age} onChange={(e) => setAge(e.target.value)} readOnly/>
        </div>

        <div className="col-sm-11" class="formcontainer" >
          <label htmlFor="DateOfJoining" className="form-label">Date of Joining</label>
          <input id="DateOfJoining" className="form-control" type="date" name="DateOfJoining" value={DateOfJoining} onChange={(e) => setDateOfJoining(e.target.value)} readOnly/>
        </div>

        <div className="col-sm-11" class="formcontainer" >
          <label htmlFor="Title" className="form-label">Title</label>
          <input id="Title" className="form-control" name="Title" value={Title} onChange={(e) => setTitle(e.target.value)} readOnly/>
          
        </div>

        <div className="col-sm-11" class="formcontainer" >
          <label htmlFor="Department" className="form-label">Department</label>
          <input id="Department" className="form-control" name="Dapartment" value={Department}
              onChange={(e) => setDepartment(e.target.value)} readOnly/>
           
        
        </div>

        <div className="col-sm-11" class="formcontainer" >
          <label htmlFor="EmployeeType" className="form-label">Employee Type</label>
          <input id="EmployeeType" className="form-control" name="EmployeeType" value={EmployeeType} onChange={(e) => setEmployeeType(e.target.value)} readOnly />
          
         
        </div>

        <div className="col-sm-11" class="formcontainer" >
          <label htmlFor="CurrentStatus" className="form-label">CurrentStatus</label>
          <input id="CurrentStatus" className="form-control" name="CurrentStatus" value={CurrentStatus ? "true" : "false"}
                onChange={(e) => setCurrentStatus(e.target.value === "true")} readOnly />
        
        </div>
              <br></br>
              <input
            type="submit"
            class="btn btn-primary "
            value="Delete"
            style={{ margin: "0 auto", background:"red", color:"#fff"}}
          />
      </div>
      </form>
    
    
      </main>
      <footer>
        <p><em>&copy; Employee Information</em> </p>
      </footer>
    </>
  )
}

export default DeleteEmployee