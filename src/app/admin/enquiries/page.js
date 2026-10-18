"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./admin.module.css";

export default function AdminEnquiriesPage() {
  const [key, setKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [keyInput, setKeyInput] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async (adminKey) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/enquiry", {
        cache: "no-store",
        headers: { "x-admin-key": adminKey },
      });
      const json = await res.json().catch(() => ({}));
      if (res.status === 401) {
        setAuthed(false);
        sessionStorage.removeItem("gn_admin_key");
        throw new Error("Incorrect key. Please try again.");
      }
      if (!res.ok) throw new Error(json.error || "Failed to load enquiries.");
      setData(json);
      setAuthed(true);
      sessionStorage.setItem("gn_admin_key", adminKey);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem("gn_admin_key");
    if (saved) {
      setKey(saved);
      load(saved);
    }
  }, [load]);

  const handleUnlock = (e) => {
    e.preventDefault();
    if (!keyInput.trim()) return;
    setKey(keyInput.trim());
    load(keyInput.trim());
  };

  const handleRefresh = () => load(key);

  const handleDownload = () => {
    window.location.href = `/api/enquiry/export?key=${encodeURIComponent(key)}`;
  };

  if (!authed) {
    return (
      <main className={styles.page}>
        <div className="container">
          <form className={styles.gate} onSubmit={handleUnlock}>
            <h1>Enquiry Dashboard</h1>
            <p>Enter the admin key to view and download form submissions.</p>
            <input
              type="password"
              placeholder="Admin key"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              autoFocus
            />
            {error && <p className={styles.error}>{error}</p>}
            <button
              type="submit"
              className={`${styles.btn} ${styles.btnPrimary} ${styles.gateBtn}`}
              disabled={loading}
            >
              {loading ? "Checking..." : "Unlock"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  const enquiries = data?.enquiries || [];

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Enquiry Dashboard</h1>
            <p className={styles.subtitle}>
              All contact-form submissions, stored in Excel.
            </p>
          </div>
          <div className={styles.actions}>
            <button
              className={`${styles.btn} ${styles.btnGhost}`}
              onClick={handleRefresh}
              disabled={loading}
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>
            <button
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={handleDownload}
            >
              ⬇ Download Excel
            </button>
          </div>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.stats}>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{enquiries.length}</span>
            <span className={styles.statLabel}>Total Enquiries</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>
              {enquiries[enquiries.length - 1]?.submittedAt || "—"}
            </span>
            <span className={styles.statLabel}>Latest Submission</span>
          </div>
        </div>

        {enquiries.length === 0 ? (
          <div className={styles.empty}>
            No enquiries yet. Submissions from the contact form will appear here.
          </div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Date &amp; Time</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Course</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((e, i) => (
                  <tr key={i}>
                    <td>{e.sno}</td>
                    <td>{e.submittedAt}</td>
                    <td>{e.name}</td>
                    <td>{e.email}</td>
                    <td>{e.phone}</td>
                    <td>{e.course}</td>
                    <td className={styles.message}>{e.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
