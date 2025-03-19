import { useState, useEffect, useCallback } from 'react';
import { Quote } from '../types/quote';
import { fetchRandomQuote } from '../services/quoteService';

export const useQuote = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getRandomQuote = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetchRandomQuote();
      if (response.statusCode === 200 && response.data) {
        setQuote(response.data);
      } else {
        setError('Failed to fetch quote');
      }
    } catch (err) {
      setError('An error occurred while fetching the quote');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getRandomQuote();
  }, [getRandomQuote]);

  return {
    quote,
    loading,
    error,
    getRandomQuote
  };
};
