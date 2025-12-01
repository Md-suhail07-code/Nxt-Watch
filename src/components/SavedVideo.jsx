import React, { useContext } from 'react'
import { MdPlaylistAdd } from 'react-icons/md'
import { Link } from 'react-router-dom'
import NxtWatchContext from '../Context/NxtWatchContext'
import Header from './Header'
import NavBar from './Navbar'

const SavedVideo = () => {
  const { isDark, savedVideos } = useContext(NxtWatchContext)

  // --- Tailwind Theme Variables ---
  const mainBgColor = isDark ? 'bg-gray-900' : 'bg-gray-50'
  const headerBgColor = isDark ? 'bg-gray-800' : 'bg-gray-100'
  const headerTextColor = isDark ? 'text-white' : 'text-gray-900'
  const iconCircleBg = isDark ? 'bg-gray-700' : 'bg-gray-200'
  const iconColor = 'text-red-600' // Blue icon for saved videos
  const contentTextColor = isDark ? 'text-white' : 'text-gray-900'
  const secondaryColor = isDark ? 'text-gray-400' : 'text-gray-600'


  // --- Render Functions ---

  const renderEmptyView = () => {
    return (
      // .no-saved-videos-view
      <div className={`flex flex-col justify-center items-center w-full min-h-[calc(100vh-120px)] text-center p-8 ${contentTextColor}`}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
          alt="no saved videos"
          // .no-save-img
          className="w-[200px] h-auto mb-8 md:w-[300px]"
        />
        {/* .no-save-heading */}
        <h1 className="text-2xl font-bold mb-3 md:text-3xl">No Saved Videos Found</h1>
        {/* .no-save-description */}
        <p className={`text-base max-w-md ${secondaryColor}`}>
          You can save your Videos while watching them.
        </p>
      </div>
    )
  }

  const renderSavedVideosList = () => {
    return (
      <div className="w-full">
        {/* Header Section: .saved-videos-header */}
        <div
          className={`flex items-center px-5 py-6 sm:px-10 w-full ${headerBgColor}`}
        >
          {/* .saved-icon-cont */}
          <div
            className={`flex justify-center items-center w-14 h-14 rounded-full mr-4 flex-shrink-0 ${iconCircleBg}`}
          >
            <MdPlaylistAdd className={`text-3xl ${iconColor}`} />
          </div>
          <h1 className={`text-2xl font-bold sm:text-3xl m-0 ${headerTextColor}`}>Saved Videos</h1>
        </div>

        {/* Videos List: .saved-videos-list */}
        <ul className="list-none p-5 sm:px-10 py-5 m-0">
          {savedVideos.map(video => (
            // .saved-video-link
            <Link key={video.id} to={`/videos/${video.id}`} className="no-underline block">
              {/* .saved-video-card-item */}
              <li className="flex flex-col sm:flex-row items-start mb-8 p-0">
                <img
                  src={video.thumbnailUrl}
                  alt="video thumbnail"
                  // .thumbnail-img
                  className="w-full h-auto object-cover rounded-md flex-shrink-0 mb-3 sm:w-[300px] sm:h-[180px] sm:mr-5"
                />
                {/* .video-info-text-cont */}
                <div className="flex flex-col justify-start leading-snug flex-grow">
                  {/* .video-title-text */}
                  <p
                    className={`text-lg font-semibold m-0 mb-2 overflow-hidden line-clamp-2 sm:text-xl ${contentTextColor}`}
                  >
                    {video.title}
                  </p>
                  {/* .channel-name-text */}
                  <p
                    className={`text-sm m-0 mb-1 ${secondaryColor}`}
                  >
                    {video.channel.name}
                  </p>
                  {/* .stats-row */}
                  <div className={`flex items-center text-sm ${secondaryColor}`}>
                    {/* .view-count-text */}
                    <p className="m-0">{video.viewCount} views</p>
                    {/* .dot */}
                    <span className="text-xl mx-2">•</span>
                    {/* .date-text (assuming video.date is formatted date string) */}
                    <p className="m-0">{video.date}</p>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    )
  }

  return (
    // .saved-videos-page
    <div data-testid="savedVideos" className={`w-full ${mainBgColor}`} style={{ minHeight: '100vh' }}>
      <Header />
      {/* .saved-videos-main-cont */}
      <div className="flex w-full min-h-[calc(100vh-60px)] flex-col md:flex-row">
        <NavBar />
        {/* .saved-videos-inner-cont */}
        <div className="flex-grow w-full pb-10">
          {savedVideos.length === 0
            ? renderEmptyView()
            : renderSavedVideosList()}
        </div>
      </div>
    </div>
  )
}

export default SavedVideo