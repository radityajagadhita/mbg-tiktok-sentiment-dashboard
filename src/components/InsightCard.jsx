import sentimentData from "../data/sentiment_distribution.json";
import keywordData from "../data/top_keywords_final_4.json";
import stats from "../data/dashboard_stats.json";

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
    <div className="card insight-card futuristic-card" id="insight-summary">
      <h2>Insight Summary</h2>
      <br />
      <p>
        Sentimen <strong>{dominant.name}</strong> mendominasi dengan <strong>{percentage}%</strong>
        dari total <strong>{total.toLocaleString("id-ID")}</strong> komentar yang dianalisis.
      </p>

      <p>
        Kata kunci paling sering muncul adalah <strong>{topKeyword.keyword}</strong>
        sebanyak <strong>{topKeyword.count.toLocaleString("id-ID")}</strong> kali,
        yang memperkuat fokus perhatian audiens terhadap topik utama.
      </p>

      <p>
        Snapshot terbaru menunjukkan <strong>{stats.total_comments.toLocaleString("id-ID")}</strong> komentar,
        <strong> {stats.total_users.toLocaleString("id-ID")}</strong> pengguna, dan
        <strong> {stats.total_videos}</strong> video yang menjadi dasar ringkasan dashboard ini.
      </p>
    </div>
  );
}