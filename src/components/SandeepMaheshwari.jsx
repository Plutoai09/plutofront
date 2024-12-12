import React, { useEffect } from 'react';

const SandeepMaheshwari = () => {
  useEffect(() => {
    // First, ensure the global delphi configuration is set
    window.delphi = {...(window.delphi ?? {})};
    window.delphi.page = {
      config: "62c8cc36-65c2-452e-9161-acccf764ebb4",
      overrides: {
        landingPage: "CHAT",
      },
      container: {
        width: "100%",
        height: "800px",
      },
    };

    // Create script elements
    const configScript = document.createElement('script');
    configScript.id = 'delphi-page-script';
    configScript.innerHTML = `
      window.delphi = {...(window.delphi ?? {}) };
      window.delphi.page = {
        config: "62c8cc36-65c2-452e-9161-acccf764ebb4",
        overrides: {
          landingPage: "CHAT",
        },
        container: {
          width: "100%",
          height: "800px",
        },
      };
    `;

    const loaderScript = document.createElement('script');
    loaderScript.id = 'delphi-page-bootstrap';
    loaderScript.src = "https://embed.delphi.ai/loader.js";

    // Append scripts to document
    document.head.appendChild(configScript);
    document.head.appendChild(loaderScript);

    // Cleanup function
    return () => {
      document.head.removeChild(configScript);
      document.head.removeChild(loaderScript);
    };
  }, []);

  return (
    <div className="delphi-container" style={{ 
      width: '100%', 
      height: '800px' 
    }}>
      {/* Delphi embed will be inserted here */}
    </div>
  );
};

export default SandeepMaheshwari;