import React from 'react'
import {Link, Outlet} from 'react-router-dom'
import '../App.css';

function HomePage() {
  return (
    <>
  

    <main>
    <div class="background-container">
      <img src="/coworking-office-employees-doing-financial-market-analysis.png" alt="#" />
      <p>Welcome to our Employee Record Keeping website, <br></br>where precision meets efficiency.  <br></br>Streamline your HR tasks, manage employee data, and stay compliant effortlessly.  <br></br> Your reliable partner in workforce management.</p>

      <button type="button" class="btn btn" id="button">Employee Data</button>
 
    </div>

  
    </main>
    <footer>
      <p><em>&copy; Employee Information</em> </p>
    </footer>

 
   
    <Outlet />
    </>
  )
}

export default HomePage