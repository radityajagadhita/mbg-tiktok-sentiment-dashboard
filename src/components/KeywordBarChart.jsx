import keywordData from "../data/keyword_sentiment.json";

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


export default function KeywordBarChart({searchTerm = "",
  topN = 10,
  sentimentFilter = "All", }) {
  
  console.log("searchTerm =", searchTerm);
  console.log("typeof =", typeof searchTerm);
  
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
  
  const filteredKeywords = keywordData
  .filter((item) => {

    const keywordMatch =
      item.keyword
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        );

    const sentimentMatch =
      sentimentFilter === "All"
        ? true
        : item.sentiment === sentimentFilter;

    return (
      keywordMatch &&
      sentimentMatch
    );
  })
  .slice(0, topN);

  const dominantKeyword = filteredKeywords[0] ?? keywordData[0] ?? null;

  return (
    <div className="card" id="top-keywords">
      <div className="chart-title-row">
        <div>
          <h2>Top Keywords</h2>
          <p className="chart-subtitle">Peringkat kata dominan dari data komentar terbaru.</p>
        </div>
      </div>

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
            tick={{ fill: "#ffffff" }}
          />

          <YAxis
            type="category"
            dataKey="keyword"
            tick={{ fill: "#ffffff" }}
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
            radius={[0, 0, 0, 0]}
          >
            {filteredKeywords.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="keyword-strong-summary">
        Kata paling dominan saat ini adalah <strong>{dominantKeyword?.keyword}{" "}</strong>
        dengan <strong>{dominantKeyword?.count.toLocaleString("id-ID")}</strong> kemunculan.
      </div>
          <br/>
    </div>
  );
}