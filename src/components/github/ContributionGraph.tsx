import type { ContributionDay } from "@/lib/github-stats";

export function ContributionGraph({
  calendar,
  compact = false,
}: {
  calendar: ContributionDay[][];
  compact?: boolean;
}) {
  const weeks = compact ? calendar.slice(-20) : calendar;

  return (
    <div className="contribution-graph" data-compact={compact}>
      <div className="contribution-scroll" data-lenis-prevent>
        <div className="contribution-weeks" role="img" aria-label="GitHub contribution activity">
          {weeks.flatMap((week, weekIndex) =>
            week.map((day, dayIndex) => (
              <span
                className="contribution-day"
                data-level={day.level}
                key={day.date}
                style={{ gridColumn: weekIndex + 1, gridRow: dayIndex + 1 }}
                title={`${day.date}: ${day.count} ${day.count === 1 ? "contribution" : "contributions"}`}
              />
            )),
          )}
        </div>
      </div>
      {!compact ? (
        <div className="contribution-legend" aria-hidden="true">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <i data-level={level} key={level} />
          ))}
          <span>More</span>
        </div>
      ) : null}
    </div>
  );
}
