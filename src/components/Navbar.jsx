import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MdHome, MdPlaylistAdd } from 'react-icons/md'
import { HiFire } from 'react-icons/hi'
import { SiYoutubegaming } from 'react-icons/si'
import NxtWatchContext from '../Context/NxtWatchContext'

// Helper component for Navigation Link
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
        <div className={`hidden md:flex flex-col justify-between w-full md:w-1/5 min-w-[200px] h-[calc(100vh-60px)] sticky top-[60px] p-4 ${sideBarBg}`}>
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

export default NavBar