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

const CustomTooltip = ({
  active,
  payload,
  label,
}) => {
  if (
    active &&
    payload &&
    payload.length
  ) {
    return (
      <div
        style={{
          background: "#0f172a",
          color: "#ffffff",
          padding: "12px",
          borderRadius: "10px",
          border: "1px solid #334155",
          boxShadow:
            "0 4px 15px rgba(0,0,0,.25)",
        }}
      >
        <div
          style={{
            marginBottom: "6px",
            fontWeight: "600",
          }}
        >
          {new Date(label).toLocaleDateString(
            "id-ID",
            {
              day: "numeric",
              month: "long",
              year: "numeric",
            }
          )}
        </div>

        <div>
          Comments:
          <strong>
            {" "}
            {payload[0].value.toLocaleString()}
          </strong>
        </div>
      </div>
    );
  }

  return null;
};

export default function ActivityLineChart() {
  return (
    <div className="card">
          <h2>📈 Daily Activity</h2>
          <br/>

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
            tick={{ fill: "#000000" }}
            tickLine={false}
          />

          <Tooltip
            content={<CustomTooltip />}
            />

          <Area
            type="monotone"
            dataKey="count"
            name=""
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
            color: "#000000",
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