import { useEffect, useState } from "react";
import { getRooms } from "../services/roomService";

function DashboardStats() {
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    booked: 0,
    occupancyRate: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const rooms = await getRooms();
      const total = rooms.length;
      const available = rooms.filter(r => r.status === "AVAILABLE").length;
      const booked = rooms.filter(r => r.status === "BOOKED").length;
      const occupancyRate = total > 0 ? Math.round((booked / total) * 100) : 0;
      
      setStats({ total, available, booked, occupancyRate });
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Rooms",
      value: stats.total,
      icon: "🏨",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      textColor: "text-blue-600 dark:text-blue-400"
    },
    {
      title: "Available Rooms",
      value: stats.available,
      icon: "✅",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      textColor: "text-green-600 dark:text-green-400"
    },
    {
      title: "Booked Rooms",
      value: stats.booked,
      icon: "📅",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      textColor: "text-orange-600 dark:text-orange-400"
    },
    {
      title: "Occupancy Rate",
      value: `${stats.occupancyRate}%`,
      icon: "📊",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      textColor: "text-purple-600 dark:text-purple-400"
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="stat-card animate-pulse">
            <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className="stat-card group hover:scale-105 transition-all duration-300 animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                {stat.title}
              </p>
              <p className={`text-3xl font-bold ${stat.textColor}`}>
                {stat.value}
              </p>
            </div>
            <div className={`w-14 h-14 rounded-2xl ${stat.bgColor} flex items-center justify-center text-3xl transform group-hover:rotate-12 transition-transform duration-300`}>
              {stat.icon}
            </div>
          </div>
          <div className="mt-4 h-1 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-500`}
              style={{ 
                width: stat.title === "Occupancy Rate" ? stats.occupancyRate + '%' : 
                       stat.title === "Available Rooms" ? (stats.available / stats.total) * 100 + '%' :
                       stat.title === "Booked Rooms" ? (stats.booked / stats.total) * 100 + '%' : '100%'
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardStats;