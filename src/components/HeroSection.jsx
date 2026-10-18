"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  const statsRef = useRef([]);

  useEffect(() => {
    const counters = document.querySelectorAll(`.${styles.statValue}`);
    const animateCounter = (el) => {
      const target = parseInt(el.getAttribute("data-target"), 10);
      const duration = 2000;
      const start = performance.now();

      const update = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(update);
      };
      requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => observer.observe(counter));
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.hero}>
      {/* Animated background elements */}
      <div className={styles.bgElements}>
        <div className={`${styles.bgCircle} ${styles.circle1}`}></div>
        <div className={`${styles.bgCircle} ${styles.circle2}`}></div>
        <div className={`${styles.bgCircle} ${styles.circle3}`}></div>
        <div className={styles.gridPattern}></div>
      </div>

      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <span className={styles.badgeDot}></span>
            Admissions Open 2025-26
          </div>

          <h1 className={styles.heroTitle}>
            Master <span className={styles.highlight}>Data, AI</span> &{" "}
            <span className={styles.highlight}>Technology</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Industry-oriented training programs designed to make you job-ready.
            Learn from expert trainers with hands-on projects and 100% placement
            assistance.
          </p>

          <div className={styles.heroCtas}>
            <Link href="/courses" className="btnPrimary">
              Explore Courses
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/#contact" className="btnSecondary">
              Talk to Counsellor
            </Link>
          </div>

          <div className={styles.heroTrust}>
            <div className={styles.trustAvatars}>
              <span className={styles.avatar} style={{background: '#3B82F6'}}>PS</span>
              <span className={styles.avatar} style={{background: '#7C3AED'}}>RV</span>
              <span className={styles.avatar} style={{background: '#10B981'}}>AG</span>
              <span className={styles.avatar} style={{background: '#F59E0B'}}>VK</span>
              <span className={styles.avatarMore}>+5K</span>
            </div>
            <div className={styles.trustText}>
              <strong>5,000+</strong> students already enrolled
            </div>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.floatingCard} style={{ animationDelay: "0s" }}>
            <span className={styles.cardIcon}>📊</span>
            <span>Data Science</span>
          </div>
          <div className={styles.floatingCard} style={{ animationDelay: "1s" }}>
            <span className={styles.cardIcon}>🤖</span>
            <span>Generative AI</span>
          </div>
          <div className={styles.floatingCard} style={{ animationDelay: "2s" }}>
            <span className={styles.cardIcon}>💻</span>
            <span>Web Development</span>
          </div>
          <div className={styles.floatingCard} style={{ animationDelay: "0.5s" }}>
            <span className={styles.cardIcon}>📈</span>
            <span>Data Analyst</span>
          </div>
          <div className={styles.centralOrb}></div>
        </div>
      </div>

      <div className={styles.heroStats}>
        <div className={`container ${styles.statsGrid}`}>
          <div className={styles.statItem}>
            <span className={styles.statValue} data-target="5000">0</span>
            <span className={styles.statSuffix}>+</span>
            <span className={styles.statLabel}>Students Trained</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <span className={styles.statValue} data-target="20">0</span>
            <span className={styles.statSuffix}>+</span>
            <span className={styles.statLabel}>Courses Offered</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <span className={styles.statValue} data-target="95">0</span>
            <span className={styles.statSuffix}>%</span>
            <span className={styles.statLabel}>Placement Rate</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <span className={styles.statValue} data-target="30">0</span>
            <span className={styles.statSuffix}>+</span>
            <span className={styles.statLabel}>Expert Trainers</span>
          </div>
        </div>
      </div>
    </section>
  );
}
