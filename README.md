# Minecraft Portfolio

A modern 3D portfolio website with a Minecraft theme. This project combines the immersive feel of a Minecraft-inspired 3D scene with a professional portfolio website.

## Features

- Interactive 3D Minecraft-themed environment
- Smooth camera transitions between sections
- Responsive design with mobile support
- Dark theme with Minecraft-inspired styling
- Sections for showcasing projects, skills, and contact information

## Technologies Used

- Next.js
- React
- Three.js (via React Three Fiber)
- TypeScript
- Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/fantomftfw/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Deployment

This project can be easily deployed to Netlify. Follow the deployment guide in the documentation.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Minecraft for the visual inspiration
- Three.js for the 3D rendering capabilities
- Next.js team for the amazing framework

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

## Credits

- 3D Model: scene.gltf (included in the repository)
- Inspiration: Hassan Karrach's portfolio (https://www.hassankarrach.me/)
- Minecraft is a trademark of Mojang Studios. This project is not affiliated with or endorsed by Mojang. 