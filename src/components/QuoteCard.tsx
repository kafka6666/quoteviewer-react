import React, { useRef, useState } from 'react';
import { Quote } from '../types/quote';
import Button from './Button';
import { exportQuoteAsImage } from '../utils/exportUtils';

interface QuoteCardProps {
  quote: Quote;
  onNewQuote: () => void;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, onNewQuote }) => {
  const quoteCardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const copyToClipboard = () => {
    const textToCopy = `"${quote.content}" - ${quote.author}`;
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        alert('Quote copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy:', err);
      });
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`"${quote.content}" - ${quote.author}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const handleExport = async () => {
    if (isExporting) return; // Prevent multiple clicks
    
    setExportError(null);
    
    try {
      setIsExporting(true);
      
      // Log DOM details for debugging
      console.log('Export button clicked, element details:', {
        ref: quoteCardRef.current,
        isConnected: quoteCardRef.current?.isConnected,
        dimensions: quoteCardRef.current ? {
          offsetWidth: quoteCardRef.current.offsetWidth,
          offsetHeight: quoteCardRef.current.offsetHeight,
          clientWidth: quoteCardRef.current.clientWidth,
          clientHeight: quoteCardRef.current.clientHeight,
          children: quoteCardRef.current.children.length
        } : 'No dimensions available'
      });
      
      if (!quoteCardRef.current) {
        console.error('Quote card reference is null');
        setExportError('Could not find quote element to export');
        return;
      }

      // Ensure the element has dimensions
      if (quoteCardRef.current.offsetWidth === 0 || quoteCardRef.current.offsetHeight === 0) {
        console.error('Element has zero dimensions', {
          width: quoteCardRef.current.offsetWidth,
          height: quoteCardRef.current.offsetHeight
        });
        setExportError('Quote card has invalid dimensions. Please try again.');
        return;
      }
      
      // Try to export
      await exportQuoteAsImage(quoteCardRef);
      console.log('Export completed successfully');
      
    } catch (error) {
      console.error('Error in handleExport:', error);
      
      // Try to log more detailed information
      if (error instanceof Error) {
        console.error('Error details:', {
          name: error.name,
          message: error.message,
          stack: error.stack
        });
        setExportError(`Export failed: ${error.message}`);
      } else {
        console.error('Unknown error type:', typeof error);
        setExportError('Export failed with an unknown error');
      }
      
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div 
      ref={quoteCardRef}
      className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-xl p-6 md:p-8 max-w-2xl w-full relative overflow-hidden"
      style={{ minHeight: '200px' }}
    >
      <div className="mb-6">
        <blockquote className="text-xl md:text-2xl font-medium text-gray-800 mb-4">
          "{quote.content}"
        </blockquote>
        <footer className="text-right">
          <cite className="text-gray-600 font-medium text-lg md:text-xl not-italic">
            — {quote.author}
          </cite>
        </footer>
      </div>
      
      <div className="flex flex-wrap gap-3 justify-between mt-6">
        <Button onClick={onNewQuote} className="flex-1">
          New Quote
        </Button>
        
        <div className="flex gap-2">
          <Button 
            variant="icon" 
            onClick={copyToClipboard}
            title="Copy to clipboard"
            className="flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
          </Button>
          
          <Button 
            variant="icon" 
            onClick={shareOnTwitter}
            title="Share on Twitter"
            className="flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </Button>
          
          <Button 
            variant="icon" 
            onClick={handleExport}
            title="Export as image"
            className="flex items-center justify-center"
            disabled={isExporting}
          >
            {isExporting ? (
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            )}
          </Button>
        </div>
      </div>
      
      {exportError && (
        <div className="mt-4 text-red-600 text-sm">
          {exportError}
        </div>
      )}
    </div>
  );
};

export default QuoteCard;
