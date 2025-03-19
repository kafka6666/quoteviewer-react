import { QuoteApiResponse } from '../types/quote';

const API_URL = 'https://api.freeapi.app/api/v1/public/quotes/quote/random';

export const fetchRandomQuote = async (): Promise<QuoteApiResponse> => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Ensure the response data is correctly formatted
    if (data && data.statusCode === 200 && data.data) {
      // Convert id to _id if needed
      if (data.data.id && !data.data._id) {
        data.data._id = data.data.id;
      }
      
      // Add any missing fields with defaults
      const formattedData: QuoteApiResponse = {
        status: data.success ? 'success' : 'error',
        statusCode: data.statusCode,
        message: data.message || '',
        data: {
          _id: data.data._id || data.data.id || '',
          content: data.data.content || '',
          author: data.data.author || '',
          tags: data.data.tags || [],
          authorSlug: data.data.authorSlug || '',
          length: data.data.length || 0,
          dateAdded: data.data.dateAdded || '',
          dateModified: data.data.dateModified || '',
        }
      };
      
      return formattedData;
    }
    
    throw new Error('Invalid response format from API');
  } catch (error) {
    console.error('Error fetching quote:', error);
    throw error;
  }
};
