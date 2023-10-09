import { useState, useEffect } from "react";
import axios from "axios";

import { API_URL } from "../constants";

const useTransactions = (initData: string, telegramId: string) => {
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTransactions() {
      setLoading(true);
      try {
        const response = await axios.get(
          `${API_URL}/transactions/user/${telegramId}`,
          {
            params: {
              initData,
            },
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
          }
        );

        setTransactions(response.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    if (telegramId) {
      fetchTransactions();
    }
  }, [telegramId, initData]);

  return { transactions, loading, error };
};

export default useTransactions;
