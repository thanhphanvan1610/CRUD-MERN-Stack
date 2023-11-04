import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './page/Home'
import Error from './page/Error'
import DeleteAnimals from './page/DeleteAnimals'
import CreateAnimals from './page/CreateAnimals'
import ShowAnimals from './page/ShowAnimals'
import EditAnimals from './page/EditAnimals'




function App() {
  return (
   <Routes>
      <Route index path='/' element={<Home/>}/>
      <Route path='/animals/create' element={<CreateAnimals/>}/>
      <Route path='/animals/details/:id' element={<ShowAnimals/>}/>
      <Route path='/animals/edit/:id' element={<EditAnimals/>}/>
      <Route path = '/animals/delete/:id' element={<DeleteAnimals/>}/>
      <Route path='*' element ={<Error/>}/>
      
      
   </Routes>
    
  )
}

export default App
