import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import NxtWatchContext from '../Context/NxtWatchContext'

const Game = props => {
  const { details } = props
  const { title, thumbnailUrl, viewCount, id } = details

  // 1. Use useContext hook for theme access
  const { isDark } = useContext(NxtWatchContext)

  // --- Tailwind Theme Variables ---
  // Primary text color (for title)
  const textColorClass = isDark ? 'text-white' : 'text-gray-900'
  // Secondary text color (for views)
  const secondaryColorClass = isDark ? 'text-gray-400' : 'text-gray-600'
  
  return (
    // .game-link (w-full block)
    <Link 
      to={`/videos/${id}`} 
      className={`no-underline block w-full transition duration-200 hover:opacity-90 ${textColorClass}`}
    >
      {/* .game-cont */}
      <li className="list-none p-0 flex flex-col">
        <img 
          // .game-thumbnail
          // Desktop: aspect-ratio: 3/4; Mobile (<600px): aspect-ratio: 1/1;
          className="w-full aspect-[3/4] object-cover rounded-lg mb-3 sm:mb-2 
                     max-sm:aspect-square" 
          src={thumbnailUrl} 
          alt="video thumbnail" 
        />
        
        {/* .game-title */}
        <p 
          className="text-base font-semibold m-0 mb-1 overflow-hidden 
                     text-ellipsis whitespace-nowrap max-sm:text-sm"
        >
          {title}
        </p>
        
        {/* .game-views */}
        <p 
          className={`text-sm m-0 font-normal ${secondaryColorClass}`}
        >
          {viewCount} Watching Worldwide
        </p>
      </li>
    </Link>
  )
}

export default Game