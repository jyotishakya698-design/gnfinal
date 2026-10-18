"use client";

import { useState } from "react";
import { faqs } from "../data/courseData";
import styles from "./FAQ.module.css";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (i) => {
    setOpenIdx(openIdx === i ? -1 : i);
  };

  return (
    <section className={`section ${styles.faq}`}>
      <div className="container">
        <div className="sectionHeader">
          <span className="sectionLabel">Have Questions?</span>
          <h2 className="sectionTitle">
            Frequently Asked <span>Questions</span>
          </h2>
        </div>

        <div className={styles.list}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`${styles.item} ${openIdx === i ? styles.open : ""}`}
            >
              <button
                className={styles.question}
                onClick={() => toggle(i)}
                aria-expanded={openIdx === i}
              >
                <span className={styles.qNumber}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.qText}>{faq.question}</span>
                <span className={styles.chevron}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </button>
              <div className={styles.answer}>
                <div className={styles.answerInner}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
