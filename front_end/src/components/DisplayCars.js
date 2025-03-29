import React from 'react'
import { useQuery, gql } from '@apollo/client';
import { GET_ALL_EMPLOYEES } from '../graphql/Quries';
import AddCar from './AddCar';
import InsertCar from './InsertCar';
import '../App.css';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';


function DisplayCars() {
     
    const { loading, error, data } = useQuery(GET_ALL_EMPLOYEES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
      
    
    const setData = (Employee) => {

      let{_id,Age,
        CurrentStatus,
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
      localStorage.setItem('DateOfJoining', DateOfJoining);
      localStorage.setItem(' Department',  Department)
      localStorage.setItem('EmployeeType', EmployeeType)
      localStorage.setItem('FirstName', FirstName)
      localStorage.setItem('LastName', LastName)
      localStorage.setItem('Title ', Title )
  }
    
  
    return (
    <>
    <main class="insertbody">

    <div className="container">
    
    <table  border={"5"}  width={"100%"}  class={"table table-striped "}>
      <tbody>
        
       <tr class={"thead-dark"}>
        <th>FIRST NAME</th>
        <th>LAST NAME</th>
        <th>AGE</th>
        <th>DATE OF JOINING</th>
        <th>TITLE</th>
        <th>DEPARTMENT</th>
        <th>EMPLOYEE TYPE</th>
        <th>CURRENT STATUS</th>
        <th>UPDATE</th>
        <th>DELETE</th>
        
       </tr>

       {
        data.getAllEmployees.map((Employee)=>(
         
            <tr key={Employee._id}>
             <td>{Employee.FirstName}</td>
             <td>{Employee.LastName}</td>
             <td>{Employee.Age}</td>
           
             
             <td>{Employee.DateOfJoining.split("T")[0]}</td>
             
            
             
             <td>{Employee.Title}</td>
             <td>{Employee.Department}</td>      
             <td>{Employee.EmployeeType}</td>
             <td>{Employee.CurrentStatus}</td>
             <td><Link    to={`/InsertCar/${Employee._id}`}    class="btn btn-link"  onClick={() => setData(Employee)}    >Update</Link></td>
              
             
               
             
       
            </tr>

        ))
       }








      </tbody>





    </table>
    </div>
    
    <br></br>

       </main>
<footer>
    <p><em>&copy; Employee Information</em> </p>
</footer>
    
    </>
  )
}

export default DisplayCars