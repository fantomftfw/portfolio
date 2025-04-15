import './globals.css'
import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Minecraft Portfolio',
  description: 'A 3D portfolio website built with Next.js, Three.js in Minecraft style',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 