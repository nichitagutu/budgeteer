import { useMemo } from "react";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  language_code: string;
  is_premium: boolean;
  allows_write_to_pm: boolean;
}

interface ParsedQuery {
  query_id: string;
  user: User;
  auth_date: string;
  hash: string;
}

function parseQuery(query: string): ParsedQuery | null {
  const regex =
    /query_id=([^&]+)&user=([^&]+)&auth_date=([^&]+)&hash=([^&\s]+)/;
  const match = regex.exec(query);

  if (match) {
    const queryId = match[1];
    const user = JSON.parse(decodeURIComponent(match[2]));
    const authDate = match[3];
    const hash = match[4];

    return {
      query_id: queryId,
      user: user,
      auth_date: authDate,
      hash: hash,
    };
  }

  return null;
}

const useParsedInitData = (): ParsedQuery | null => {
  const parsedData = useMemo(() => {
    if (
      window.Telegram &&
      window.Telegram.WebApp &&
      window.Telegram.WebApp.initData
    ) {
      return parseQuery(window.Telegram.WebApp.initData);
    }
    return null;
  }, []);

  return parsedData;
};

export default useParsedInitData;
