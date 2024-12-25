// Charger le script gtag.js de Google Analytics
(function() {
    var script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-BC19206W3T';
    script.async = true;
    document.head.appendChild(script);
  
    // Une fois le script chargé, initialiser gtag
    script.onload = function() {
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-BC19206W3T');
    };
  })();
  