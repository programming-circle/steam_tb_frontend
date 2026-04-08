# NovaPlay Frontend

A modern React game store landing page inspired by Steam structure, but redesigned with a distinct neon teal / cyan visual style.

## Features

- Responsive top navigation with logo, menu, search, and sign-in button
- Working mobile burger menu with smooth slide-in animation
- Large hero / cover showcase with rotating featured slides
- Featured games horizontal scroll section
- Game cards grid with hover interactions
- Category pills for quick browsing
- Personalized recommendations section
- News / updates cards
- Smooth anchor navigation between sections
- Clean React functional component structure

## Tech Stack

- React
- JavaScript
- JSX
- CSS
- Create React App

## Project Structure

```text
src/
  components/
    Navbar.js
    StoreSections.js
  data/
    storeData.js
  App.js
  App.css
  index.js
  index.css
```

## Run the Project

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

This project is based on Create React App, so the correct dev command is `npm start` rather than `npm run dev`.

Create a production build:

```bash
npm run build
```

## Notes

- The development server runs with HTTPS because the current `package.json` script uses:
  ```json
  "start": "HTTPS=true react-scripts start"
  ```
- If your browser shows a certificate/security warning on local launch, this is expected for local HTTPS in development.

## Design Direction

The layout recreates the overall storefront feeling from the provided references:

- large cinematic hero area
- dark gaming UI panels
- teal / cyan glow accents
- storefront content blocks
- modern card-based sections
- mobile-first responsive behavior
