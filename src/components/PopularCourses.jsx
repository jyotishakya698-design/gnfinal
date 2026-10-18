"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { programs, featuredPrograms } from "../data/courseData";
import styles from "./PopularCourses.module.css";

const popularPicks = featuredPrograms
  .map((name) => programs.find((p) => p.name === name))
  .filter(Boolean);

export default function PopularCourses() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", checkScroll);
    return () => el?.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <section className={`section ${styles.popular}`}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <span className="sectionLabel">Featured Programs</span>
            <h2 className="sectionTitle">
              Most Popular <span>Courses</span>
            </h2>
          </div>
          <div className={styles.arrows}>
            <button
              className={`${styles.arrow} ${!canScrollLeft ? styles.disabled : ""}`}
              onClick={() => scroll(-1)}
              aria-label="Previous"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className={`${styles.arrow} ${!canScrollRight ? styles.disabled : ""}`}
              onClick={() => scroll(1)}
              aria-label="Next"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.carousel} ref={scrollRef}>
          {popularPicks.map((prog, i) => (
            <div className={styles.card} key={prog.sno}>
              <div className={styles.cardTop} style={{ "--accent": "#2563EB" }}>
                <span className={styles.cardCategory}>Program</span>
                <span className={styles.cardEmoji}>📘</span>
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardName}>{prog.name}</h3>
                <div className={styles.cardDetails}>
                  <span className={styles.detail}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                    </svg>
                    {prog.duration}
                  </span>
                </div>
                <Link href="/courses" className={styles.enrollBtn}>
                  Enroll Now
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
