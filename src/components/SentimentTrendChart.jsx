import trendData from "../data/sentiment_trend_monthly.json";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

export default function SentimentTrendChart() {
  return (
    <div className="card sentiment-trend-chart" id="sentiment-trend">
      <h2>Sentiment Trend</h2>

      <ResponsiveContainer
        width="100%"
        height={400}
      >
        <LineChart data={trendData}>

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis dataKey="month"
          tick={{ fill: "#ffffff" }}
          />

          <YAxis tick={{ fill: "#ffffff" }} />

          <Tooltip 
            formatter={(value) => value.toLocaleString()}
            contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: "600",
                boxShadow:
                "0 10px 25px rgba(0,0,0,0.35)"
            }}
          />

          <Legend />

          <Line
            type="monotone"
            dataKey="Positive"
            stroke="#22c55e"
            strokeWidth={3}
          />

          <Line
            type="monotone"
            dataKey="Neutral"
            stroke="#9ba6b6"
            strokeWidth={3}
          />

          <Line
            type="monotone"
            dataKey="Negative"
            stroke="#ef4444"
            strokeWidth={3}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}