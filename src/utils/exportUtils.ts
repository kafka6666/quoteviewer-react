import html2canvas from 'html2canvas';
import { domToImageOptions } from './domToImageFallback';

export const exportQuoteAsImage = async <T extends HTMLElement>(elementRef: React.RefObject<T | null>): Promise<void> => {
  if (!elementRef.current) {
    const error = new Error('Element reference is not available');
    console.error('Export error: Element not found', { error });
    throw error;
  }

  try {
    console.log('Starting export process with element dimensions:', {
      width: elementRef.current.offsetWidth,
      height: elementRef.current.offsetHeight,
      childNodes: elementRef.current.childNodes.length
    });
    
    // Try direct capture first (simpler approach)
    try {
      console.log('Attempting direct capture method');
      const canvas = await html2canvas(elementRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: true
      });
      
      console.log('Canvas created with dimensions:', {
        width: canvas.width,
        height: canvas.height
      });
      
      downloadCanvas(canvas);
      return;
    } catch (directCaptureError) {
      console.warn('Direct capture failed, trying alternative method', directCaptureError);
      // Continue to alternative method
    }
    
    // Alternative method with cloning (if direct method fails)
    try {
      console.log('Using clone method as fallback');
      // Give the browser a moment to ensure the element is fully rendered
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Clone the node to avoid any issues with element being in the DOM
      const clone = elementRef.current.cloneNode(true) as HTMLElement;
      
      // Make sure the clone has the same dimensions and styles
      clone.style.width = `${elementRef.current.offsetWidth}px`;
      clone.style.height = `${elementRef.current.offsetHeight}px`;
      clone.style.position = 'absolute';
      clone.style.top = '-9999px';
      clone.style.left = '-9999px';
      
      document.body.appendChild(clone);
      console.log('Clone appended with dimensions:', {
        width: clone.offsetWidth,
        height: clone.offsetHeight
      });
      
      try {
        const canvas = await html2canvas(clone, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: true,
          onclone: (_) => {
            console.log('Document cloned for html2canvas');
            return Promise.resolve();
          }
        });
        
        // Clean up by removing the clone after capture
        document.body.removeChild(clone);
        
        console.log('Canvas created with dimensions:', {
          width: canvas.width,
          height: canvas.height
        });
        
        downloadCanvas(canvas);
        return;
      } catch (cloneError) {
        // Make sure to clean up even if there's an error
        if (document.body.contains(clone)) {
          document.body.removeChild(clone);
        }
        throw cloneError;
      }
    } catch (cloneMethodError) {
      console.warn('Clone method failed, trying domToImage fallback', cloneMethodError);
      // Continue to final fallback
    }
    
    // Final fallback using our simplified domToImage method
    console.log('Using domToImage as final fallback method');
    const canvas = await domToImageOptions(elementRef.current, {
      scale: 2,
      bgcolor: '#ffffff'
    });
    
    console.log('domToImage fallback canvas created with dimensions:', {
      width: canvas.width,
      height: canvas.height
    });
    
    downloadCanvas(canvas);
    
  } catch (error) {
    console.error('Error exporting quote as image:', error);
    
    // Try to log more detailed information
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    } else {
      console.error('Unknown error type:', typeof error);
    }
    
    alert('Failed to export the quote as an image. Please try again.');
    throw error;
  }
};

// Helper function to handle canvas download
const downloadCanvas = (canvas: HTMLCanvasElement): void => {
  try {
    // Ensure the canvas has content
    if (canvas.width === 0 || canvas.height === 0) {
      throw new Error('Canvas dimensions are invalid');
    }

    // Create a download link
    const link = document.createElement('a');
    link.download = `quote-${new Date().getTime()}.png`;
    
    try {
      link.href = canvas.toDataURL('image/png');
      console.log('Data URL created successfully');
    } catch (dataUrlError) {
      console.error('Error generating data URL:', dataUrlError);
      throw new Error('Failed to generate image data');
    }
    
    // Append link to document, click, and remove
    document.body.appendChild(link);
    link.click();
    
    // Small timeout before removing the link
    setTimeout(() => {
      document.body.removeChild(link);
      console.log('Image download completed');
    }, 100);
  } catch (downloadError) {
    console.error('Error in downloadCanvas:', downloadError);
    throw downloadError;
  }
};
