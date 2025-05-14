# React Vite PWA

This project is a Progressive Web App (PWA) built using React and Vite. It features offline capabilities through asset caching and includes a geolocation feature that allows users to retrieve their current coordinates.

## Features

- **Offline Asset Caching**: The application uses a service worker to cache assets, enabling offline access.
- **Geolocation**: Users can obtain their current latitude and longitude by clicking a button in the feature section. The coordinates are displayed in a card component.

## Project Structure

```
react-vite-pwa
├── public
│   ├── manifest.json
│   ├── robots.txt
│   ├── favicon.ico
│   └── serviceWorker.js
├── src
│   ├── assets
│   │   └── images
│   ├── components
│   │   ├── Card.jsx
│   │   ├── FeatureSection.jsx
│   │   ├── GeolocationCard.jsx
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── hooks
│   │   └── useGeolocation.js
│   ├── pages
│   │   └── Home.jsx
│   ├── utils
│   │   └── cacheUtils.js
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/react-vite-pwa.git
   ```
2. Navigate to the project directory:
   ```
   cd react-vite-pwa
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## Building for Production

To build the application for production, run:
```
npm run build
```

## License

This project is licensed under the MIT License.