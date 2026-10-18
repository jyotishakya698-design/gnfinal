"use client";

import { useState } from "react";
import { programs, contactInfo } from "../data/courseData";
import styles from "./ContactCTA.module.css";

const emptyForm = { name: "", email: "", phone: "", course: "", message: "" };

export default function ContactCTA() {
  const [formData, setFormData] = useState(emptyForm);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setFormData(emptyForm);
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Unable to submit your enquiry right now.");
    }
  };

  return (
    <section className={`section ${styles.contact}`} id="contact">
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.info}>
            <span className="sectionLabel">Get In Touch</span>
            <h2 className={styles.infoTitle}>
              Ready to Start Your <span>Journey?</span>
            </h2>
            <p className={styles.infoDesc}>
              Fill out the form and our counsellor will get back to you within 24
              hours to help you choose the right program.
            </p>

            <div className={styles.contactItems}>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <strong>Call Us</strong>
                  <span>
                    <a href={contactInfo.phoneHref}>{contactInfo.phoneDisplay}</a>
                  </span>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <strong>Email Us</strong>
                  <span>
                    <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                  </span>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <strong>Visit Us</strong>
                  <span>{contactInfo.address}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.formWrap}>
            {status === "success" ? (
              <div className={styles.success}>
                <div className={styles.successIcon}>✅</div>
                <h3>Thank You!</h3>
                <p>We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <h3 className={styles.formTitle}>Enquire Now</h3>
                <div className={styles.formGrid}>
                  <div className={styles.field}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      id="contact-name"
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
                      id="contact-email"
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
                      id="contact-phone"
                    />
                  </div>
                  <div className={styles.field}>
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      required
                      id="contact-course"
                    >
                      <option value="">Select Course</option>
                      {programs.map((p) => (
                        <option key={p.sno} value={p.name}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className={styles.field}>
                  <textarea
                    name="message"
                    placeholder="Your Message (Optional)"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    id="contact-message"
                  ></textarea>
                </div>

                {status === "error" && (
                  <p className={styles.formError} role="alert">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  className={`btnPrimary ${styles.submitBtn}`}
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Submitting..." : "Submit Enquiry"}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
