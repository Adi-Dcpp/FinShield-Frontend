import { useCallback, useEffect, useState } from "react";
import useTransaction from "../hooks/useTransaction";
import HistoryTab from "../components/HistoryTab";

export default function History() {
  const { getHistory } = useTransaction();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadHistory = useCallback(async () => {
    const savedUsername = localStorage.getItem("finshield.username") || localStorage.getItem("name") || "";

    setLoading(true);
    setError("");

    try {
      const response = await getHistory({ name: savedUsername });
      setTransactions(response?.data?.data ?? []);
    } catch {
      setTransactions([]);
      setError("Unable to load history right now.");
    } finally {
      setLoading(false);
    }
  }, [getHistory]);

  useEffect(() => {
    loadHistory();

    const handleRefresh = () => {
      loadHistory();
    };

    window.addEventListener("finshield:history-refresh", handleRefresh);

    return () => {
      window.removeEventListener("finshield:history-refresh", handleRefresh);
    };
  }, [loadHistory]);

  return (
    <div className="relative">
      {loading && (
        <div className="p-6 text-white/80">Loading history...</div>
      )}

      {error && !loading && (
        <div className="p-6 text-red-300">{error}</div>
      )}

      {!loading && !error && <HistoryTab transactions={transactions} />}
    </div>
  );
}