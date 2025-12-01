import React, { useContext } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { Link } from 'react-router-dom'
import NxtWatchContext from '../Context/NxtWatchContext'

const TrendingVideo = props => {
  const { details } = props
  const { title, thumbnailUrl, channel, viewCount, publishedAt, id } = details
  const { name } = channel

  // 1. Use useContext hook for theme access
  const { isDark } = useContext(NxtWatchContext)

  // --- Date Formatting Logic ---
  let formattedDate = ''
  try {
    const dateObj = new Date(publishedAt)
    // Check if the date is a valid number before using formatDistanceToNow
    if (!Number.isNaN(dateObj.getTime())) {
      formattedDate = formatDistanceToNow(dateObj, { addSuffix: true })
    }
  } catch (e) {
    formattedDate = publishedAt
  }

  // --- Tailwind Theme Variables ---
  // Primary text color (for title)
  const textColorClass = isDark ? 'text-white' : 'text-gray-900'
  // Secondary text color (for channel name, views, date)
  const secondaryColorClass = isDark ? 'text-gray-400' : 'text-gray-600'

  return (
    // .trending-video-link (Desktop: Horizontal layout, Mobile: Stacks vertically)
    <Link
      to={`/videos/${id}`}
      className={`no-underline w-full block transition duration-200 hover:opacity-90 ${textColorClass}`}
    >
      {/* .trending-video-item */}
      <li className="flex flex-col sm:flex-row list-none m-0 py-4 sm:py-6 sm:px-0">
        <img
          // .trending-img
          className="w-full h-auto object-cover rounded-md flex-shrink-0 mb-3 sm:w-[300px] sm:h-[180px] sm:mr-5"
          src={thumbnailUrl}
          alt="video thumbnail"
        />
        {/* .trending-info-cont */}
        <div className="flex flex-col justify-start leading-snug flex-grow px-1 sm:px-0">
          {/* .trending-title */}
          <p className="text-lg font-semibold m-0 mb-2 overflow-hidden line-clamp-2 sm:text-xl">
            {title}
          </p>

          {/* .trending-channel-name */}
          <p className={`text-sm m-0 mb-1 ${secondaryColorClass}`}>
            {name}
          </p>
          
          {/* .trending-stats-cont */}
          <div className={`flex items-center text-sm ${secondaryColorClass}`}>
            <p className="m-0">
              {viewCount} views
            </p>
            {/* .dot */}
            <span className="text-xl mx-2">•</span>
            <p className="m-0">
              {formattedDate}
            </p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default TrendingVideo