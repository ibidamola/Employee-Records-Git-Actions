
//import DisplayCars from './components/DisplayCars';
import DisplayEmp from './components/DisplayEmp';
//import InsertCar from  './components/InsertCar';
import InsertEmp from './components/InsertEmp';
import HomePage from './components/HomePage';
import Search from './components/Search';
import Layout from './components/Layout';
import UpdateEmp from './components/UpdateEmp';
import DeleteEmp from './components/DeleteEmp';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
   

    /*<h2 style={{color:"red",textAlign:"center"}}>Welcome To Car Details Recat App using Apollo Client</h2>
      
      <HomePage/>
      <DisplayCars/>*/
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Layout/>}>

            <Route index  element={<HomePage/>} />
            <Route path='Information'  element={<DisplayEmp/>} />
            <Route path='InsertData'  element={<InsertEmp/>} />
            <Route path='Search'  element={<Search/>} />
            <Route path = 'Delete/:id' element={<DeleteEmp/>} />
            <Route  path='Update/:id'  element={<UpdateEmp/>}              />

          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
