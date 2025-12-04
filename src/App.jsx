import React from 'react'
import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import NxtWatchContext from './Context/NxtWatchContext'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import VideoItemDetails from './components/VideoItemDetails'
import SavedVideo from './components/SavedVideo'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/trending',
    element: <Trending />
  },
  {
    path: '/gaming',
    element: <Gaming />
  },
  {
    path: '/videos/:id',
    element: <VideoItemDetails />
  },
  {
    path: '/saved-videos',
    element: <SavedVideo />
  }
])

const App = () => {
  const [isDark, setIsDark] = useState(false)
  const [savedVideos, setSavedVideos] = useState([])

  const toggleSaveVideo = video => {
    setSavedVideos(prevSavedVideos => {
      const isAlreadySaved = prevSavedVideos.find(
        each => each.id === video.id,
      )
      
      if (isAlreadySaved) {
        // remove video
        return prevSavedVideos.filter(
          each => each.id !== video.id,
        )
      }
      // add video
      return [...prevSavedVideos, video]
    })
  }

  const toggleBtn = () => {
    setIsDark(prevIsDark => !prevIsDark)
  }


  return (
    <NxtWatchContext.Provider
      value={{
        isDark,
        savedVideos,
        toggleSaveVideo: toggleSaveVideo,
        toggleBtn: toggleBtn,
      }}
    >
      <RouterProvider basename="/nxt-watch-fbzd.onrender.com" router={router} />
    </NxtWatchContext.Provider>
  )
}

export default App
