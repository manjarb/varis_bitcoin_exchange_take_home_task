import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

export function useAxiosGet<T>(url: string, options: AxiosRequestConfig = {}) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get<T>(url, options);
      setData(response.data);
    } catch (error: any) {
      if (error) {
        setError(error.message);
      }
    } finally {
      setLoaded(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, error, loaded, fetchData };
}
