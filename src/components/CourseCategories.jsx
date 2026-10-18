"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { programs } from "../data/courseData";
import styles from "./CourseCategories.module.css";

export default function CourseCategories() {
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className={`section ${styles.categories}`} id="categories">
      <div className="container">
        <div className="sectionHeader">
          <span className="sectionLabel">What We Teach</span>
          <h2 className="sectionTitle">
            Explore Our <span>Programs</span>
          </h2>
          <p className="sectionSubtitle">
            Choose from our carefully designed programs across Data, AI,
            Development, and more
          </p>
        </div>

        <div className={styles.grid}>
          {programs.map((prog, i) => (
            <Link
              href="/courses"
              key={prog.sno}
              className={styles.card}
              ref={(el) => (cardsRef.current[i] = el)}
              style={{
                "--delay": `${i * 0.1}s`,
                "--accent": "#2563EB",
              }}
            >
              <div className={styles.cardIcon}>
                <span>📘</span>
              </div>
              <h3 className={styles.cardTitle}>{prog.name}</h3>
              <p className={styles.cardDesc}>
                Industry-oriented, job-ready training program
              </p>
              <div className={styles.cardMeta}>
                <span className={styles.programCount}>{prog.duration}</span>
                <span className={styles.cardArrow}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
              <div className={styles.cardGlow}></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
