/**
 * DOM to Image Fallback
 * 
 * A simple fallback for html2canvas using the browser's built-in drawing capabilities.
 * This is a less feature-rich but more reliable alternative when html2canvas fails.
 */

export const domToImage = async (element: HTMLElement): Promise<HTMLCanvasElement> => {
  return new Promise((resolve, reject) => {
    try {
      console.log('Using domToImage fallback');
      
      // Get element dimensions
      const rect = element.getBoundingClientRect();
      
      if (rect.width === 0 || rect.height === 0) {
        reject(new Error('Element has zero dimensions'));
        return;
      }
      
      console.log('Element dimensions:', {
        width: rect.width,
        height: rect.height
      });
      
      // Create a canvas
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      if (!context) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      
      // Set dimensions (use higher resolution for better quality)
      const scale = 2;
      canvas.width = rect.width * scale;
      canvas.height = rect.height * scale;
      
      // Set background to white
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Scale everything
      context.scale(scale, scale);
      
      // Create a clean SVG representation of the element
      const data = new XMLSerializer().serializeToString(element);
      const svg = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svg);
      
      // Load the SVG as an image
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        // Draw the image on the canvas
        context.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
        
        console.log('domToImage fallback completed successfully');
        resolve(canvas);
      };
      
      img.onerror = (error) => {
        URL.revokeObjectURL(url);
        console.error('Image loading error in domToImage fallback:', error);
        
        // Simplified fallback: just draw text representation
        try {
          console.log('Using text-only fallback');
          
          // Reset canvas
          context.fillStyle = '#ffffff';
          context.fillRect(0, 0, canvas.width, canvas.height);
          
          // Draw simple text
          context.fillStyle = '#000000';
          context.font = '16px Arial';
          
          // Get text content
          const text = element.textContent || 'No content';
          const lines = text.split('\n');
          
          lines.forEach((line, index) => {
            context.fillText(line, 10, 20 + (index * 20));
          });
          
          resolve(canvas);
        } catch (textError) {
          reject(textError);
        }
      };
      
      img.src = url;
    } catch (error) {
      console.error('Error in domToImage fallback:', error);
      reject(error);
    }
  });
};

// Create a simplified API similar to html2canvas
export const domToImageOptions = (element: HTMLElement, options: any = {}): Promise<HTMLCanvasElement> => {
  console.log('domToImageOptions called with options:', options);
  return domToImage(element);
};
