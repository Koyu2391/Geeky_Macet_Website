import React, { useState } from 'react'
import { MdAccountCircle } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const location = useLocation();

  const isActiveLink = (path) => {
    console.log("location.pathname: ", location.pathname );
    console.log("path: ", path);
    console.log("endhere ");
    return location.pathname === path ? 'text-[#131417] bg-[#F6F6F6] rounded-md px-3 py-2' : 'text-[#6F757A]';
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className='flex justify-between items-center p-4 bg-[#ffffff] text-[#131417] fixed top-0 z-99 w-full border-b border-gray-400'>
        <div className='flex items-center gap-3'>
          {isOpen ? <RxCross2 className='md:hidden cursor-pointer text-2xl' onClick={toggleMenu} /> : <GiHamburgerMenu className='md:hidden cursor-pointer text-2xl' onClick={toggleMenu} />}
          <Link to="/" className='text-2xl font-bold'>Geekymacet</Link>
        </div>
        <div className='flex items-center gap-7'>
          {/* Desktop Menu */}
          <ul className='hidden md:flex gap-4 lg:gap-8 text-lg'>
            <li><Link to="/" className={`font-bold ${isActiveLink('/')}`}>Home</Link></li>
            <li><Link to="/about" className={`font-bold ${isActiveLink('/about')}`}>About</Link></li>
            <li><Link to="/mission" className={`font-bold ${isActiveLink('/mission')}`}>Mission</Link></li>
            <li><Link to="/developer" className={`font-bold ${isActiveLink('/developer')}`}>Developer</Link></li>
            <li><Link to="/contact" className={`font-bold ${isActiveLink('/contact')}`}>Contact</Link></li>
            <li><Link to="/verify" className={`font-bold ${isActiveLink('/verify')}`}>Verify</Link></li>
          </ul>

          {/* Mobile Menu */}
          {isOpen && (
            <ul className='md:hidden absolute top-16 text-center left-0 w-full bg-[#FBFBFB] shadow-md py-2 px-4 z-50'>
              <li className='py-2 font-bold'><Link to="/" onClick={toggleMenu} className={isActiveLink('/')}>Home</Link></li>
              <li className='py-2 font-bold'><Link to="/#about" onClick={toggleMenu} className={isActiveLink('/about')}>About</Link></li>
              <li className='py-2 font-bold'><Link to="/#mission" onClick={toggleMenu} className={isActiveLink('/mission')}>Mission</Link></li>
              <li className='py-2 font-bold'><Link to="/#developer" onClick={toggleMenu} className={isActiveLink('/developer')}>Developer</Link></li>
              <li className='py-2 font-bold'><Link to="/#contact" onClick={toggleMenu} className={isActiveLink('/contact')}>Contact</Link></li>
              <li className='py-2 pb-6 font-bold'><Link to="/verify" onClick={toggleMenu} className={isActiveLink('/verify')}>Verify</Link></li>
            </ul>
          )}
        {/* Account Menu */}
        <div className="relative"
            onMouseEnter={() => setShowAccountMenu(true)}
            onMouseLeave={() => setShowAccountMenu(false)}>
          <Link to="/login">
            <MdAccountCircle className='text-4xl hover:text-gray-600 transition-colors' />
          </Link>
          
          {/* Account Dropdown */}
          <div className={`absolute right-0 w-48 bg-[#FBFBFB] shadow-lg rounded-md py-2 transform transition-all duration-300 ease-in-out ${
            showAccountMenu ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}>
            <Link to="/profile" className="block px-4 py-2 text-[#131417]">Profile</Link>
            <hr className="my-2 border-gray-300" />
            <Link to="/logout" className="block px-4 py-2 text-red-700">Logout</Link>
        </div>
        </div>
        </div>
      </div>
      
    </>
  )
}

export default Navbar