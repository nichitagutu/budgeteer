import { useState, useEffect } from "react";
import axios from "axios";

import { API_URL } from "../constants";
import { TransactionType } from "../types";

const useEditTransaction = (
  transactionId: string,
  updatedTransaction: TransactionType,
  initData: string
) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function editTransaction() {
      setLoading(true);
      try {
        const response = await axios.put(
          `${API_URL}/transactions/${transactionId}`,
          updatedTransaction,
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

    if (transactionId && updatedTransaction) {
      editTransaction();
    }
  }, [transactionId, initData]);

  return { result, loading, error };
};

export default useEditTransaction;
