const quickLinks = [
  { label: "Sentiment Distribution", target: "#sentiment-distribution" },
  { label: "Top Keywords", target: "#top-keywords" },
  { label: "Top Keywords 3D Word Cloud", target: "#top-keywords-3d" },
  { label: "Sentiment Trend", target: "#sentiment-trend" },
  { label: "Daily Activity", target: "#daily-activity" },
  { label: "Insight Summary", target: "#insight-summary" },
];

export default function Header() {
    return (
        <div className="header">
            <div className="header-row">
        <nav
          className="quick-nav"
          aria-label="Jump to dashboard sections"
        >
          {quickLinks.map((item) => (
            <a
              key={item.target}
              className="nav-chip"
              href={item.target}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="https://www.kaggle.com/datasets/sinryurifal/dataset-komentar-tiktok-mbg-makan-bergizi-gratis"
          target="_blank"
          rel="noopener noreferrer"
          className="dataset-button"
        >
          Dataset Source
        </a>
      </div>
    </div>
  );
}