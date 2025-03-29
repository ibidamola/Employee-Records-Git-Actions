import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useQuery , useMutation } from '@apollo/client'
import { CREATE_EMPLOYEE } from '../graphql/mutations'
import { GET_EMPLOYEE_BY_ID } from '../graphql/GetEmployeeId';
import { GET_ALL_EMPLOYEES } from '../graphql/Quries';
import {useNavigate } from 'react-router-dom'


function AddEmployee() {


  const navigate = useNavigate()
  
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Age, setAge] = useState('');
  const [DateOfJoining, setDateOfJoining] = useState('');
  const [Title, setTitle] = useState('');
  const [Department, setDepartment] = useState('');
  const [EmployeeType, setEmployeeType] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const [createEmployee, { loading1, error1, data1 }] = useMutation(CREATE_EMPLOYEE);

  useEffect(() => {
    setFirstName(localStorage.getItem('FirstName'))
    setLastName(localStorage.getItem('Color'));
    setAge(localStorage.getItem('LastName'));
    setDateOfJoining(localStorage.getItem('Age'));
    setTitle(localStorage.getItem('DateOfJoining'))
    setDepartment(localStorage.getItem('Title'));
    setEmployeeType(localStorage.getItem('EmployeeType'));
    setErrorMessages(localStorage.getItem('errorMessages'));

}, []);


  const{id}  = useParams()
 
  console.log(`url paramaeter:${id}`)


 


  const validateForm = () => {
    const errors = [];

    if (!FirstName) {
      errors.push('First Name is required');
    }
    if (!LastName) {
      errors.push('Last Name is required');
    }
    if (!Age) {
      errors.push('Age is required');
    } else if (Age < 20 || Age > 70) {
      errors.push('Age must be between 20 and 70');
    }
    if (!DateOfJoining) {
      errors.push('Date of Joining is required');
    }
    if (!Title) {
      errors.push('Title is required');
    }
    if (!Department) {
      errors.push('Department is required');
    }
    if (!EmployeeType) {
      errors.push('Employee Type is required');
    }

    setErrorMessages(errors);
    return errors.length === 0;
  };

  const { loading, error, data }  =  useQuery(GET_EMPLOYEE_BY_ID, {
    variables: {id:id},
  });

  
      if(loading) return <h2>` Data is Loading <br/> ${error}`</h2>

      if(error) return <h2>`There is an error as below <br/> ${error.message}`</h2>

     const handleSubmit = (e)=>{

        e.preventDefault()

        if (validateForm()) {
        createEmployee({
            variables:{
              employeeInput :{
                FirstName: FirstName,
                LastName: LastName,
                Age: +Age,
                DateOfJoining: DateOfJoining,
                Title: Title,
                Department: Department,
                EmployeeType: EmployeeType,
      
              }
            } , refetchQueries:[{query: GET_ALL_EMPLOYEES }]
          })
        
     }

     navigate("/")
     
    }



   
     

  return (
    <>
    <main class="insertbody">
    <h3 style={{color:"#fff",textAlign:"center"}}>Add Employee</h3>

    {errorMessages.length > 0 && (
        <div style={{ color: '#fff' }}>
          <ul>
            {errorMessages.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

    
    <form onSubmit={handleSubmit}  class="form_glassmorphism"    style={{ margin: '0 auto', width: '550px', padding: '15px' }}>
      <div class="formcontainer"  style={{ margin: '0 auto' }}>
        <div className="col-md-11" class="formcontainer" >
          <label htmlFor="FirstName" className="form-label">First Name</label>
          <input type="text" id="FirstName" className="form-control" name="FirstName" value={FirstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>

        <div className="col-sm-11" class="formcontainer" >
          <label htmlFor="LastName" className="form-label">Last Name</label>
          <input type="text" className="form-control" id="LastName" name="LastName" value={LastName} onChange={(e) => setLastName(e.target.value)} />
        </div>

        <div className="col-sm-11" class="formcontainer" >
          <label htmlFor="Age" className="form-label">Age</label>
          <input type="number" id="Age" className="form-control" name="Age" value={Age} onChange={(e) => setAge(e.target.value)} />
        </div>

        <div className="col-sm-11" class="formcontainer" >
          <label htmlFor="DateOfJoining" className="form-label">Date of Joining</label>
          <input id="DateOfJoining" className="form-control" type="date" name="DateOfJoining" value={DateOfJoining} onChange={(e) => setDateOfJoining(e.target.value)} />
        </div>

        <div className="col-sm-11" class="formcontainer" >
          <label htmlFor="Title" className="form-label">Title</label>
          <select id="Title" className="form-control" name="Title" value={Title} onChange={(e) => setTitle(e.target.value)} >
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Director">Director</option>
            <option value="VP">VP</option>
        </select>
        </div>

        <div className="col-sm-11" class="formcontainer" >
          <label htmlFor="Department" className="form-label">Department</label>
          <select id="department" className="form-control" name="Department" value={Department} onChange={(e) => setDepartment(e.target.value)}>
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
        </select>
        
        </div>

        <div className="col-sm-11" class="formcontainer" >
          <label htmlFor="EmployeeType" className="form-label">Employee Type</label>
          <select id="EmployeeType" className="form-control" name="EmployeeType" value={EmployeeType} onChange={(e) => setEmployeeType(e.target.value)} >
            <option value="FullTime">Full Time</option>
            <option value="PartTime">Part Time</option>
            <option value="Contract">Contract</option>
            <option value="Seasonal">Seasonal</option>
        </select>
         
        </div>
              <br></br>
        <input type="submit" class="btn btn-primary " value="Submit" style={{ margin: '0 auto' }}  />
      </div>
      </form>
    
    
      </main>
      <footer>
        <p><em>&copy; Employee Information</em> </p>
      </footer>
    </>
  )
}

export default AddEmployee;