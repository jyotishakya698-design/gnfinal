"use client";

import { useEffect, useState } from "react";
import { programs } from "../data/courseData";
import styles from "./BrochureDownload.module.css";

const emptyForm = { name: "", email: "", phone: "", course: "" };

export default function BrochureDownload({
  className = "",
  label = "Download Brochure",
  program = "",
}) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ ...emptyForm, course: program });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");

  // Keep the pre-selected program in sync with the prop.
  useEffect(() => {
    setFormData((prev) => ({ ...prev, course: program }));
  }, [program]);

  // Lock body scroll while the modal is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Start the brochure download only after a successful submission.
  const triggerDownload = (url, fileName) => {
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName || "";
    a.target = "_blank";
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Best-effort client-side notification via FormSubmit. This runs in the
  // browser (FormSubmit blocks server-to-server calls). The recipient must
  // confirm the address once via the activation email FormSubmit sends.
  const notifyViaFormSubmit = (endpoint, subject, data) => {
    if (!endpoint) return;
    const payload = {
      _subject: subject || "New Brochure Download Request — Good Notation",
      _template: "table",
      Name: data.name,
      Email: data.email,
      Phone: data.phone,
      "Interested In": data.course || "Brochure Download",
      Source: "Brochure Download (Courses page)",
    };
    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {
      /* Notification is best-effort — never block the download. */
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/brochure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      // If the server couldn't email (no Resend key), notify from the browser.
      if (!data.emailed && data.formEndpoint) {
        notifyViaFormSubmit(data.formEndpoint, data.formSubject, formData);
      }

      setStatus("success");
      triggerDownload(data.brochureUrl, data.fileName);
      setFormData({ ...emptyForm, course: program });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Unable to process your request right now.");
    }
  };

  const close = () => {
    setOpen(false);
    setStatus("idle");
    setErrorMsg("");
  };

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => setOpen(true)}
      >
        {label}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      </button>

      {open && (
        <div className={styles.overlay} onClick={close} role="presentation">
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Download brochure"
          >
            <button
              className={styles.closeBtn}
              onClick={close}
              aria-label="Close"
              type="button"
            >
              &times;
            </button>

            {status === "success" ? (
              <div className={styles.success}>
                <div className={styles.successIcon}>✅</div>
                <h3 className={styles.successTitle}>Your download has started</h3>
                <p className={styles.successText}>
                  Thanks! Your brochure is downloading now. If it doesn&apos;t
                  start automatically, check your browser&apos;s downloads.
                </p>
                <button
                  type="button"
                  className={styles.doneBtn}
                  onClick={close}
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <h3 className={styles.title}>
                  {program ? `Download the ${program} Brochure` : "Download the Brochure"}
                </h3>
                <p className={styles.subtitle}>
                  Fill in your details and the{" "}
                  {program ? `${program} ` : "Good Notation program "}
                  brochure will download instantly.
                </p>

                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.field}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.field}>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.field}>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.field}>
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                    >
                      <option value="">Program of interest (optional)</option>
                      {programs.map((p) => (
                        <option key={p.sno} value={p.name}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {status === "error" && (
                    <p className={styles.error} role="alert">
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={status === "submitting"}
                  >
                    {status === "submitting"
                      ? "Preparing your brochure..."
                      : "Download Brochure"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
