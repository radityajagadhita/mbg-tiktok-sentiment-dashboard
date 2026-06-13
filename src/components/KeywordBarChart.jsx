import keywordData from "../data/top_keywords_final.json";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

export default function KeywordBarChart() {

  const colors = [
    "#3b82f6",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
    "#ec4899",
    "#84cc16",
    "#f97316",
    "#14b8a6",
  ];
  const filteredKeywords = keywordData.filter(
  item =>
    item.keyword &&
          item.keyword.trim() !== "")
      .slice(0, 10);

  return (
    <div className="card">
      <h2>🔥 Top Keywords</h2>

      <ResponsiveContainer width="100%" height={450}>
        <BarChart
          data={filteredKeywords}
          layout="vertical"
          margin={{
            top: 20,
            right: 30,
            left: 30,
            bottom: 10,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#334155"
          />

          <XAxis
            type="number"
            tick={{ fill: "#000000" }}
          />

          <YAxis
            type="category"
            dataKey="keyword"
            tick={{ fill: "#000000" }}
            width={100}
          />

          <Tooltip
            formatter={(value) => [
                value.toLocaleString(),
                "Mentions",
            ]}
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

            labelStyle={{
                color: "#ffffff",
                fontWeight: "700"
            }}

            itemStyle={{
                color: "#38bdf8"
            }}
            />

          <Bar
            dataKey="count"
            radius={[0, 10, 10, 0]}
          >
            {keywordData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  colors[index % colors.length]
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div
        style={{
            marginTop: "15px",
            color: "#020202",
        }}
        >
        Keyword paling dominan adalah{" "}
        <strong>
            {keywordData[0]?.keyword}
        </strong>
        {" "}dengan{" "}
        <strong>
            {keywordData[0]?.count.toLocaleString()}
        </strong>
        {" "}
        kemunculan.
          </div>
          <br/>
    </div>
  );
}