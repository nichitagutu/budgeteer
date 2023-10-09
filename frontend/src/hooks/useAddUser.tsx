import { useState, useEffect } from "react";
import axios from "axios";

import { API_URL } from "../constants";

const useAddUser = (initData: string) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function addUser() {
      setLoading(true);
      try {
        const response = await axios.post(
          `${API_URL}/users`,
          {},
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

    if (initData) {
      addUser();
    }
  }, [initData]);

  return { result, loading, error };
};

export default useAddUser;
