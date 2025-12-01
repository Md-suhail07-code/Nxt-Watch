import React, { useState, useEffect, useCallback, useContext } from 'react'
import Cookies from 'js-cookie'
import { ThreeDots } from 'react-loader-spinner'
import { HiFire } from 'react-icons/hi'
import NxtWatchContext from '../Context/NxtWatchContext'
import Header from './Header'
import NavBar from './Navbar'
import TrendingVideo from './TrendingVideo'

// Define constants for rendering states
const apiStatusConstants = {
    initial: 'INITIAL',
    loading: 'LOADING',
    success: 'SUCCESS',
    failure: 'FAILURE',
}

const Trending = () => {
    const [trendingVideosList, setTrendingVideosList] = useState([])
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

    const { isDark } = useContext(NxtWatchContext)

    // Memoized function to fetch data
    const getTrendingVideos = useCallback(async () => {
        setApiStatus(apiStatusConstants.loading)
        const jwtToken = Cookies.get('jwt_token')
        const apiUrl = `https://apis.ccbp.in/videos/trending`

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

                setTrendingVideosList(updatedData)
                setApiStatus(apiStatusConstants.success)
            } else {
                setApiStatus(apiStatusConstants.failure)
            }
        } catch (error) {
            console.error(error)
            setApiStatus(apiStatusConstants.failure)
        }
    }, []) // Dependency array is empty as it doesn't depend on component state/props

    // useEffect for initial mount and retry
    useEffect(() => {
        getTrendingVideos()
    }, [getTrendingVideos])

    // Add the retry functionality
    const onRetry = useCallback(() => {
        getTrendingVideos()
    }, [getTrendingVideos])

    // --- Tailwind Theme Variables ---
    const mainBgColor = isDark ? 'bg-gray-900' : 'bg-gray-50'
    const headerBgColor = isDark ? 'bg-gray-800' : 'bg-gray-100'
    const headerTextColor = isDark ? 'text-white' : 'text-gray-900'
    const iconCircleBg = isDark ? 'bg-gray-700' : 'bg-gray-200'
    const iconColor = 'text-red-600' // Fire icon is always red
    const contentBgColor = isDark ? 'bg-gray-900' : 'bg-white' // Background for the video list section
    const textColor = isDark ? 'text-white' : 'text-gray-800'

    const failureImg = isDark
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

    // Function to render content based on API status
    const renderTrendingContent = () => {
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
                            onClick={onRetry}
                            type="button"
                            className="px-5 py-2 bg-blue-600 text-white rounded-lg font-bold cursor-pointer transition duration-200 hover:bg-blue-700"
                        >
                            Retry
                        </button>
                    </div>
                )
            case apiStatusConstants.success:
                return (
                    // .trending-videos-list
                    <ul className="list-none p-0 m-0">
                        {trendingVideosList.map(video => (
                            <TrendingVideo key={video.id} details={video} />
                        ))}
                    </ul>
                )
            default:
                return null // Initial or unhandled state
        }
    }

    return (
        <div className={`w-full ${mainBgColor}`} data-testid='trending' style={{ minHeight: '100vh' }}>
            <Header />
            {/* .trending-main-cont */}
            <div className='flex w-full min-h-[calc(100vh-60px)] flex-col md:flex-row'>
                <NavBar />
                {/* .trending-content-cont */}
                <div className='flex-grow w-full pb-10'>

                    {/* Trending Header Section */}
                    <div className={`flex items-center px-5 py-6 sm:px-10 w-full ${headerBgColor}`}>
                        <div className={`flex justify-center items-center w-14 h-14 rounded-full mr-4 flex-shrink-0 ${iconCircleBg}`}>
                            <HiFire className={`text-3xl ${iconColor}`} />
                        </div>
                        <h1 className={`text-2xl font-bold sm:text-3xl m-0 ${headerTextColor}`}>
                            Trending
                        </h1>
                    </div>
                    {/* Videos Section */}
                    {/* .dark-trending-video-cont / .light-trending-video-cont */}
                    <div className={`px-5 sm:px-10 py-5`} style={{ backgroundColor: contentBgColor }}>
                        {renderTrendingContent()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Trending