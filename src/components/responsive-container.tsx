'use client'

import React, { useState, useEffect } from 'react'

// Constants for device breakpoints
const BREAKPOINTS = {
  MOBILE: 768,
}

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
}

const ResponsiveContainer = ({ children, className = '' }: ResponsiveContainerProps) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check initial screen size
    const checkMobile = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.MOBILE)
    }
    
    // Set initial state
    checkMobile()
    
    // Add resize listener
    window.addEventListener('resize', checkMobile)
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Additional class based on device
  const deviceClass = isMobile ? 'is-mobile' : 'is-desktop'

  return (
    <div className={`responsive-container ${deviceClass} ${className}`}>
      {children}
      
      {/* Add custom responsive styles */}
      <style jsx global>{`
        .is-mobile .hide-on-mobile {
          display: none;
        }
        
        .is-desktop .hide-on-desktop {
          display: none;
        }
        
        @media (max-width: ${BREAKPOINTS.MOBILE}px) {
          .responsive-container {
            overflow-x: hidden;
          }
        }
      `}</style>
    </div>
  )
}

export default ResponsiveContainer 