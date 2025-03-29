import React from 'react'
import {Link, Outlet} from 'react-router-dom'
import '../App.css';


function Layout() {
  return (

    <>
    <header>
        <h1>Employee</h1>
    <nav >
        <ul>
            <li style={{display:"inline", marginLeft: "30px"}} class="nav-item active">
                <Link to='/' >Home |</Link>
            </li>

            <li  style={{display:"inline", marginLeft: "30px"}}>
                <Link to='/Information'>Employee Information |</Link>
            </li>

            <li style={{display:"inline", marginLeft: "30px"}}>
                <Link to='/InsertData'>InsertData |</Link>
            </li>

            <li style={{display:"inline", marginLeft: "30px"}}>
                <Link to='/Search'>Search</Link>
            </li>

            
        </ul>
    </nav>


    
    </header>

  

 
   
    <Outlet />
    </>
 
  )
}

export default Layout

