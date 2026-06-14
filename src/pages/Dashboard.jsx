import MainLayout from "../layout/MainLayout";

import KPISection from "../components/KPISection";

import SentimentPieChart from "../components/SentimentPieChart";

import KeywordBarChart from "../components/KeywordBarChart";

import ActivityLineChart from "../components/ActivityLineChart";

import InsightCard from "../components/InsightCard";

import SentimentTrendChart from "../components/SentimentTrendChart";

import KeywordWordCloud3D from "../components/KeywordWordCloud3D";

export default function Dashboard() {

  return (
    <MainLayout>

      <KPISection />

      <div className="chart-grid">

        <SentimentPieChart />

        <KeywordBarChart />

      </div>

      <KeywordWordCloud3D />

      <SentimentTrendChart />

      <ActivityLineChart />

      <InsightCard />

    </MainLayout>
  );
}
