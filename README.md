# Virtualized Masonry grid layout

### This project is a React TypeScript application built with Vite.js.

## Technologies Used

- React
- TypeScript
- Vite.js
- Styled Components
- Jest (for testing)

## Features

- **Pages:**
    - Images: Displays a collection of images in a virtualized masonry grid layout.
    - Image Details: Shows detailed information about a selected image.


# Optimization

### 1. **Virtualized Masonry Grid**

  - Implemented a virtualized masonry grid to efficiently render large sets of images.
  - Only loaded and rendered images that are within or near the viewport, reducing memory usage and improving performance.

### 2. **Lazy Loading**

- Utilized the Intersection Observer API to implement lazy loading of images.
- Images are loaded only when they come into the viewport, reducing initial load time and bandwidth usage.

### 3. **Image Optimization**

- Used optimal image sizes based on the viewport and column width.
- Implemented WebP and AVIF image formats for better compression and faster loading.
- Utilized srcset and sizes attributes for responsive images, ensuring the right image size is loaded for each device.

### 4. **Efficient Data Fetching**

   - Implemented pagination to fetch images in smaller batches.
   - Used a buffer system to preload images before they're needed, providing a smooth scrolling experience.

### 5. **State Management**

   - Used React's useState and useRef hooks for efficient state management.
   - Implemented useCallback to memoize functions and prevent unnecessary re-renders.

### 6. **Error Handling**

   - Implemented a custom error handler to manage and display errors effectively without impacting performance.

### 7. **Performance Monitoring**

   - Utilized Lighthouse, automated tool for improving web page quality.
   - Conducted regular Lighthouse audits throughout the development process, resulting in a stellar performance score of 95-100%.

### 8. **Responsive Design**

   - Adjusted the number of columns based on screen size for optimal layout on different devices.



## Getting Started

### Installation

### 1. Clone the repository:

 ```sh
  git clone https://github.com/MherDarbinyan3/masonry-grid.git
```

### 2. Navigate to the project directory:

```sh
  cd masonry-grid
```

### 3. Install dependencies:

```sh
  npm install
```

#### or

```sh
  yarn install
```

## Running the Application

### To start the development server:

```sh
  npm run dev
```

#### or

```sh
  yarn dev
```

#### Visit `http://localhost:3000` in your browser to view the application.

## Building for Production

#### To build the project for production:

```sh
  npm run build
```

#### or

```sh
  yarn build
```

## Production Preview

### To preview the production build:

```sh
  npm run preview
```

#### or

```sh
  yarn preview
```


## Running Tests

### To execute the test suite:

```sh
  npm test
```

#### or

```sh
  yarn test
```

## Contact

### Mher Darbinyan - mher.darbinyan89@gmail.com

### Project Link: [https://github.com/MherDarbinyan3/masonry-grid](https://github.com/MherDarbinyan3/masonry-grid)
   
