const FontLoader = () => {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Eczar:wght@400;500;600;700&family=Poppins:wght@300;400;500;600&family=Rozha+One&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      <style>
        {`
          body {
            font-family: 'Poppins', sans-serif;
          }
          
          .font-eczar {
            font-family: 'Eczar', serif;
          }
          
          .font-poppins {
            font-family: 'Poppins', sans-serif;
          }
          
          .font-rozha {
            font-family: 'Rozha One', serif;
          }
          
          .nav-link {
            position: relative;
          }
          
          .nav-link::after {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: -2px;
            left: 0;
            background-color: hsl(var(--saffron));
            transition: width 0.3s ease;
          }
          
          .nav-link:hover::after {
            width: 100%;
          }
          
          .ornate-border {
            position: relative;
          }
          
          .ornate-border::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 8px;
            background: linear-gradient(90deg, transparent, hsl(var(--gold)), transparent);
          }
          
          .hero-text-shadow {
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          }
          
          @media (max-width: 768px) {
            .story-card .card-content {
              opacity: 1 !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default FontLoader;
