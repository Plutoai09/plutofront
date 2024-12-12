import React, { useEffect } from 'react';

const SandeepMaheshwari = () => {
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

  return (
    <div 
      id="delphi-container" 
      style={{ 
        width: '100%', 
        height: '90vh' 
      }} 
    />
  );
};

export default SandeepMaheshwari;