import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const SandeepMaheshwari = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Create the Delphi configuration script
    const delphiPageScript = document.createElement('script');
    delphiPageScript.id = 'delphi-page-script';
    delphiPageScript.innerHTML = `
      window.delphi = {...(window.delphi ?? {}) };
      window.delphi.page = {
        config: "62c8cc36-65c2-452e-9161-acccf764ebb4",
        overrides: {
          landingPage: "OVERVIEW",
        },
        container: {
          width: "100%",
          height: "90vh",
        },
      };
    `;
    document.body.appendChild(delphiPageScript);

    // Create the Delphi bootstrap script
    const delphiBootstrapScript = document.createElement('script');
    delphiBootstrapScript.id = 'delphi-page-bootstrap';
    delphiBootstrapScript.src = "https://embed.delphi.ai/loader.js";
    
    // Add onload and onerror handlers to manage loading state
    delphiBootstrapScript.onload = () => {
      // Wait a bit to ensure Delphi is fully initialized
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };
    
    delphiBootstrapScript.onerror = () => {
      console.error('Failed to load Delphi integration');
      setIsLoading(false);
    };

    document.body.appendChild(delphiBootstrapScript);

    // Cleanup function to remove scripts when component unmounts
    return () => {
      const existingPageScript = document.getElementById('delphi-page-script');
      const existingBootstrapScript = document.getElementById('delphi-page-bootstrap');
      
      if (existingPageScript) {
        document.body.removeChild(existingPageScript);
      }
      
      if (existingBootstrapScript) {
        document.body.removeChild(existingBootstrapScript);
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount

  // Loading screen component
  const LoadingScreen = () => (
    <div className="flex items-center justify-center w-full h-90vh">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
        <p className="text-lg text-gray-600">Loading Delphi Integration...</p>
      </div>
    </div>
  );

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div 
          id="delphi-container" 
          style={{ 
            width: '100%', 
            height: '90vh' 
          }} 
        />
      )}
    </>
  );
};

export default SandeepMaheshwari;