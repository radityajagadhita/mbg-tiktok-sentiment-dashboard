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
    <div className="card sentiment-trend-chart">
      <h2>📈 Sentiment Trend</h2>

      <ResponsiveContainer
        width="100%"
        height={400}
      >
        <LineChart data={trendData}>

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip 
          formatter={(value) => value.toLocaleString()}
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
            stroke="#64748b"
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