import React, { useState, useEffect, useCallback, useContext } from 'react'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import { formatDistanceToNow } from 'date-fns'
import { ThreeDots } from 'react-loader-spinner' // Use ThreeDots component directly
import { BiLike, BiDislike } from 'react-icons/bi'
import { MdPlaylistAdd } from 'react-icons/md'
import { useParams } from 'react-router-dom' 
import NxtWatchContext from '../Context/NxtWatchContext'

import Header from './Header'
import NavBar from './Navbar'

// Define API status constants
const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const VideoItemDetails = () => {
  const [videoItem, setVideoItem] = useState({})
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [activeButton, setActiveButtonState] = useState('') 
  
  const { id } = useParams() 
  const { isDark, savedVideos, toggleSaveVideo } = useContext(NxtWatchContext)

  // --- API Fetch Logic (No change, logic is sound) ---

  const getVideoItemDetails = useCallback(async () => {
    setApiStatus(apiStatusConstants.loading)
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    
    try {
      const response = await fetch(apiUrl, {
        headers: { Authorization: `Bearer ${jwtToken}` },
        method: 'GET',
      })
      
      if (response.ok) {
        const data = await response.json()
        const formattedData = {
          id: data.video_details.id,
          title: data.video_details.title,
          videoUrl: data.video_details.video_url,
          thumbnailUrl: data.video_details.thumbnail_url,
          channel: {
            name: data.video_details.channel.name,
            profileImageUrl: data.video_details.channel.profile_image_url,
            subscriberCount: data.video_details.channel.subscriber_count,
          },
          viewCount: data.video_details.view_count,
          date: formatDistanceToNow(new Date(data.video_details.published_at)),
          description: data.video_details.description,
        }
        setVideoItem(formattedData)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch (error) {
      console.error(error)
      setApiStatus(apiStatusConstants.failure)
    }
  }, [id])

  useEffect(() => {
    getVideoItemDetails()
  }, [getVideoItemDetails])

  const onRetry = useCallback(() => {
    getVideoItemDetails()
  }, [getVideoItemDetails])

  const handleActiveButton = useCallback((buttonType) => {
    setActiveButtonState(prevState => prevState === buttonType ? '' : buttonType)
  }, [])
  
  // --- Tailwind Theme Variables ---
  const mainBgColor = isDark ? 'bg-gray-900' : 'bg-gray-50'
  const primaryTextColor = isDark ? 'text-white' : 'text-gray-900'
  const secondaryTextColor = isDark ? 'text-gray-400' : 'text-gray-600'
  const activeColor = 'text-blue-600'
  const inactiveColor = 'text-gray-500' 
  const dividerColor = isDark ? 'bg-gray-700' : 'bg-gray-300'
  
  const failureImg = isDark
    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

  // --- Rendering Logic ---
  
  const renderVideoDetails = () => {
    const isSaved = savedVideos.some(each => each.id === videoItem.id)
    
    const likeColor = activeButton === 'like' ? activeColor : inactiveColor
    const dislikeColor = activeButton === 'dislike' ? activeColor : inactiveColor
    const saveColor = isSaved ? activeColor : inactiveColor
    const saveButtonText = isSaved ? 'Saved' : 'Save'
    
    const { title, videoUrl, channel, viewCount, description, date } = videoItem
    const { name, profileImageUrl, subscriberCount } = channel
    
    return (
      <div className={`p-4 sm:p-0 ${primaryTextColor}`}>
        
        {/* Video Player */}
        <div className="relative pt-[56.25%] mb-5 w-full">
          <ReactPlayer 
            url={videoUrl} 
            controls 
            width="100%" 
            height="100%" 
            className="absolute top-0 left-0"
          />
        </div>

        <p className="text-xl font-semibold m-0 mb-4 sm:text-2xl">{title}</p>

        <div className="flex flex-wrap justify-between items-center mb-4">
          
          {/* Views and Date */}
          <div className={`flex items-center text-sm ${secondaryTextColor}`}>
            <p className="m-0">{viewCount} views</p>
            <span className="text-xl mx-2">•</span>
            <p className="m-0">{date}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center mt-3 sm:mt-0">
            <button
              type="button"
              className={`flex items-center bg-transparent border-none cursor-pointer px-4 py-2 text-base font-medium transition duration-200 hover:opacity-80 ${likeColor}`}
              onClick={() => handleActiveButton('like')}
            >
              <BiLike className="text-xl mr-1" />
              <span className="action-text">Like</span>
            </button>
            <button
              type="button"
              className={`flex items-center bg-transparent border-none cursor-pointer px-4 py-2 text-base font-medium transition duration-200 hover:opacity-80 ${dislikeColor}`}
              onClick={() => handleActiveButton('dislike')}
            >
              <BiDislike className="text-xl mr-1" />
              <span className="action-text">Dislike</span>
            </button>
            <button
              type="button"
              className={`flex items-center bg-transparent border-none cursor-pointer px-4 py-2 text-base font-medium transition duration-200 hover:opacity-80 ${saveColor}`}
              onClick={() => {
                toggleSaveVideo(videoItem)
              }}
            >
              <MdPlaylistAdd className="text-xl mr-1" />
              <span className="action-text">{saveButtonText}</span>
            </button>
          </div>
        </div>

        <hr className={`h-[1px] border-none my-5 ${dividerColor}`} />

        {/* Channel Details and Description */}
        <div className="flex flex-col sm:flex-row sm:items-start pb-5">
          <img 
            className="w-12 h-12 rounded-full mr-4 flex-shrink-0 mb-4 sm:mb-0" 
            src={profileImageUrl} 
            alt="channel logo" 
          />
          <div className="flex-grow">
            <p className="text-base font-semibold m-0 mb-1">{name}</p>
            <p className={`text-sm m-0 mb-4 ${secondaryTextColor}`}>
              {subscriberCount} subscribers
            </p>
            <p className="text-sm leading-relaxed m-0">{description}</p>
          </div>
        </div>
      </div>
    )
  }

  const renderApiStatus = () => {
    const textColor = isDark ? 'text-white' : 'text-gray-900'
    const loaderColor = isDark ? '#ffffff' : '#000000'

    switch (apiStatus) {
      case apiStatusConstants.loading:
        return (
          <div className="flex justify-center items-center w-full min-h-[calc(100vh-100px)]" data-testid="loader">
            {/* FIX: Use ThreeDots component directly */}
            <ThreeDots
              color={loaderColor}
              height="50"
              width="50"
            />
          </div>
        )
      case apiStatusConstants.success:
        return renderVideoDetails()
      
      case apiStatusConstants.failure:
        return (
          <div className={`flex flex-col justify-center items-center w-full min-h-[calc(100vh-100px)] text-center ${textColor}`}>
            <img src={failureImg} alt="failure view" className="w-[300px] h-auto mb-5 md:w-[400px]" />
            <h1 className="text-xl font-semibold mt-5 mb-2 md:text-2xl">Oops! Something Went Wrong</h1>
            <p className="text-base text-gray-500 max-w-sm leading-relaxed mb-5 dark:text-gray-400">
              We are having some trouble completing your request. Please try again
            </p>
            <button
              onClick={onRetry}
              type="button"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg font-bold cursor-pointer transition duration-200 hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className={`w-full ${mainBgColor}`} style={{ minHeight: '100vh' }}>
      <Header />
      
      <div className="flex w-full min-h-[calc(100vh-60px)]">
        <NavBar />
        
        <div className="flex-grow p-4 sm:p-8">
          {renderApiStatus()}
        </div>
      </div>
    </div>
  )
}

export default VideoItemDetails