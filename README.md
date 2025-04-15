# Minecraft-themed 3D Portfolio

A 3D portfolio website inspired by Hassan Karrach's portfolio but with Minecraft-style blocky graphics using Three.js and Next.js.

## Features

- Interactive 3D Minecraft-themed workspace with desk, computer, and decorative elements
- Blocky voxel-based graphics with distinctive Minecraft pixel textures
- Interactive elements that respond to user input (hovering, clicking)
- Smooth camera movements between different sections
- Clean UI overlay with portfolio information
- Responsive design that works on both desktop and mobile
- Optimized 3D rendering with React Three Fiber

## Sections

- Home - Main introduction
- About - Personal information
- Projects - Showcase of past work
- Skills - Technologies and capabilities
- Contact - How to get in touch

## Technology Stack

- Next.js - React framework
- Three.js - 3D graphics library
- React Three Fiber - React renderer for Three.js
- React Three Drei - Useful helpers for React Three Fiber
- TypeScript - Type safety
- Tailwind CSS - Styling

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd minecraft-portfolio
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
# Use the start.bat file or run:
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

The project has been organized to follow best practices for Next.js development:

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
├── ARCHITECTURE.md       # Detailed architecture documentation
├── start.bat             # Shortcut to start the development server
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Build for Production

```bash
npm run build
# or
yarn build
```

## License

This project is open source and available under the MIT License.

## Credits

- 3D Model: scene.gltf (included in the repository)
- Inspiration: Hassan Karrach's portfolio (https://www.hassankarrach.me/)
- Minecraft is a trademark of Mojang Studios. This project is not affiliated with or endorsed by Mojang. 