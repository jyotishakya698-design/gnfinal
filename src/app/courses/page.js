"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BrochureDownload from "../../components/BrochureDownload";
import { programs } from "../../data/courseData";
import styles from "./courses.module.css";

export default function CoursesPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisible(true);
        });
      },
      { threshold: 0.05 }
    );

    const el = document.getElementById("programs");
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {/* Hero Banner */}
        <section className={styles.hero}>
          <div className={styles.heroBg}></div>
          <div className={`container ${styles.heroContent}`}>
            <Link href="/" className={styles.breadcrumb}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Home
            </Link>
            <h1 className={styles.heroTitle}>Our Programs</h1>
            <p className={styles.heroSubtitle}>
              Explore our comprehensive range of industry-oriented training
              programs designed to make you job-ready
            </p>

            <div className={styles.heroCtas}>
              <BrochureDownload className={`btnPrimary ${styles.brochureBtn}`} />
            </div>
          </div>
        </section>

        {/* Program List */}
        <div className={`container ${styles.content}`}>
          <section
            id="programs"
            className={`${styles.categorySection} ${visible ? styles.visible : ""}`}
          >
            <div className={styles.catHeader}>
              <div
                className={styles.catIcon}
                style={{ background: "#2563EB15", color: "#2563EB" }}
              >
                📚
              </div>
              <div className={styles.catHeaderText}>
                <h2 className={styles.catTitle}>All Programs</h2>
                <p className={styles.catDesc}>
                  Choose the program that matches your career goals
                </p>
              </div>
              <BrochureDownload
                className={styles.catHeaderBtn}
                label="Download Brochure"
              />
            </div>

            {/* Desktop Table */}
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Program Name</th>
                    <th>Duration</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {programs.map((prog) => (
                    <tr key={prog.sno}>
                      <td className={styles.sno}>{prog.sno}</td>
                      <td>
                        <div className={styles.progName}>{prog.name}</div>
                        {prog.tags?.length > 0 && (
                          <div className={styles.progTags}>
                            {prog.tags.map((tag) => (
                              <span key={tag} className={styles.progTag}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </td>
                      <td className={styles.duration}>{prog.duration || "—"}</td>
                      <td>
                        <Link href="/#contact" className={styles.enquireBtn}>
                          Enquire Now
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className={styles.mobileCards}>
              {programs.map((prog) => (
                <div key={prog.sno} className={styles.mobileCard}>
                  <div className={styles.mobileCardHeader}>
                    <span className={styles.mobileNum}>{prog.sno}</span>
                    <h3 className={styles.mobileName}>{prog.name}</h3>
                  </div>
                  {prog.tags?.length > 0 && (
                    <div className={styles.mobileTags}>
                      {prog.tags.map((tag) => (
                        <span key={tag} className={styles.progTag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className={styles.mobileMeta}>
                    <span className={styles.mobileDetail}>
                      🕐 {prog.duration}
                    </span>
                  </div>
                  <Link href="/#contact" className={styles.enquireBtn}>
                    Enquire Now
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
