# QuoteViewer

A beautiful and responsive web application built with React, TypeScript, and Tailwind CSS that displays random quotes with a modern user interface.

![QuoteViewer Screenshot](./public/QuoteViewer%20-%20001.png)

## Features

- Fetches and displays random quotes from the FreeAPI Quote API
- Modern UI with elegant styling and smooth transitions
- Responsive design that works seamlessly on both mobile and desktop devices
- One-click "New Quote" functionality to fetch fresh quotes
- Copy to clipboard feature for easy sharing
- Direct sharing to Twitter with pre-formatted content
- Export quotes as high-quality PNG images to save on your device
- Background with subtle gradient animations for a pleasant user experience

## Technologies Used

- React 19
- TypeScript 5.7
- Tailwind CSS 4
- Vite 6
- html2canvas for image export
- FreeAPI Quote API

## Getting Started

### Prerequisites

- Node.js (v20 or later recommended)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to http://localhost:5173

## Usage

- Click the "New Quote" button to fetch and display a random quote
- Use the copy icon to copy the quote text to your clipboard
- Click the Twitter icon to share the current quote on Twitter
- Use the export icon to save the quote as a PNG image to your device

## API Usage

This project uses the FreeAPI Quote endpoint to fetch random quotes:

```
GET https://api.freeapi.app/api/v1/public/quotes/quote/random
```

Documentation can be found at [FreeAPI Quote API](https://freeapi.hashnode.space/api-guide/apireference/getARandomQuote)

## Building for Production

To create a production build:

```bash
npm run build
```

The compiled files will be available in the `dist` directory.

## Live Demo

Check out the live version of QuoteViewer deployed on Vercel:

[QuoteViewer Live Demo](paste your link here) 

## Troubleshooting

If you encounter issues with the "Export as Image" feature:
- Make sure your browser allows downloads from the application
- Check the console for detailed error messages
- The application implements multiple fallback methods to ensure export functionality works across different browsers

## License

This project is open source and available under the MIT License.
