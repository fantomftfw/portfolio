'use client'

import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Loading from '../components/loading'
import ResponsiveContainer from '../components/responsive-container'
import MinecraftScene from '../components/minecraft-scene'
import { navigationSections } from '../data/navigation'
import PortfolioContent from '../components/portfolio-content'

// Dynamically import the 3D scene component to avoid SSR issues with Three.js
const MinecraftSceneComponent = dynamic(() => import('../components/minecraft-scene'), {
  ssr: false,
  loading: () => <Loading />
})

// Dynamically import UI components
const UI = dynamic(() => import('../components/simple-ui'), {
  ssr: false
})

export default function Home() {
  return (
    <ResponsiveContainer className="w-full h-screen">
      <main className="flex min-h-screen flex-col items-center justify-between">
        {/* 3D Minecraft Scene - 34% width */}
        <MinecraftScene />
        
        {/* Portfolio Content - 66% width */}
        <PortfolioContent />
      </main>
    </ResponsiveContainer>
  )
} 