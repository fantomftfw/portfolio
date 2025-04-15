# Minecraft Portfolio Architecture

This document outlines the architecture and implementation details of the Minecraft-themed 3D portfolio website.

## Project Structure

```
minecraft-portfolio/
├── public/               # Static assets
│   ├── fonts/            # Custom Minecraft-style font
│   ├── models/           # 3D models (GLTF)
│   └── textures/         # Texture images for 3D elements
├── src/                  # Source code
│   ├── app/              # Next.js App Router
│   │   ├── globals.css   # Global styles
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Main page component
│   ├── components/       # React components
│   │   ├── loading.tsx   # Loading screen
│   │   ├── minecraft-scene.tsx    # 3D scene with Three.js
│   │   ├── responsive-container.tsx # Responsive wrapper
│   │   └── ui.tsx        # UI overlay components
│   └── lib/              # Utility functions and types
│       └── types.ts      # TypeScript type definitions
├── .gitignore            # Git ignore file
├── next.config.js        # Next.js configuration
├── package.json          # Project dependencies
├── postcss.config.js     # PostCSS configuration
├── README.md             # Project documentation
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Key Components

### 1. Main Page (`src/app/page.tsx`)
The entry point that coordinates loading the 3D scene and UI components.

### 2. Minecraft Scene (`src/components/minecraft-scene.tsx`)
Handles the 3D rendering with:
- Canvas setup with React Three Fiber
- Camera controls and positioning
- Loading and displaying the 3D model
- Minecraft-style voxel decorations
- Lighting setup

### 3. UI Overlay (`src/components/ui.tsx`)
Provides the portfolio content with:
- Navigation between sections
- Portfolio information display
- Responsive layout for different screen sizes
- Accessibility features

### 4. Responsive Container (`src/components/responsive-container.tsx`)
Handles responsive behavior for different device sizes:
- Detects mobile vs desktop
- Adjusts styles based on screen size
- Optimizes layout for different devices

### 5. Types (`src/lib/types.ts`)
Defines TypeScript types used throughout the application.

## Technologies

- **Next.js**: React framework for server-side rendering and routing
- **Three.js**: 3D graphics library
- **React Three Fiber**: React renderer for Three.js
- **React Three Drei**: Helper components for React Three Fiber
- **TypeScript**: Static type checking
- **Tailwind CSS**: Utility-first CSS framework

## Implementation Details

### 3D Scene
- Uses the GLTF model loader to import and display the scene model
- Implements smooth camera transitions between sections
- Adds Minecraft-style blocks using simple geometry
- Applies material modifications to make the scene look more blocky

### UI
- Implements a tabbed navigation system
- Displays portfolio content based on the active section
- Uses a Minecraft-inspired color scheme and aesthetics
- Ensures accessibility with keyboard navigation and ARIA attributes

### Responsive Design
- Adapts layout for mobile and desktop devices
- Optimizes 3D rendering for different device capabilities
- Uses Tailwind's responsive classes for UI adaptation

### Performance Optimizations
- Uses dynamic imports with Next.js for code splitting
- Implements React Suspense for loading states
- Optimizes 3D rendering with appropriate level of detail
- Minimizes render cycles with React hooks 