import React, { useState, useEffect, useCallback, useContext } from 'react'
import Cookies from 'js-cookie'
import { ThreeDots } from 'react-loader-spinner'
import { SiYoutubegaming } from 'react-icons/si'
import NxtWatchContext from '../Context/NxtWatchContext'
import Header from './Header'
import NavBar from './Navbar'
import Game from './Game' // Assuming Game component is also using Tailwind

const apiStatusConstants = {
    initial: 'INITIAL',
    loading: 'LOADING',
    success: 'SUCCESS',
    failure: 'FAILURE',
}

const Gaming = () => {
    const [gamingVideosList, setGamingVideosList] = useState([])
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

    const { isDark } = useContext(NxtWatchContext)

    // Memoized function to fetch data
    const getGamingVideos = useCallback(async () => {
        setApiStatus(apiStatusConstants.loading)
        const jwtToken = Cookies.get('jwt_token')
        const apiUrl = `https://apis.ccbp.in/videos/gaming`

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
                    viewCount: video.view_count,
                }))
                setGamingVideosList(updatedData)
                setApiStatus(apiStatusConstants.success)
            } else {
                setApiStatus(apiStatusConstants.failure)
            }
        } catch (error) {
            console.error(error)
            setApiStatus(apiStatusConstants.failure)
        }
    }, []) // Dependency array is empty

    // useEffect for initial mount and retry
    useEffect(() => {
        getGamingVideos()
    }, [getGamingVideos])

    // Add the retry functionality
    const onRetry = useCallback(() => {
        getGamingVideos()
    }, [getGamingVideos])

    // --- Tailwind Theme Variables ---
    const mainBgColor = isDark ? 'bg-gray-900' : 'bg-gray-50'
    const headerBgColor = isDark ? 'bg-gray-800' : 'bg-gray-100'
    const headerTextColor = isDark ? 'text-white' : 'text-gray-900'
    const iconCircleBg = isDark ? 'bg-gray-700' : 'bg-gray-200'
    const iconColor = 'text-red-600' // Icon color
    const contentBgColor = isDark ? 'bg-gray-900' : 'bg-white'
    const textColor = isDark ? 'text-white' : 'text-gray-800'

    const failureImg = isDark
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

    // Function to render content based on API status
    const renderGamingContent = () => {
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
                    // .gaming-videos-list
                    <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 list-none p-0 m-0">
                        {gamingVideosList.map(video => (
                            <Game key={video.id} details={video} />
                        ))}
                    </ul>
                )
            default:
                return null
        }
    }

    return (
        <div className={`w-full ${mainBgColor}`} data-testid="gaming" style={{ minHeight: '100vh' }}>
            <Header />
            {/* .trending-main-cont (Reused for main layout) */}
            <div className="flex w-full min-h-[calc(100vh-60px)] flex-col md:flex-row">
                <NavBar />
                {/* .gaming-content-cont */}
                <div className="flex-grow w-full pb-10">

                    {/* Gaming Header Section */}
                    {/* .gaming-header */}
                    <div
                        className={`flex items-center px-5 py-6 sm:px-10 w-full ${headerBgColor}`}
                    >
                        {/* .gaming-icon-cont */}
                        <div
                            className={`flex justify-center items-center w-14 h-14 rounded-full mr-4 flex-shrink-0 ${iconCircleBg}`}
                        >
                            <SiYoutubegaming className={`text-3xl ${iconColor}`} />
                        </div>
                        <h1 className={`text-2xl font-bold sm:text-3xl m-0 ${headerTextColor}`}>Gaming</h1>
                    </div>

                    {/* Videos Section */}
                    {/* .gaming-videos-section */}
                    <div className="px-5 sm:px-10 py-5" style={{ backgroundColor: contentBgColor }}>
                        {renderGamingContent()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Gaming