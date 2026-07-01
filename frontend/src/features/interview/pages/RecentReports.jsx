import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useInterview } from "../hook/useInterview";
import "../style/recent.scss";

const RecentReports = () => {
  const { loading, reports, getReports } = useInterview();
  const navigate = useNavigate();

  useEffect(() => {
    getReports();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown Date";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getScoreClass = (score) => {
    if (score >= 80) return "report-card__score--high";
    if (score >= 60) return "report-card__score--medium";
    return "report-card__score--low";
  };

  const handleMouseMove = (e, target) => {
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  };

  if (loading && (!reports || reports.length === 0)) {
    return (
      <div className="loader">
        <div className="loader__spinner"></div>
        <span>Loading your strategy plans...</span>
      </div>
    );
  }

  return (
    <main className="recent-reports">
      <header className="recent-reports__header">
        <h1 className="recent-reports__title">
          Interview <span className="accent">Strategies</span>
        </h1>
        <p className="recent-reports__subtitle">
          Review your past interview strategies and AI-generated preparation plans.
        </p>
      </header>

      {!reports || reports.length === 0 ? (
        <div className="recent-reports__empty">
          <p>No interview strategies found. Time to generate your first plan!</p>
        </div>
      ) : (
        <div className="recent-reports__grid">
          {reports.map((report) => (
            <article
              key={report._id}
              className="report-card"
              onClick={() => navigate(`/interview/plan/${report._id}`)}
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
            >
              <div className="report-card__header">
                <h3 className="report-card__title">
                  {report.title || "Untitled Interview Plan"}
                </h3>
                {report.matchScore !== undefined &&
                  report.matchScore !== null && (
                    <span
                      className={`report-card__score ${getScoreClass(
                        report.matchScore
                      )}`}
                    >
                      {report.matchScore === -1 ? "N/A" : `${report.matchScore}% Fit`}
                    </span>
                  )}
              </div>

              <div className="report-card__meta">
                <span className="report-card__date">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM5 8V6h14v2H5z" />
                  </svg>
                  {formatDate(report.createdAt)}
                </span>
              </div>

              <div className="report-card__footer">
                <span className="report-card__link">View Strategy →</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
};

export default RecentReports;
