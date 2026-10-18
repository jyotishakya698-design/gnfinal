"use client";

import { useEffect, useRef } from "react";
import styles from "./WhyChooseUs.module.css";

const features = [
  {
    icon: "👨‍🏫",
    title: "Expert Trainers",
    desc: "Learn from industry professionals with 10+ years of hands-on experience in top tech companies.",
  },
  {
    icon: "💼",
    title: "Job-Oriented Curriculum",
    desc: "Our curriculum is constantly updated to match current industry demands and hiring trends.",
  },
  {
    icon: "🛠️",
    title: "Live Projects",
    desc: "Work on real-world projects and case studies to build a portfolio that impresses recruiters.",
  },
  {
    icon: "🎯",
    title: "Placement Assistance",
    desc: "100% placement support with resume building, mock interviews, and direct company referrals.",
  },
  {
    icon: "🕐",
    title: "Flexible Batches",
    desc: "Choose from weekday, weekend, morning, or evening batches that fit your schedule perfectly.",
  },
  {
    icon: "💰",
    title: "Affordable Fees",
    desc: "Premium quality education at competitive prices with easy EMI options available for all programs.",
  },
];

export default function WhyChooseUs() {
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
      { threshold: 0.1 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className={`section ${styles.why}`} id="about">
      <div className="container">
        <div className="sectionHeader">
          <span className="sectionLabel">Why Good Notation</span>
          <h2 className="sectionTitle">
            Why Students <span>Choose Us</span>
          </h2>
          <p className="sectionSubtitle">
            We don&apos;t just teach — we prepare you for a successful career in
            tech
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((f, i) => (
            <div
              key={i}
              className={styles.card}
              ref={(el) => (cardsRef.current[i] = el)}
              style={{ "--delay": `${i * 0.1}s` }}
            >
              <div className={styles.iconWrap}>
                <span className={styles.icon}>{f.icon}</span>
              </div>
              <h3 className={styles.title}>{f.title}</h3>
              <p className={styles.desc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
