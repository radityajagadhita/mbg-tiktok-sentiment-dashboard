import stats from "../data/dashboard_stats.json";

import {
  FaComments,
  FaUsers,
  FaReply,
  FaVideo
} from "react-icons/fa";

export default function KPISection() {

  const cards = [
    {
      title: "Total Comments",
      value: stats.total_comments,
      icon: <FaComments />,
      color: "#3b82f6"
    },
    {
      title: "Total Users",
      value: stats.total_users,
      icon: <FaUsers />,
      color: "#22c55e"
    },
    {
      title: "Total Replies",
      value: stats.total_reply,
      icon: <FaReply />,
      color: "#f59e0b"
    },
    {
      title: "Total Videos",
      value: stats.total_videos,
      icon: <FaVideo />,
      color: "#ef4444"
    }
  ];

  return (
    <div className="kpi-grid">
      {cards.map((card, index) => (
        <div
          key={index}
          className="kpi-card"
          style={{
            borderTop: `4px solid ${card.color}`
          }}
        >
          <div className="kpi-header">
            <span
              className="kpi-icon"
              style={{ color: card.color }}
            >
              {card.icon}
            </span>

            <h3>{card.title}</h3>
          </div>

          <h1>
            {card.value.toLocaleString()}
          </h1>
        </div>
      ))}
    </div>
  );
}