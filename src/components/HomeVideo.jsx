import React, { useContext } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { Link } from 'react-router-dom'
import NxtWatchContext from '../Context/NxtWatchContext'

const HomeVideo = props => {
  const { details } = props
  const { title, thumbnailUrl, channel, viewCount, publishedAt, id } = details
  const { name, profileImageUrl } = channel
  
  const { isDark } = useContext(NxtWatchContext)

  let formattedDate = ''
  try {
    const dateObj = new Date(publishedAt)
    if (!Number.isNaN(dateObj.getTime())) {
      formattedDate = formatDistanceToNow(dateObj, { addSuffix: true })
    }
  } catch (e) {
    console.error('Error formatting date:', e)
    formattedDate = publishedAt
  }

  // --- Tailwind Theme Variables ---
  const textColor = isDark ? 'text-white' : 'text-gray-900'
  const secondaryColor = isDark ? 'text-gray-400' : 'text-gray-600'
  
  const videoContClasses = `w-full max-w-[300px] mb-10 flex-shrink-0 flex-grow transition duration-200 hover:opacity-90`

  return (
    <Link
      to={`/videos/${id}`}
      className={`no-underline ${textColor} ${videoContClasses}`}
    >
      {/* .video-item */}
      <li className="list-none p-0">
        <img
          className="w-full h-auto aspect-video object-cover rounded-md"
          src={thumbnailUrl}
          alt="video thumbnail"
        />
        {/* .video-info-cont */}
        <div className="flex items-start mt-3">
          <img
            className="w-10 h-10 rounded-full mr-3 flex-shrink-0"
            src={profileImageUrl}
            alt="channel logo"
          />
          {/* .info-text-cont */}
          <div className="flex-grow leading-snug">
            {/* .video-title */}
            <p className="text-base font-semibold m-0 overflow-hidden line-clamp-2">
              {title}
            </p>
            {/* .channel-name */}
            <p className={`text-sm m-0 mt-1 ${secondaryColor}`}>
              {name}
            </p>
            {/* .publish-cont */}
            <div className={`flex items-center text-xs m-0 mt-1 ${secondaryColor}`}>
              <p className="m-0">{viewCount} views</p>
              <span className="text-xl mx-2">•</span>
              <p className="m-0">{formattedDate}</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default HomeVideo