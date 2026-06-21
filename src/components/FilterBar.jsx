export default function FilterBar({
  searchTerm,
  setSearchTerm,
  sentimentFilter,
  setSentimentFilter,
  topN,
  setTopN,
}) {
  return (
    <div className="filter-bar">

      <input
        type="text"
        placeholder="Cari keyword..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
      />

      <select
        value={sentimentFilter}
        onChange={(e) =>
          setSentimentFilter(e.target.value)
        }
      >
        <option value="All">All Sentiment</option>
        <option value="Positive">Positive</option>
        <option value="Neutral">Neutral</option>
        <option value="Negative">Negative</option>
      </select>

      <select
        value={topN}
        onChange={(e) =>
          setTopN(Number(e.target.value))
        }
      >
        <option value={10}>Top 10</option>
        <option value={25}>Top 25</option>
        <option value={50}>Top 50</option>
      </select>

    </div>
  );
}