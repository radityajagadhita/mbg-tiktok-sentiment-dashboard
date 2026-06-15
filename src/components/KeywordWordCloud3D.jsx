import { useEffect, useMemo, useRef, useState } from "react";
import WordCloud from "wordcloud";
import keywordData from "../data/top_keywords_final_4.json";

const MAIN_COLORS = [
  "#2563eb",
  "#0f766e",
  "#16a34a",
  "#ea580c",
  "#7c3aed",
  "#0891b2",
];

const MAX_WORDS = 100;

function getCleanKeywords() {
  return keywordData
    .filter((item) => item.keyword && item.keyword.trim() !== "")
    .slice(0, MAX_WORDS);
}

function makeMainList(words) {
  const max = Math.max(...words.map((item) => item.count));
  const min = Math.min(...words.map((item) => item.count));
  const spread = max - min || 1;

  return words.map((item, index) => {
    const weight = (item.count - min) / spread;
    return [item.keyword, 18 + weight * 42, item.count, index];
  });
}

function makeFieldList(words) {
  return Array.from({ length: 260 }, (_, index) => {
    const source = words[index % words.length];
    const ring = Math.floor(index / words.length);

    return [
      source.keyword,
      Math.max(3.5, 8.5 - ring * 0.16),
      source.count,
      index,
    ];
  });
}

function getCount(item) {
  return item?.[2] ?? 0;
}

function getKeyword(item) {
  return item?.[0] ?? "";
}

