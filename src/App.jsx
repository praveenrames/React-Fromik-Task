import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './assets/Components/Home'
import Update from './assets/Components/Update'
import Author from './assets/Components/Author'
import './App.css'
import Added from './assets/Components/Added'

function App() {

  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}>Home</Route>
          <Route path='/Added' element={<Added />}>Create</Route>
          <Route path='/Update/:id' element={<Update />}>Update</Route>
          <Route path='/Author/:id' element={<Author />}>Author</Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
