import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home'
// import Footer from './components/Footer/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import LoginPage from './components/LoginPage/LoginPage'
import Mission from './components/Mission/Mission'
import Developer from './components/Developer/Developer'
import Profile from './components/Profile/Profile'
import Verify from './components/Verify/Verify'
function App() {
  return (
    <div className="bg-[#FBFBFB] min-h-screen text-[#131417]">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/mission' element={<Mission />} />
          <Route path='/developer' element={<Developer />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/verify' element={<Verify />} />
        </Routes>
        {/* <Home/> */}
        {/* <Footer /> */}
      </Router>
    </div>
  )
}

export default App