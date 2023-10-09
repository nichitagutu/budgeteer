import { useState, useEffect } from "react";
import axios from "axios";

import { API_URL } from "../constants";
import { TransactionType } from "../types";


const useAddTransaction = (transaction: TransactionType, initData: string) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function addTransaction() {
      setLoading(true);
      try {
        const response = await axios.post(
          `${API_URL}/transactions`,
          transaction,
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

    if (transaction) {
      addTransaction();
    }
  }, [transaction, initData]);

  return { result, loading, error };
};

export default useAddTransaction;

