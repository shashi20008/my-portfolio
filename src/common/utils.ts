const LAST_VISIT_TS = 'lastVisitTS';
const RECENT_IN_MILLISECONDS = 7 * 24 * 60 * 60 * 1000; // 7 days.

function markVisit(): void {
  window.localStorage.setItem(LAST_VISIT_TS, '' + Date.now());
}

function hasRecentlyVisited(): boolean {
  const timeStamp = window.localStorage.getItem(LAST_VISIT_TS);
  if (timeStamp === null) {
    return false;
  }

  return Date.now() - +timeStamp < RECENT_IN_MILLISECONDS;
}

export { markVisit, hasRecentlyVisited };
