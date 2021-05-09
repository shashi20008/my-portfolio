import MarkDownIt from 'markdown-it';
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

const SPACE_OR_NEW_LINE = /(\s|\n|\r\n)+/g;

function markdown2Text(markdown: string, limit?: number): string {
  const html = MarkDownIt().render(markdown);
  const span = document.createElement('span');
  span.innerHTML = html;
  const text = span.innerText;

  if (!limit) {
    return text.replace(SPACE_OR_NEW_LINE, ' ');
  }

  return text.substring(0, limit).replace(SPACE_OR_NEW_LINE, ' ');
}

export { markdown2Text, markVisit, hasRecentlyVisited };
