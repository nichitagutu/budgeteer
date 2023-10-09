import { useState, useEffect } from "react";
import axios from "axios";

import { API_URL } from "../constants";

const useDeleteTransaction = (transactionId: string, initData: string) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function deleteTransaction() {
      setLoading(true);
      try {
        const response = await axios.delete(
          `${API_URL}/transactions/${transactionId}`,
          {
            params: {
              initData,
            },
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
          }
        );

        setResult(response.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    if (transactionId) {
      deleteTransaction();
    }
  }, [transactionId, initData]);

  return { result, loading, error };
};


export default useDeleteTransaction;
