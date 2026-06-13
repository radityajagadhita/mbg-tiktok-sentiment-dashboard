import KPISection from "../components/KPISection";
import SentimentPieChart from "../components/SentimentPieChart";
import KeywordBarChart from "../components/KeywordBarChart";
import ActivityLineChart from "../components/ActivityLineChart";
import InsightCard from "../components/InsightCard";

export default function Dashboard() {
  return (
    <div className="container">
      <h1>MBG TikTok Sentiment Dashboard</h1>

      <KPISection />

      <div className="chart-grid">
        <SentimentPieChart />
        <KeywordBarChart />
      </div>

      <ActivityLineChart />

      <InsightCard />
    </div>
  );
}