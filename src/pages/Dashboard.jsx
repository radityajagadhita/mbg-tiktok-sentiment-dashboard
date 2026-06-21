import MainLayout from "../layout/MainLayout";

import KPISection from "../components/KPISection";

import SentimentPieChart from "../components/SentimentPieChart";

import KeywordBarChart from "../components/KeywordBarChart";

import ActivityLineChart from "../components/ActivityLineChart";

import InsightCard from "../components/InsightCard";

import SentimentTrendChart from "../components/SentimentTrendChart";

import KeywordWordCloud3D from "../components/KeywordWordCloud3D";
import { useState } from "react";
import FilterBar from "../components/FilterBar";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sentimentFilter, setSentimentFilter] = useState("All");
  const [topN, setTopN] = useState(10);

  return (
    <MainLayout>
      <FilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}

        sentimentFilter={sentimentFilter}
        setSentimentFilter={setSentimentFilter}

        topN={topN}
        setTopN={setTopN}
      />

      <KPISection />

      <div className="chart-grid">

        <SentimentPieChart />

        <KeywordBarChart
          searchTerm={searchTerm}
          topN={topN}
          sentimentFilter={sentimentFilter}
        />

      </div>

      <KeywordWordCloud3D
        searchTerm={searchTerm}
        topN={topN}
        sentimentFilter={sentimentFilter}
      />

      <SentimentTrendChart
        sentimentFilter={sentimentFilter}
      />

      <ActivityLineChart />

      <InsightCard />

    </MainLayout>
  );
}
