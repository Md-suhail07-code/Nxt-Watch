import React, { useState, useCallback, useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import { FaMoon, FaLightbulb } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { HiMenu } from 'react-icons/hi'
import { IoMdClose } from 'react-icons/io'
import { MdHome, MdPlaylistAdd } from 'react-icons/md'
import { HiFire } from 'react-icons/hi'
import { SiYoutubegaming } from 'react-icons/si'
import NxtWatchContext from '../Context/NxtWatchContext'

const NavItem = ({ to, icon: Icon, label, currentPath, isDark }) => {
    const isActive = currentPath === to

    // Theme Colors
    const activeBg = isDark ? 'bg-gray-700' : 'bg-gray-200'
    const activeText = isDark ? 'text-white' : 'text-gray-900'
    const inactiveText = isDark ? 'text-gray-400' : 'text-gray-600'
    const activeIconColor = 'text-red-600'

    // Final Classes
    const itemClass = `flex items-center w-full px-4 py-3 cursor-pointer transition duration-150 ease-in-out hover:bg-gray-700/50 dark:hover:bg-gray-700/50 ${isActive ? activeBg : ''}`
    const textClass = `font-medium text-sm ${isActive ? activeText : inactiveText}`
    const iconClass = `text-xl mr-4 ${isActive ? activeIconColor : inactiveText}`

    return (
        <Link to={to} className="w-full">
            <li className={itemClass}>
                <Icon className={iconClass} />
                <p className={textClass}>{label}</p>
            </li>
        </Link>
    )
}


const NavBar = () => {
    const { isDark } = useContext(NxtWatchContext)
    const location = useLocation()
    const currentPath = location.pathname

    // SideBar Theme
    const sideBarBg = isDark ? 'bg-gray-800' : 'bg-gray-50'
    const contactTextColor = isDark ? 'text-white' : 'text-gray-800'
    const contactSecondaryColor = isDark ? 'text-gray-400' : 'text-gray-600'

    return (
        // .light-side-nav / .dark-side-nav
        <div className={`md:hidden flex flex-col justify-between w-full md:w-1/5 min-w-[200px] h-[calc(100vh-60px)] sticky top-[60px] p-4 ${sideBarBg}`}>
            <ul className="list-none p-0 m-0 w-full">
                <NavItem to="/" icon={MdHome} label="Home" currentPath={currentPath} isDark={isDark} />
                <NavItem to="/trending" icon={HiFire} label="Trending" currentPath={currentPath} isDark={isDark} />
                <NavItem to="/gaming" icon={SiYoutubegaming} label="Gaming" currentPath={currentPath} isDark={isDark} />
                <NavItem to="/saved-videos" icon={MdPlaylistAdd} label="Saved Videos" currentPath={currentPath} isDark={isDark} />
            </ul>

            <div className="mt-auto px-4">
                <p className={`font-bold text-sm mb-4 ${contactTextColor}`}>CONTACT US</p>

                <div className="flex items-center mb-4">
                    <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                        alt="facebook logo"
                        className="h-8 w-8 mr-3"
                    />
                    <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                        alt="twitter logo"
                        className="h-8 w-8 mr-3"
                    />
                    <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                        alt="linked in logo"
                        className="h-8 w-8"
                    />
                </div>
                <p className={`text-xs leading-relaxed ${contactSecondaryColor}`}>
                    Enjoy! Now to see your channels and recommendations!
                </p>
            </div>
        </div>
    )
}

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const navigate = useNavigate()
  const { isDark, toggleBtn } = useContext(NxtWatchContext)

  const onClickLogout = useCallback(() => {
    Cookies.remove('jwt_token')
    navigate('/login', { replace: true })
  }, [navigate])

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu(prev => !prev)
  }, [])

  const renderMobileMenu = () => {
    const mobileMenuBg = isDark ? 'bg-gray-800' : 'bg-gray-50'
    const iconColor = isDark ? 'text-white' : 'text-gray-800'

    return (
      // .mobile-menu-modal
      <div
        className={`fixed top-[60px] left-0 w-screen h-[calc(100vh-60px)] z-[999] overflow-y-auto transition-transform duration-300 ${mobileMenuBg}`}
      >
        <button
          type="button"
          className="absolute top-4 right-4 bg-transparent border-none cursor-pointer p-1"
          onClick={toggleMobileMenu}
        >
          <IoMdClose className={`text-2xl ${iconColor}`} />
        </button>
        <div className="pt-8 w-full">
          <NavBar />
        </div>
      </div>
    )
  }

  const renderLogoutModal = (close) => (
    // .modal-cont
    <div className={`flex flex-col items-center p-8 rounded-lg shadow-2xl max-w-xs text-center 
        ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}
      `}
    >
      <p className="text-base mb-5 font-medium">Are you sure, you want to logout?</p>
      <div className="flex justify-between w-full">
        <button
          type="button"
          className="cancel-btn px-4 py-2 rounded-md font-medium w-[48%] border border-gray-400 text-gray-400 bg-transparent transition duration-200 hover:bg-gray-700/50 dark:hover:bg-gray-700"
          onClick={() => close()}
        >
          Cancel
        </button>
        <button
          type="button"
          className="confirm-btn px-4 py-2 rounded-md font-medium w-[48%] bg-blue-600 text-white border-none transition duration-200 hover:bg-blue-700"
          onClick={onClickLogout}
        >
          Confirm
        </button>
      </div>
    </div>
  )

  const logoUrl = isDark
    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

  const iconColor = isDark ? 'text-white' : 'text-gray-700'
  const headerBg = isDark ? 'bg-gray-900' : 'bg-white'
  const logoutBtnBorderColor = isDark ? 'border-white' : 'border-blue-600'
  const logoutBtnTextColor = isDark ? 'text-white' : 'text-blue-600'


  return (
    <header className={`sticky top-0 z-50 shadow-md ${headerBg}`}>
      <nav className="flex justify-between items-center px-5 sm:px-8 h-[60px]">
        {/* --- Logo Content --- */}
        <div className="flex items-center">
          <Link to="/">
            <img
              className="w-[120px] h-auto"
              src={logoUrl}
              alt="website logo"
            />
          </Link>
        </div>

        <div className="flex items-center">
          {/* 1. Theme Toggle Button */}
          <button
            type="button"
            data-testid="theme"
            className="bg-transparent border-none cursor-pointer p-0 mr-4 outline-none"
            onClick={toggleBtn}
          >
            {isDark ? (
              <FaLightbulb className={`text-2xl ${iconColor}`} />
            ) : (
              <FaMoon className={`text-2xl ${iconColor}`} />
            )}
          </button>

          {/* --- DESKTOP/LARGE SCREEN ELEMENTS (md:block) --- */}
          <div className="hidden md:flex items-center">
            {/* 2. Profile Image */}
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
              className="w-8 h-8 rounded-full mr-4"
            />

            {/* 4. Logout Popup Trigger (Desktop Text) */}
            <Popup modal trigger={
              <button
                type="button"
                className={`px-4 py-1 font-medium rounded-md text-sm border-2 transition duration-300
                  ${logoutBtnBorderColor} ${logoutBtnTextColor} hover:bg-blue-600/10
                `}
              >
                Logout
              </button>
            }>
              {close => renderLogoutModal(close)}
            </Popup>
          </div>

          {/* --- MOBILE SCREEN ELEMENTS (md:hidden) --- */}
          <div className="flex items-center md:hidden">
            {/* 3. Mobile Menu Button */}
            <button
              type="button"
              className="bg-transparent border-none cursor-pointer p-0 mr-4 outline-none"
              onClick={toggleMobileMenu}
            >
              <HiMenu className={`text-3xl ${iconColor}`} />
            </button>

            {/* 4. Logout Popup Trigger (Mobile Icon) */}
            <Popup modal trigger={
              <button type="button" className="bg-transparent border-none cursor-pointer p-0 ml-2 mr-0">
                <FiLogOut className={`text-3xl ${iconColor}`} />
              </button>
            }>
              {close => renderLogoutModal(close)}
            </Popup>
          </div>
        </div>

        {/* Conditional Mobile Menu Rendering */}
        {showMobileMenu && renderMobileMenu()}
      </nav>
    </header>
  )
}

export default Header