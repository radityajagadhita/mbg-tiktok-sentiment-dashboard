import sentimentData from "../data/sentiment_distribution.json";
import keywordData from "../data/top_keywords_final.json";

export default function InsightCard() {

  const total = sentimentData.reduce(
    (sum, item) => sum + item.value,
    0
  );

  const dominant = sentimentData.reduce(
    (a, b) => (a.value > b.value ? a : b)
  );

  const percentage = (
    (dominant.value / total) * 100
  ).toFixed(1);

  const topKeyword = keywordData[0];

  return (
    <div className="card">
      <h2>📊 Insight Summary</h2>

      <p>
        Mayoritas komentar memiliki sentimen{" "}
        <strong>{dominant.name}</strong>
        {" "}dengan persentase{" "}
        <strong>{percentage}%</strong>.
      </p>

      <p>
        Keyword yang paling sering muncul adalah{" "}
        <strong>{topKeyword.keyword}</strong>
        {" "}sebanyak{" "}
        <strong>
          {topKeyword.count.toLocaleString()}
        </strong>
        {" "}kali.
      </p>

      <p>
        Dashboard ini menganalisis{" "}
        <strong>
          {total.toLocaleString()}
        </strong>
        {" "}komentar TikTok terkait program
        Makan Bergizi Gratis (MBG).
      </p>
    </div>
  );
}