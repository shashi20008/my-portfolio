import type { L10NContent } from '../types/common.types';

async function fetchContent(): Promise<L10NContent> {
  const lang = document.documentElement.lang;
  const resp = await fetch(`/content/${lang}.json`);

  if (!resp.ok) {
    throw new Error('NO_L10N_CONTENT_FOUND');
  }

  return resp.json();
}

export { fetchContent };
