"use client";

import { useState, useEffect, useCallback } from "react";
import { testimonials } from "../data/courseData";
import styles from "./Testimonials.module.css";

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);

  const next = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = () => {
    setActiveIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  const current = testimonials[activeIdx];

  return (
    <section className={`section ${styles.testimonials}`}>
      <div className="container">
        <div className="sectionHeader">
          <span className="sectionLabel">Student Success</span>
          <h2 className="sectionTitle">
            What Our <span>Students Say</span>
          </h2>
        </div>

        <div className={styles.cardWrapper}>
          <div className={styles.quoteIcon}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="var(--blue-100)">
              <path d="M11 7H7a4 4 0 0 0-4 4v0a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V7zm10 0h-4a4 4 0 0 0-4 4v0a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V7z" />
            </svg>
          </div>

          <div className={styles.card} key={activeIdx}>
            <p className={styles.text}>&ldquo;{current.text}&rdquo;</p>

            <div className={styles.stars}>
              {Array.from({ length: current.rating }, (_, i) => (
                <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="var(--gold)">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>

            <div className={styles.author}>
              <div className={styles.avatarBubble} style={{ background: `hsl(${activeIdx * 60}, 60%, 55%)` }}>
                {current.avatar}
              </div>
              <div>
                <strong className={styles.name}>{current.name}</strong>
                <span className={styles.course}>{current.course}</span>
              </div>
            </div>
          </div>

          <div className={styles.controls}>
            <button className={styles.arrowBtn} onClick={prev} aria-label="Previous testimonial">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>

            <div className={styles.dots}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === activeIdx ? styles.active : ""}`}
                  onClick={() => setActiveIdx(i)}
                  aria-label={`Testimonial ${i + 1}`}
                ></button>
              ))}
            </div>

            <button className={styles.arrowBtn} onClick={next} aria-label="Next testimonial">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
