import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

export function useAxiosGet<T>(url: string, options: AxiosRequestConfig = {}) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get<T>(url, options);
      setData(response.data);
    } catch (error: any) {
      if (error) {
        setError(error.message);
      }
    } finally {
      setLoaded(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, error, loaded, loading, fetchData };
}
