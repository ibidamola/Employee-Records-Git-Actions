import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { CREATE_EMPLOYEE } from '../graphql/mutations'


function AddEmployee() {
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Age, setAge] = useState('');
  const [DateOfJoining, setDateOfJoining] = useState('');
  const [Title, setTitle] = useState('');
  const [Department, setDepartment] = useState('');
  const [EmployeeType, setEmployeeType] = useState('');

  const [createEmployee, { loading, error, data }] = useMutation(CREATE_EMPLOYEE);


   

     const handleSubmit = (e)=>{

        e.preventDefault()

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
                  }  
        })

    
        alert(`${FirstName}\n ${LastName}\n ${Age}\n ${DateOfJoining}\n ${Title}\n ${Department}\n ${EmployeeType}`
        )
        
     }

     if(loading) return <h2>` Data is Loading <br/> ${error}`</h2>

     if(error) return <h2>`There is an error as below <br/> ${error.message}`</h2>


   
     

  return (
    <>
    <h3 style={{color:"red",textAlign:"center"}}>Add Employee</h3>
    
    <form onSubmit={handleSubmit} style={{ marginLeft: '430px', backgroundColor: 'pink', width: '550px', padding: '15px' }}>
        <div className="col-sm-11">
          <label htmlFor="FirstName" className="form-label">First Name</label>
          <input type="text" id="FirstName" className="form-control" name="FirstName" value={FirstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>

        <div className="col-sm-11">
          <label htmlFor="LastName" className="form-label">Last Name</label>
          <input type="text" className="form-control" id="LastName" name="LastName" value={LastName} onChange={(e) => setLastName(e.target.value)} />
        </div>

        <div className="col-sm-11">
          <label htmlFor="Age" className="form-label">Age</label>
          <input type="number" id="Age" className="form-control" name="Age" value={Age} onChange={(e) => setAge(e.target.value)} />
        </div>

        <div className="col-sm-11">
          <label htmlFor="DateOfJoining" className="form-label">Date of Joining</label>
          <input id="DateOfJoining" className="form-control" type="date" name="DateOfJoining" value={DateOfJoining} onChange={(e) => setDateOfJoining(e.target.value)} />
        </div>

        <div className="col-sm-11">
          <label htmlFor="Title" className="form-label">Title</label>
          <input type="text" id="Title" className="form-control" name="Title" value={Title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="col-sm-11">
          <label htmlFor="Department" className="form-label">Department</label>
          <input type="text" id="Department" className="form-control" name="Department" value={Department} onChange={(e) => setDepartment(e.target.value)} />
        </div>

        <div className="col-sm-11">
          <label htmlFor="EmployeeType" className="form-label">Employee Type</label>
          <input type="text" id="EmployeeType" className="form-control" name="EmployeeType" value={EmployeeType} onChange={(e) => setEmployeeType(e.target.value)} />
        </div>

        <input type="submit" value="Submit" />
      </form>
    
    
    
    
    </>
  )
}

export default AddEmployee;