import './App.css'  
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header' 
import Home from './components/Home' 
import CreatePost from './components/CreatePost' 
import ReadPost from './components/ReadPost' 
import UpdatePost from './components/UpdatePost'

function App() {

  return ( 
    <BrowserRouter>
    <div className="App">  
      <Routes> 
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} /> 
        <Route path="/create" element={<CreatePost />} /> 
        <Route path='/:id' element={<ReadPost />} /> 
        <Route path='/update/:id' element={<UpdatePost />} /> 
      </Route>
      </Routes> 
    </div> 
    </BrowserRouter>
  )
}

export default App
