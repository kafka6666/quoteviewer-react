import { useRef } from 'react'
import './App.css'
import { useQuote } from './hooks/useQuote'
import { useRandomBackground } from './hooks/useRandomBackground'
import QuoteCard from './components/QuoteCard'

function App() {
  const { quote, loading, error, getRandomQuote } = useQuote();
  const { backgroundUrl, getRandomBackground } = useRandomBackground();
  const appRef = useRef<HTMLDivElement>(null);

  const handleNewQuote = () => {
    getRandomQuote();
    getRandomBackground(); // the random background image feature isn't working properly
  };

  return (
    <div
      ref={appRef}
      className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-cover bg-center transition-all duration-700 ease-in-out"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      
      <main className="relative z-10 w-full max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
          QuoteViewer
        </h1>
        
        {loading && (
          <div className="bg-white bg-opacity-90 rounded-lg shadow-xl p-6 flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500" />
          </div>
        )}
        
        {error && (
          <div className="bg-white bg-opacity-90 rounded-lg shadow-xl p-6 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={getRandomQuote}
              className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
        
        {!loading && !error && quote && (
          <QuoteCard quote={quote} onNewQuote={handleNewQuote} />
        )}
        
        <footer className="mt-8 text-center text-sm text-white text-opacity-80">
          <p>Built with React, TypeScript & Tailwind CSS</p>
        </footer>
      </main>
    </div>
  )
}

export default App
