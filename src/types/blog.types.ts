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

export type { APICallerProps, SigninProps, TokenResponse };
