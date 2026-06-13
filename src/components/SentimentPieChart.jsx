import sentimentData from "../data/sentiment_distribution.json";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#64748b", // Neutral
  "#22c55e", // Positive
  "#ef4444", // Negative
];

export default function SentimentPieChart() {

  const total = sentimentData.reduce(
    (sum, item) => sum + item.value,
    0
    );
    
    const dominant = sentimentData.reduce(
    (a, b) => (a.value > b.value ? a : b)
  );

  return (
    <div className="card">
      <h2>😊 Sentiment Distribution</h2>

      <ResponsiveContainer width="100%" height={400}>
        <PieChart>

          <Pie
            data={sentimentData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={60}
            label={({ name, percent }) =>
              `${(percent * 100).toFixed(1)}%`
            }
          >
            {sentimentData.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip
            formatter={(value) => [
              value.toLocaleString(),
              "Comments",
            ]}
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "none",
              borderRadius: "10px",
              color: "#fff",
            }}
          />

          <Legend />

        </PieChart>
      </ResponsiveContainer>

      <div
        style={{
          marginTop: "10px",
          color: "#94a3b8",
          textAlign: "center",
        }}
      >
        Total analyzed comments:
        <strong>
          {" "}
          {total.toLocaleString()}
        </strong>
          </div>
          <div>
        Dominant sentiment:
        <strong>
          {" "}{dominant.name}</strong>
      </div>
      <div>
        
      </div>
    </div>
  );
}