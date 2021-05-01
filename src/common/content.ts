import type { ContentModel, L10NContent } from '../types/common.types';
import { fetchContent } from './api';

const PLACEHOLDER_REGEX = /(\{.+?\})/g;
let _CACHE: L10NContent | null = null;

async function loadContent(): Promise<void> {
  const content = await fetchContent();
  _CACHE = content;
}

/**
 * Get the localized content.
 * @param key: L10N key for the content to be loaded.
 * @param params: Key to content map for filling in placeholders in content.
 * @returns: Localized content.
 */
function getContent(key: string, params: ContentModel = {}): string {
  let value = _CACHE?.[key];

  if (value === undefined) {
    return `☃${key}☃`;
  }

  const placeholders = value.match(PLACEHOLDER_REGEX);

  if (placeholders) {
    for (const placeholder of placeholders) {
      const param = placeholder.substring(1, placeholder.length - 1);
      value = value.replace(placeholder, params[param]?.toString() || '');
    }
  }
  return value;
}

export { loadContent, getContent };