export default function KeywordWordCloud3D() {
  const stageRef = useRef(null);
  const fieldCanvasRef = useRef(null);
  const mainCanvasRef = useRef(null);
  const [activeWord, setActiveWord] = useState(null);
  const [lockedWord, setLockedWord] = useState(null);
  const [pointer, setPointer] = useState({ x: 50, y: 50 });
  const [isReady, setIsReady] = useState(false);

  const words = useMemo(() => getCleanKeywords(), []);
  const mainList = useMemo(() => makeMainList(words), [words]);
  const fieldList = useMemo(() => makeFieldList(words), [words]);
  const strongest = words[0];
  const displayWord = lockedWord ?? activeWord;

  useEffect(() => {
    const stage = stageRef.current;
    const fieldCanvas = fieldCanvasRef.current;
    const mainCanvas = mainCanvasRef.current;

    if (!stage || !fieldCanvas || !mainCanvas || !WordCloud.isSupported) {
      return undefined;
    }

    let resizeTimer;
    let isMounted = true;

    const renderCloud = () => {
      const rect = stage.getBoundingClientRect();
      const width = Math.max(320, Math.floor(rect.width));
      const height = Math.max(340, Math.floor(rect.height));

      [fieldCanvas, mainCanvas].forEach((canvas) => {
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      });

      setIsReady(false);
      WordCloud.stop();

      WordCloud(fieldCanvas, {
        list: fieldList,
        backgroundColor: "rgba(0,0,0,0)",
        clearCanvas: true,
        color: () => "rgba(15, 23, 42, 0.14)",
        fontFamily: "Inter, Segoe UI, sans-serif",
        fontWeight: "600",
        gridSize: Math.max(4, Math.round(width / 150)),
        weightFactor: (weight) => weight,
        minSize: 3,
        rotateRatio: 0.28,
        rotationSteps: 5,
        minRotation: -0.8,
        maxRotation: 0.8,
        shape: "square",
        ellipticity: 0.78,
        shuffle: true,
        drawOutOfBound: false,
        shrinkToFit: true,
        wait: 1,
      });

      window.setTimeout(() => {
        if (!isMounted) {
          return;
        }

        WordCloud(mainCanvas, {
          list: mainList,
          backgroundColor: "rgba(0,0,0,0)",
          clearCanvas: true,
          color: (word, weight, fontSize, distance, theta) => {
            const hue =
              MAIN_COLORS[
                Math.abs(Math.round(theta * 10)) % MAIN_COLORS.length
              ];
            const alpha = Math.max(0.7, 1 - distance * 0.34);
            return `${hue}${Math.round(alpha * 255)
              .toString(16)
              .padStart(2, "0")}`;
          },
          fontFamily: "Inter, Segoe UI, sans-serif",
          fontWeight: (word, weight) => (weight > 36 ? "800" : "700"),
          gridSize: Math.max(8, Math.round(width / 72)),
          weightFactor: (weight) => weight,
          minSize: 9,
          rotateRatio: 0.18,
          rotationSteps: 3,
          minRotation: -0.22,
          maxRotation: 0.22,
          shape: "circle",
          ellipticity: 0.68,
          shuffle: false,
          drawOutOfBound: false,
          shrinkToFit: true,
          wait: 8,
          hover: (item, dimension, event) => {
            if (!item) {
              setActiveWord(null);
              return;
            }

            const bounds = stage.getBoundingClientRect();
            setPointer({
              x: event.clientX - bounds.left,
              y: event.clientY - bounds.top,
            });
            setActiveWord({
              keyword: getKeyword(item),
              count: getCount(item),
            });
          },
          click: (item) => {
            if (!item) {
              return;
            }

            setLockedWord({
              keyword: getKeyword(item),
              count: getCount(item),
            });
          },
        });
      }, 120);
    };

    const handleStop = () => setIsReady(true);
    mainCanvas.addEventListener("wordcloudstop", handleStop);

    const observer = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(renderCloud, 140);
    });

    observer.observe(stage);
    renderCloud();

    return () => {
      isMounted = false;
      window.clearTimeout(resizeTimer);
      observer.disconnect();
      mainCanvas.removeEventListener("wordcloudstop", handleStop);
      WordCloud.stop();
    };
  }, [fieldList, mainList]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const tiltX = (y / rect.height - 0.5) * -9;
    const tiltY = (x / rect.width - 0.5) * 12;

    event.currentTarget.style.setProperty("--tilt-x", `${tiltX}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${tiltY}deg`);
    event.currentTarget.style.setProperty(
      "--beam-x",
      `${(x / rect.width) * 100}%`,
    );
    event.currentTarget.style.setProperty(
      "--beam-y",
      `${(y / rect.height) * 100}%`,
    );
    setPointer({ x, y });
  };

  const clearLockedWord = () => {
    setLockedWord(null);
  };

  return (
    <div className="card wordcloud-card" id="top-keywords-3d">
      <div className="chart-title-row">
        <div>
          <h2>Top Keywords 3D Word Cloud</h2>
          <p className="chart-subtitle">
            Arahkan pointer ke kata untuk melihat jumlah kemunculannya.
          </p>
        </div>
      </div>

      <div
        className={`wordcloud-space ${isReady ? "is-ready" : ""}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setActiveWord(null)}
        ref={stageRef}
      >
        <div className="wordcloud-tunnel" />
        <canvas
          aria-hidden="true"
          className="wordcloud-canvas wordcloud-canvas-field"
          ref={fieldCanvasRef}
        />
        <canvas
          aria-label="Word cloud interaktif untuk keyword komentar TikTok"
          className="wordcloud-canvas wordcloud-canvas-main"
          ref={mainCanvasRef}
        />

        {!isReady && (
          <div className="wordcloud-loading">Rendering keyword space...</div>
        )}

        {displayWord && (
          <button
            className="wordcloud-tooltip"
            onClick={clearLockedWord}
            style={{
              left: `${pointer.x + 16}px`,
              top: `${Math.max(pointer.y - 20, 18)}px`,
            }}
            type="button"
          >
            <strong>{displayWord.keyword}</strong>
            <span>{displayWord.count.toLocaleString("id-ID")} kemunculan</span>
          </button>
        )}
      </div>

      <p className="wordcloud-summary">
        Keyword paling menonjol adalah <strong>{strongest?.keyword}</strong>{" "}
        dengan <strong>{strongest?.count.toLocaleString("id-ID")}</strong>{" "}
        kemunculan. Klik kata untuk mengunci detailnya.
      </p>
    </div>
  );
}
