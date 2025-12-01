import React from 'react'

const NxtWatchContext = React.createContext({
  isDark: false,
  savedVideos: [],
  toggleSaveVideo: () => {},
  toggleBtn: () => {},
})

export default NxtWatchContext
