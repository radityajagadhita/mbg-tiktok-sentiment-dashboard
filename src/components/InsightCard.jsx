import sentimentData from "../data/sentiment_distribution.json";
import keywordData from "../data/top_keywords_final_4.json";
import stats from "../data/dashboard_stats.json";
import {
  FaBrain,
  FaHashtag,
  FaComments,
  FaUsers,
  FaArrowTrendUp,
  FaCircleInfo,
  FaTriangleExclamation,
} from "react-icons/fa6";

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

  const positive =
    sentimentData.find(
      item => item.name === "Positive"
    )?.value || 0;

  const negative =
    sentimentData.find(
      item => item.name === "Negative"
    )?.value || 0;

  const neutral =
    sentimentData.find(
      item => item.name === "Neutral"
    )?.value || 0;

  let insightText = "";

  if (dominant.name === "Positive") {
    insightText =
      "Mayoritas komentar menunjukkan respons positif terhadap program MBG. Pengguna cenderung menyoroti manfaat, kualitas, dan dampak program secara konstruktif.";
  }

  else if (dominant.name === "Negative") {
    insightText =
      "Percakapan didominasi sentimen negatif. Hal ini mengindikasikan adanya perhatian publik terhadap kualitas implementasi, distribusi, atau efektivitas program.";
  }

  else {
    insightText =
      "Mayoritas komentar bersifat netral, menunjukkan bahwa pengguna lebih banyak membahas informasi dan perkembangan program dibanding memberikan opini yang sangat positif maupun negatif.";
  }

  return (
    <div
      className="card insight-card futuristic-card"
      id="insight-summary"
    >

      <h2>Executive Insight</h2>

      <div className="insight-highlights">

        <div className="insight-item">
          <span>
              <FaBrain className="insight-icon" />
              Dominant Sentiment
            </span>
          <strong>
            {dominant.name} ({percentage}%)
          </strong>
        </div>

        <div className="insight-item">
          <span>
            <FaHashtag className="insight-icon" />
            Top Keyword
          </span>
          <strong>
            {topKeyword.keyword}
          </strong>
        </div>

        <div className="insight-item">
          <span>
            <FaComments className="insight-icon" />
            Comments
          </span>
          <strong>
            {stats.total_comments.toLocaleString("id-ID")}
          </strong>
        </div>

        <div className="insight-item">
          <span>
            <FaUsers className="insight-icon" />
            Users
          </span>
          <strong>
            {stats.total_users.toLocaleString("id-ID")}
          </strong>
        </div>

      </div>

      <div className="insight-body">

        <h3 className="insight-section-title">
          <FaCircleInfo />
          Key Findings
        </h3>

        <ul>

          <li>
            {insightText}
          </li>

          <li>
            Keyword paling dominan adalah{" "}
            <strong>{topKeyword.keyword}</strong>
            {" "}dengan{" "}
            <strong>
              {topKeyword.count.toLocaleString("id-ID")}
            </strong>{" "}
            kemunculan.
          </li>

          <li>
            Dashboard saat ini menganalisis{" "}
            <strong>
              {stats.total_comments.toLocaleString("id-ID")}
            </strong>{" "}
            komentar dari{" "}
            <strong>
              {stats.total_users.toLocaleString("id-ID")}
            </strong>{" "}
            pengguna.
          </li>

        </ul>

      </div>

      <div className="sentiment-breakdown">

        <div className="positive-box">
          <span>
            <FaArrowTrendUp />
            Positive</span>
          <strong>
            {positive.toLocaleString("id-ID")}
          </strong>
        </div>

        <div className="neutral-box">
          <span>
            <FaCircleInfo />
            Neutral</span>
          <strong>
            {neutral.toLocaleString("id-ID")}
          </strong>
        </div>

        <div className="negative-box">
          <span>
            <FaTriangleExclamation />
            Negative</span>
          <strong>
            {negative.toLocaleString("id-ID")}
          </strong>
        </div>

      </div>

    </div>
  );
}