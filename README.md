# Portfolio Website

A modern portfolio website built with React, TypeScript, and Three.js.

## Features

- Interactive 3D scene with a computer model displaying projects
- Responsive design that works on all devices
- Smooth animations and transitions
- Sections for About, Experience, Projects, Education, and Contact

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Add your 3D model:
   - Place your `computer.glb` file in the `public/animation/` directory
   - The model should have a screen mesh named "monitor-screen" that can display textures

4. Add project videos:
   - Place MP4 video files in the `public/textures/project/` directory
   - Name them according to your project (e.g., `project1.mp4`, `project2.mp4`, etc.)

5. Start the development server:
   ```
   npm start
   ```

## Project Structure

- `src/components/` - React components
  - `DemoComputer.tsx` - 3D computer model component
  - `ProjectsScene.tsx` - Scene for displaying projects on the computer
  - `Scene.tsx` - Background 3D scene
  - `Navbar.tsx` - Navigation bar
  - `ChatBox.tsx` - Interactive chat component

- `src/constants.ts` - Data for projects, education, and experience

## Customization

- Update project data in `src/constants.ts`
- Modify the 3D scene in `src/components/Scene.tsx`
- Adjust the computer model in `src/components/DemoComputer.tsx`

## Technologies Used

- React
- TypeScript
- Three.js
- React Three Fiber
- GSAP for animations
- Tailwind CSS for styling #   a m i r k h a t i b y d o t c o m 
 
 