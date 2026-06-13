import activityData from "../data/daily_activity.json";

import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ActivityLineChart() {
  return (
    <div className="card">
      <h2>📈 Daily Activity</h2>

      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={activityData}>
          <defs>
            <linearGradient
              id="activityGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="#3b82f6"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="#3b82f6"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#334155"
          />

          <XAxis
            dataKey="date"
            tickFormatter={(value) =>
                new Date(value).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                })
            }
            />

          <YAxis
            tick={{ fill: "#cbd5e1" }}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "none",
              borderRadius: "10px",
              color: "#fff",
            }}
            formatter={(value) => [
                value.toLocaleString(),
                "Comments",
            ]}
          />

          <Area
            type="monotone"
            dataKey="count"
            stroke="none"
            fill="url(#activityGradient)"
          />

          <Line
            type="monotone"
            dataKey="count"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={false}
            activeDot={{
              r: 7,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
      <p
        style={{
            color: "#94a3b8",
            marginTop: "10px",
        }}
        >
        Peak activity reached{" "}
        <strong>
            {Math.max(...activityData.map(
            item => item.count
            )).toLocaleString()}
        </strong>{" "}
        comments in one day.
          </p>
          <br/>
    </div>
  );
}