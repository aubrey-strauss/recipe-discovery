import { useEffect, useState } from "react";

// Reusable fetch: give it a URL, get back data, loading, and error
function useFetch<T>(url: string) {
  // Starts as null because there's no data until the fetch finishes
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Safety flag: ignore an old answer if the user already left the page
    let ignore = false;

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
        const json = await response.json();
        if (!ignore) setData(json);
      } catch (err) {
        if (!ignore)
          setError(
            err instanceof Error ? err.message : "An unknown error occurred.",
          );
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchData();

    // Cleanup: runs when the page goes away or the URL changes
    return () => {
      ignore = true;
    };
  }, [url]); // Run again whenever the URL changes

  return { data, loading, error };
}

export default useFetch;
