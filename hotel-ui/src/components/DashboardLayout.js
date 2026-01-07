import "../styles/dashboard.css";
import DashboardStats from "./DashboardStats";


function DashboardLayout({ title, subtitle, cards }) {
  return (
    <div className="dashboard-container">

      {/* HERO SECTION */}
      <div className="dashboard-hero">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <DashboardStats />

      {/* INFO SECTION */}
      <div className="dashboard-info">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
          alt="Hotel"
        />
        <div>
          <h2>Welcome to Our Hotel</h2>
          <p>
            Experience luxury, comfort, and world-class hospitality.
            Our hotel management system ensures seamless booking,
            room availability, and customer satisfaction.
          </p>
        </div>
      </div>

      {/* FEATURE CARDS */}
      <div className="dashboard-cards">
        {cards.map((card, index) => (
          <div
            key={index}
            className="dashboard-card"
            onClick={card.onClick}
          >
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default DashboardLayout;
