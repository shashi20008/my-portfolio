interface APICallerProps {
  token: string | null;
  logout: () => void;
}

interface SigninProps extends APICallerProps {
  onSuccess: (token: string, userId: string, useEmail: string) => void;
}

interface TokenResponse {
  token: string;
  userId: string;
  userEmail: string;
}

interface BlogPost {
  id: string;
  title: string;
  body: string;
  font?: string;
  userId: string;
  tags: Array<string>;
  created_ts: number;
}

declare type BlogPosts = Array<BlogPost>;

export type { BlogPost, BlogPosts, APICallerProps, SigninProps, TokenResponse };
