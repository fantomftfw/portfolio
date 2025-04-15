'use client'

import React from 'react'

const Loading = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-minecraft-sky">
      <div className="w-16 h-16 border-t-4 border-white rounded-full animate-spin mb-4"></div>
      <h2 className="text-white text-2xl font-minecraft">Loading world...</h2>
    </div>
  )
}

export default Loading 