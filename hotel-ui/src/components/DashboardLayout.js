import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardStats from "./DashboardStats";

function DashboardLayout({ title, subtitle, cards, children }) {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const quickActions = [
    { icon: "🔔", label: "Notifications", color: "bg-yellow-500" },
    { icon: "⚙️", label: "Settings", color: "bg-gray-500" },
    { icon: "📊", label: "Reports", color: "bg-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Quick Actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="animate-slide-down">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-2">
              {title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {subtitle}
            </p>
            <div className="flex items-center mt-4 space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <span>{greeting},</span>
              <span className="font-semibold text-primary-600">
                {currentTime.toLocaleTimeString()}
              </span>
            </div>
          </div>

          <div className="flex space-x-3 mt-4 md:mt-0">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className={`w-10 h-10 rounded-xl ${action.color} text-white flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-xl animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="text-lg">{action.icon}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <DashboardStats />

        {/* Hotel Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="luxury-card overflow-hidden group">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80https://unsplash.com/s/photos/hotel-building-sea-viewhttps://unsplash.com/s/photos/ocean-view-hotel"
                  alt="Hotel"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-3xl font-display font-bold mb-2">AKSuites Luxury Hotel</h3>
                  <p className="flex items-center">
                    <span className="mr-2">📍</span> AK Suites, Malabar Hills, Mumbai MH 400006
                 </p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-luxury-gold text-2xl">★★★★★</span>
                    <span className="text-gray-600 dark:text-gray-400">5.0 (2.5k+ reviews)</span>
                  </div>
                  <span className="badge badge-luxury">Premium Hotel</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Experience unparalleled luxury and comfort at AKSuites. 
                  Our world-class amenities and dedicated staff ensure an unforgettable stay for every guest.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { icon: "🏊", label: "Infinity Pool", value: "Open 6AM - 10PM" },
              { icon: "💪", label: "Fitness Center", value: "24/7 Access" },
              { icon: "🍽️", label: "Fine Dining", value: "7AM - 11PM" },
              { icon: "💆", label: "Spa", value: "9AM - 8PM" }
            ].map((item, index) => (
              <div key={index} className="luxury-card p-4 flex items-center space-x-4 group hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{item.label}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mb-8">
          <h2 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <div
                key={index}
                onClick={card.onClick}
                className="dashboard-card group cursor-pointer animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {card.icon || "📌"}
                  </div>
                  <span className="text-3xl opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">
                    →
                  </span>
                </div>
                <h3 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity (optional slot for children) */}
        {children && (
          <div className="mt-8">
            <h2 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mb-6">
              Recent Activity
            </h2>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardLayout;