chrome.runtime.onInstalled.addListener(() => {
    // Service worker registration
    if ('serviceWorker' in navigator) {
      try {
        navigator.serviceWorker.register('background.js');
        console.log('Service worker registered successfully.');
      } catch (error) {
        console.error('Service worker registration failed:', error);
      }
    } else {
      console.warn('Service workers are not supported.');
    }
  });
  
