import React, { useState } from 'react'
import { LuUser2 } from "react-icons/lu";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const location = useLocation();

  const isActiveLink = (path) => {
    return location.pathname === path ? 'text-[#131417] bg-[#F6F6F6] rounded-md px-3 py-2' : 'text-[#6F757A]';
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative z-50'>
      <div className='h-[68px] flex justify-between items-center p-4 bg-[#ffffff] text-[#131417] fixed top-0 right-0 z-99 w-full border-b border-gray-400'>
        <div className='flex items-center gap-3'>
          {isOpen ? <RxCross2 className='md:hidden cursor-pointer text-2xl' onClick={toggleMenu} /> : <RxHamburgerMenu className='md:hidden cursor-pointer text-2xl' onClick={toggleMenu} />}
          <Link to="/" className='text-2xl font-[400]'>Geekymacet</Link>
        </div>
        <div className='flex items-center gap-7'>
          {/* Desktop Menu */}
          <ul className='hidden md:flex gap-4 lg:gap-8 text-l'>
            <li><Link to="/" className={`font-[400] ${isActiveLink('/')}`}>Home</Link></li>
            <li><Link to="/about" className={`font-[400] ${isActiveLink('/about')}`}>About</Link></li>
            <li><Link to="/mission" className={`font-[400] ${isActiveLink('/mission')}`}>Mission</Link></li>
            <li><Link to="/developer" className={`font-[400] ${isActiveLink('/developer')}`}>Developer</Link></li>
            <li><Link to="/contact" className={`font-[400] ${isActiveLink('/contact')}`}>Contact</Link></li>
            <li><Link to="/verify" className={`font-[400] ${isActiveLink('/verify')}`}>Verify</Link></li>
          </ul>

          {/* Mobile Menu */}
          {isOpen && (
            <ul className='md:hidden absolute top-16 text-center left-0 w-full bg-[#ffffff] shadow-md py-2 px-4 z-50 border-black-400'>
              <li className='py-2 font-[400] text-ll pt-5'><Link to="/" onClick={toggleMenu} className={isActiveLink('/')}>Home</Link></li>
              <li className='py-2 font-[400] text-l pt-5'><Link to="/about" onClick={toggleMenu} className={isActiveLink('/about')}>About</Link></li>
              <li className='py-2 font-[400] text-l pt-5'><Link to="/mission" onClick={toggleMenu} className={isActiveLink('/mission')}>Mission</Link></li>
              <li className='py-2 font-[400] text-l pt-5'><Link to="/developer" onClick={toggleMenu} className={isActiveLink('/developer')}>Developer</Link></li>
              <li className='py-2 font-[400] text-l pt-5'><Link to="/contact" onClick={toggleMenu} className={isActiveLink('/contact')}>Contact</Link></li>
              <li className='py-2 pb-6 font-[400] text-l pt-5'><Link to="/verify" onClick={toggleMenu} className={isActiveLink('/verify')}>Verify</Link></li>
            </ul>
          )}
        {/* Account Menu */}
        <div className="relative"
            onMouseEnter={() => setShowAccountMenu(true)}
            onMouseLeave={() => setShowAccountMenu(false)}>
          <Link to="/login">
            <LuUser2 className='text-2xl hover:text-gray-600 transition-colors' />
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
      
    </div>
  )
}

export default Navbar