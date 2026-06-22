import activityData from "../data/daily_activity.json";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush,
  ReferenceLine,
} from "recharts";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmtDate(value) {
  return new Date(value).toLocaleDateString("id-ID", {
    day:   "numeric",
    month: "short",
  });
}

function fmtDateLong(value) {
  return new Date(value).toLocaleDateString("id-ID", {
    day:   "numeric",
    month: "long",
    year:  "numeric",
  });
}

// ─── Custom Tooltip ───────────────────────────────────────────────────────────
const ActivityTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div
      style={{
        background: "#0f172a",
        border: "1px solid #334155",
        borderRadius: "10px",
        padding: "12px 16px",
        color: "#f8fafc",
        fontSize: "13px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
        minWidth: "190px",
      }}
    >
      <div
        style={{
          fontWeight: 700,
          marginBottom: "8px",
          color: "#e2e8f0",
          borderBottom: "1px solid #1e293b",
          paddingBottom: "6px",
        }}
      >
        {fmtDateLong(label)}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "16px" }}>
        <span style={{ color: "#94a3b8" }}>Komentar</span>
        <span style={{ fontWeight: 700, color: "#60a5fa" }}>
          {payload[0].value.toLocaleString("id-ID")}
        </span>
      </div>
    </div>
  );
};

// ─── Peak day for reference line ──────────────────────────────────────────────
const peakItem  = activityData.reduce((a, b) => (a.count > b.count ? a : b));
const peakCount = peakItem.count;
const peakDate  = peakItem.date;

// ─── Brush start index (default: show last 60 days) ──────────────────────────
const brushStart = Math.max(0, activityData.length - 60);

// ─── Component ────────────────────────────────────────────────────────────────
export default function ActivityLineChart() {
  return (
    <div className="card activity-chart-card" id="daily-activity">
      <div className="chart-title-row">
        <div>
          <h2>Daily Activity</h2>
          <p className="chart-subtitle" style={{ color: "#b6bec9" }}>
            Aktivitas komentar harian. Gunakan{" "}
            <strong>slider di bawah</strong> untuk zoom ke rentang tanggal
            tertentu.
          </p>
        </div>
        <div className="peak-badge">
          <span className="peak-label">Peak</span>
          <span className="peak-value">{peakCount.toLocaleString("id-ID")}</span>
          <span className="peak-date">{fmtDate(peakDate)}</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={440}>
        <AreaChart
          data={activityData}
          margin={{ top: 16, right: 24, left: 0, bottom: 0 }}
        >
          {/* ── Gradient fill ── */}
          <defs>
            <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.45} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />

          <XAxis
            dataKey="date"
            tickFormatter={fmtDate}
            tick={{ fill: "#ffffff", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
          />

          <YAxis
            tick={{ fill: "#fdfdfd", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => v.toLocaleString("id-ID")}
          />

          <Tooltip content={<ActivityTooltip />} />

          {/* ── Peak reference line ── */}
          <ReferenceLine
            y={peakCount}
            stroke="#f59e0b"
            strokeDasharray="5 4"
            strokeWidth={1.5}
            label={{
              value: `Peak: ${peakCount.toLocaleString("id-ID")}`,
              position: "insideTopRight",
              fill: "#f59e0b",
              fontSize: 11,
              fontWeight: 600,
            }}
          />

          {/* ── Area with stroke ── */}
          <Area
            type="monotone"
            dataKey="count"
            name="Komentar"
            stroke="#3b82f6"
            strokeWidth={2.5}
            fill="url(#blueGradient)"
            dot={false}
            activeDot={{ r: 6, fill: "#3b82f6", stroke: "#fff", strokeWidth: 2 }}
          />

          {/* ── Interactive Brush / Zoom slider ── */}
          <Brush
            dataKey="date"
            height={28}
            stroke="#3b82f6"
            fill="#f1f5f9"
            travellerWidth={8}
            startIndex={brushStart}
            tickFormatter={fmtDate}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}