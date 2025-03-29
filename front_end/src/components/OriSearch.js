import React, { useState } from 'react'
import { useMutation, useQuery } from "@apollo/client";
import { SEARCH_EMPLOYEE_BY_NAME } from "../graphql/SearchMutation";
import {SEARCH_EMPLOYEES} from "../graphql/SearchQuery";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function Search() {

  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);

  //const [searchEmployeesByName, { loading, error, data }] = useMutation(SEARCH_EMPLOYEE_BY_NAME);

 const  { loading, error, data } = useQuery(SEARCH_EMPLOYEES);

const [searchEmployeesByName]= useMutation(SEARCH_EMPLOYEE_BY_NAME);
 


  const validateForm = () => {
    const errors = [];

    if (!FirstName) {
      errors.push('First Name is required');
    }
    if (!LastName) {
      errors.push('Last Name is required');
    }

    setErrorMessages(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (e)=>{

    e.preventDefault()

    if (validateForm()) {
      try {
        const { data } = await searchEmployeesByName({
          variables: { FirstName: FirstName, FastName: LastName }
        });

        // Use data as needed
        console.log(data);
      } catch (error) {
        console.error('Error while searching:', error.message);
      }
    }
    };
  
  

  /*if(loading) return <p>Loading...</p>;
  if(error) return <p> Error: {error.mesage}</p>;*/
  return (
    <>
       <main class="insertbody">

      <div className="container">

      {errorMessages.length > 0 && (
        <div style={{ color: '#fff' }}>
          <ul>
            {errorMessages.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

 
        <form onSubmit={handleSubmit}>  
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                value={FirstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                value={LastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>

          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}


          
           {data && data.searchEmployees && (
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
                </tr>

        {data.searchEmployees.map((Employee)=>(
         
            <tr key={Employee._id}>
             <td>{Employee.FirstName}</td>
             <td>{Employee.LastName}</td>
             <td>{Employee.Age}</td>
           
             
             <td>{Employee.DateOfJoining.split("T")[0]}</td>
             
            
             
             <td>{Employee.Title}</td>
             <td>{Employee.Department}</td>      
             <td>{Employee.EmployeeType}</td>
             <td>{Employee.CurrentStatus}</td>
            
              
            
               
             
       
            </tr>

        ))
          
       
   }
          
  </tbody>

</table>
           )}
</div>

<br></br>

   </main>
      <footer>
        <p>
          <em>&copy; Employee Information</em>{" "}
        </p>
      </footer>
    </>
  );
}


export default Search;

//  {searchData && searchData.searchEmployees && (
  //)}