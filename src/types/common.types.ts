type ProgressCB = (progress: number) => void;

interface L10NContent {
  [key: string]: string;
}
interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;

  /**
   * PII Alert.
   * I don't think any developer will ever want to put this.
   */
  email?: string;
  phone?: string;
}

interface Highlight {
  type: string;
  title: string;
  description?: string;
  url?: string;
  cta?: string;
}

type Highlights = Array<Highlight>;

type ContentValues = string | SocialLinks | Highlights | undefined;

interface ContentModel {
  [key: string]: ContentValues;
  links?: SocialLinks;
  name?: string;
  city?: string;
  highlights?: Highlights;
}

export type { ProgressCB, L10NContent, SocialLinks, ContentModel, Highlight };
