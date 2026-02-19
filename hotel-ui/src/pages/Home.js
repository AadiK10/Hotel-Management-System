import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  
  const carouselImages = [
    {
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Luxury Pool",
      subtitle: "Dive into paradise"
    },
    {
      url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Presidential Suite",
      subtitle: "Experience royalty"
    },
    {
      url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", 
      title: "Fine Dining",
      subtitle: "Culinary excellence"
    },
    {
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", 
      title: "Infinity Pool",
      subtitle: "Endless views"
    },
    {
      url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", 
      title: "Luxury Spa",
      subtitle: "Rejuvenate your soul"
    }
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserRole(decoded.role);
      setIsLoggedIn(true);
    }

    // Auto-slide carousel
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const features = [
    {
      icon: "🏨",
      title: "Luxury Rooms",
      description: "Experience comfort like never before with our premium collection of rooms"
    },
    {
      icon: "🍽️",
      title: "Fine Dining",
      description: "World-class cuisine prepared by master chefs from around the globe"
    },
    {
      icon: "💆",
      title: "Spa & Wellness",
      description: "Rejuvenate your mind and body with our exclusive spa treatments"
    },
    {
      icon: "🏊",
      title: "Infinity Pool",
      description: "Take a dip in our stunning infinity pool with panoramic views"
    }
  ];

  const stats = [
    { value: "500+", label: "Happy Guests" },
    { value: "50+", label: "Luxury Rooms" },
    { value: "24/7", label: "Concierge Service" },
    { value: "⭐", label: "5-Star Rating" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Carousel Section */}
      <div className="relative h-screen overflow-hidden">
        {/* Carousel Images */}
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";
              }}
            />
            
            {/* Caption for each slide - MOVED HIGHER to avoid overlap */}
            <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 z-20 text-white text-center">
              <p className="text-lg md:text-xl font-light tracking-widest mb-2 animate-fade-in drop-shadow-lg">
                {image.subtitle}
              </p>
              <p className="text-2xl md:text-3xl font-display font-bold text-luxury-gold drop-shadow-lg">
                {image.title}
              </p>
            </div>
          </div>
        ))}

        {/* Overlay Content - MOVED HIGHER to avoid overlap with indicators */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white px-4 -mt-16">
          <div className="text-center animate-slide-up">
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 drop-shadow-2xl">
              Welcome to <span className="text-luxury-gold">AKSuites</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto drop-shadow-lg">
              Where luxury meets comfort. Experience unparalleled hospitality in the heart of the city.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!isLoggedIn ? (
                <>
                  <Link 
                    to="/register" 
                    className="btn-primary text-lg px-8 py-4 animate-pulse-slow shadow-2xl"
                  >
                    Book Your Stay Now
                  </Link>
                  <Link 
                    to="/login" 
                    className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300 text-lg font-semibold shadow-2xl backdrop-blur-sm"
                  >
                    Sign In
                  </Link>
                </>
              ) : (
                <Link 
                  to={userRole === 'ROLE_ADMIN' ? '/admin' : userRole === 'ROLE_RECEPTIONIST' ? '/reception' : '/customer'}
                  className="btn-primary text-lg px-8 py-4 shadow-2xl"
                >
                  Go to Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
        >
          <span className="text-2xl">←</span>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
        >
          <span className="text-2xl">→</span>
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-8 bg-luxury-gold' 
                  : 'w-4 bg-white/50 hover:bg-white'
              }`}
            />
          ))}
        </div>
        
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg text-primary-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Experience <span className="text-primary-600">Luxury</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Every moment at AKSuites is crafted to perfection, ensuring an unforgettable stay
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="luxury-card group hover:-translate-y-2 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-8">
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-display font-semibold mb-3 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Luxury Suite"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white px-4">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 animate-slide-up">
            Ready for an <span className="text-luxury-gold">Unforgettable</span> Experience?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Join our premium members and enjoy exclusive benefits, early check-ins, and room upgrades
          </p>
          {!isLoggedIn && (
            <Link 
              to="/register" 
              className="btn-luxury inline-block text-lg animate-pulse-slow"
            >
              Register Now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;