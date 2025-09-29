# Design-Your-Space

Design Your Space is an interactive React web app that lets users visually design a room by dragging, dropping, moving, resizing, and deleting furniture items. The app features a custom UI, a drag-and-drop canvas, and a dynamic furniture palette for each room.

## The Design of the Program

The design-your-space program is built with ReactJS, CSS, and Vite. 

## Features

Room Selection: Choose a room to decorate (e.g., bedroom, living room, office).
Furniture Palette: Select from a variety of furniture images for each room.
Drag & Drop Canvas: Drag furniture onto the canvas, move them around, and resize them.
Delete Items: Remove items by dragging them into the trashcan icon.
Responsive UI: Modern, clean design built with React and CSS.
State Management: Uses React hooks for state and position tracking.

## How It Works
1. Select a room using the room selector.
2. Browse the furniture palette and drag items into the canvas.
3. Move and resize items freely within the canvas.
4. To remove an item, drag it into the trashcan at the bottom right.
5. The layout is managed in real time using React state.

## URL
Live Demo: https://designyourspace.netlify.app/

## Learnings
1. Named Exports: Use export const for named exports and import with curly braces.
2. useRef in React: Persist mutable values across renders without causing re-renders.
3. Drag-and-Drop: Implemented custom drag, drop, and resize logic using React hooks.

## Resources
- Canva Images from Sparklestroke Global
- React DnD (https://react-dnd.github.io/react-dnd/about)
- useRef (https://react.dev/reference/react/useRef)
- icons8 (https://icons8.com/)

## Author
Website - Laura V
Frontend Mentor - @lavollmer
Github - @lavollmer