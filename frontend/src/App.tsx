import './App.css'
import { BlogCreate } from './Pages/BlogCreate';
import BlogPage from './Pages/BlogPage';
import AllCard from './components/AllCard';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<AllCard/>}/>
          <Route path="/new" element={<BlogCreate/>} />
          <Route path='/blog/:id' element={<BlogPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
