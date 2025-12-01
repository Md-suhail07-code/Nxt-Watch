import React, { useState, useEffect, useCallback, useContext } from 'react'
import { IoMdClose, IoIosSearch } from 'react-icons/io'
import Cookies from 'js-cookie'
import {ThreeDots} from 'react-loader-spinner'
import NxtWatchContext from '../Context/NxtWatchContext'
import Header from './Header'
import HomeVideo from './HomeVideo'
import NavBar from './Navbar'
// Assuming HomeCont and BannerCont are compatible with Tailwind/dynamic props
import { BannerCont, HomeCont } from '../styledComponent' 

// Define constants for rendering states
const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
  noVideos: 'NO_VIDEOS',
}

const Home = () => {
  const [isClosed, setIsClosed] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [homeVideosList, setHomeVideosList] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  
  const { isDark } = useContext(NxtWatchContext)

  const getHomeVideos = useCallback(async () => {
    setApiStatus(apiStatusConstants.loading)
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    
    try {
      const response = await fetch(apiUrl, {
        headers: { Authorization: `Bearer ${jwtToken}` },
        method: 'GET',
      })
      
      if (response.ok) {
        const fetchedData = await response.json()
        const updatedData = fetchedData.videos.map(video => ({
          id: video.id,
          title: video.title,
          thumbnailUrl: video.thumbnail_url,
          channel: {
            name: video.channel.name,
            profileImageUrl: video.channel.profile_image_url,
          },
          viewCount: video.view_count,
          publishedAt: video.published_at,
        }))

        const newApiStatus = updatedData.length > 0
          ? apiStatusConstants.success
          : apiStatusConstants.noVideos

        setHomeVideosList(updatedData)
        setApiStatus(newApiStatus)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch (error) {
      console.error(error)
      setApiStatus(apiStatusConstants.failure)
    }
  }, [searchInput]) // Re-run when searchInput changes

  useEffect(() => {
    getHomeVideos()
  }, [getHomeVideos]) // Initial fetch and refetch on search filter

  const closeBanner = useCallback(() => {
    setIsClosed(true)
  }, [])

  const handleSearch = useCallback(event => {
    setSearchInput(event.target.value)
  }, [])

  const filterList = useCallback(() => {
    getHomeVideos()
  }, [getHomeVideos])
  
  // --- Tailwind Theme Variables ---
  const homeBgColor = isDark ? '#181818' : '#f9f9f9'
  const failureImg = isDark
    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
  const searchInputClasses = isDark 
    ? 'text-white bg-gray-800 border-gray-700' 
    : 'text-gray-900 bg-white border-gray-300'
  const searchButtonClasses = isDark 
    ? 'bg-gray-700 border-gray-700' 
    : 'bg-gray-200 border-gray-300'
  const searchIconColor = isDark ? 'text-white' : 'text-gray-500'
  const textColor = isDark ? 'text-white' : 'text-gray-800'
  // Border color used for inline style on search input/button
  const searchBorderColor = isDark ? '#374151' : '#e5e7eb'
  const getBtnClass = isDark ? 'border-white text-white' : 'border-gray-800 text-gray-800'


  // New function to handle conditional rendering based on API status
  const renderHomeContent = () => {
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return (
          // .loader-container
          <div className="flex justify-center items-center w-full min-h-[70vh]" data-testid="loader">
            <ThreeDots
              type="ThreeDots"
              color={isDark ? '#ffffff' : '#000000'}
              height="50"
              width="50"
            />
          </div>
        )
      case apiStatusConstants.failure:
        return (
          // .status-cont
          <div className={`flex flex-col justify-center items-center w-full min-h-[70vh] text-center ${textColor}`}>
            <img src={failureImg} alt="failure view" className="w-[300px] h-auto mb-5 md:w-[400px]" />
            <h1 className="text-xl font-semibold mt-5 mb-2 md:text-2xl">Oops! Something Went Wrong</h1>
            <p className="text-base text-gray-500 max-w-sm leading-relaxed mb-5 dark:text-gray-400">
              We are having some trouble completing your request. Please try again
            </p>
            <button
              onClick={getHomeVideos}
              type="button"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg font-bold cursor-pointer transition duration-200 hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        )
      case apiStatusConstants.noVideos:
        return (
          // .status-cont
          <div className={`flex flex-col justify-center items-center w-full min-h-[70vh] text-center ${textColor}`}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
              className="w-[300px] h-auto mb-5 md:w-[400px]"
            />
            <h1 className="text-xl font-semibold mt-5 mb-2 md:text-2xl">No Search Results Found</h1>
            <p className="text-base text-gray-500 max-w-sm leading-relaxed mb-5 dark:text-gray-400">
              Try different Key words or remove search filter.
            </p>
            <button
              onClick={getHomeVideos}
              type="button"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg font-bold cursor-pointer transition duration-200 hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        )
      case apiStatusConstants.success:
        return (
          // .home-videos-list
          <ul className="flex flex-wrap p-0 m-0 list-none gap-5 md:gap-x-5 md:gap-y-8">
            {homeVideosList.map(list => (
              <HomeVideo key={list.id} details={list} />
            ))}
          </ul>
        )
      default:
        return null
    }
  }

  return (
    <HomeCont bgColor={homeBgColor} data-testid="home" className={`${isDark ? 'dark' : 'light'}`}>
      <Header />
      {/* .home-inner-cont */}
      <div className="flex w-full min-h-[calc(100vh-60px)] flex-col md:flex-row">
        <NavBar />
        {/* .content-and-search-cont */}
        <div className="flex-grow p-4 md:p-5">
          
          {/* --- Banner --- */}
          {!isClosed && (
            <BannerCont 
              data-testid="banner" 
              isdark={isDark}
            >
              <div className="max-w-xs">
                <img
                  src={isDark
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                  }
                  alt="nxt watch logo"
                  className="h-10 w-auto mb-5"
                />
                <p className="text-base font-medium mb-5">Buy Nxt Watch Premium prepaid plans with UPI</p>
                <button 
                  type="button" 
                  className={`px-5 py-2 font-bold bg-transparent rounded border transition duration-200 
                    ${getBtnClass} hover:bg-gray-500/10
                  `}
                >
                  GET IT NOW
                </button>
              </div>
              <div>
                <button
                  onClick={closeBanner}
                  className="bg-transparent border-none cursor-pointer p-1"
                  data-testid="close"
                  type="button"
                >
                  <IoMdClose className="text-xl" style={{ color: isDark ? '#f1f1f1' : '#1e293b' }} />
                </button>
              </div>
            </BannerCont>
          )}

          {/* --- Video Content --- */}
          <div className="flex-grow pr-0 md:pr-5">
            {/* Search Cont */}
            <div className="flex items-stretch w-full max-w-lg mb-5">
              <input
                onChange={handleSearch}
                type="search"
                placeholder="Search"
                className={`flex-grow p-3 text-sm border-2 rounded-l-md outline-none ${searchInputClasses} border-r-0`}
                value={searchInput}
                style={{ borderColor: searchBorderColor }}
              />
              <button
                onClick={filterList}
                data-testid="searchButton"
                type="button"
                className={`flex justify-center items-center px-5 border-2 rounded-r-md cursor-pointer transition duration-200 
                  ${searchButtonClasses} border-l-0
                `}
                style={{ borderColor: searchBorderColor }}
              >
                <IoIosSearch className={`text-lg ${searchIconColor}`} />
              </button>
            </div>
            
            {/* Render content */}
            {renderHomeContent()}
          </div>
        </div>
      </div>
    </HomeCont>
  )
}

export default Home