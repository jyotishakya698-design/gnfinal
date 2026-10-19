import Link from "next/link";
import Image from "next/image";
import { programs, contactInfo } from "../data/courseData";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerInner}`}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/GN-logo-light.png"
              alt="Good Notation — The Data & AI School"
              width={120}
              height={0}
              sizes="170px"
              style={{ width: "120px", height: "auto" }}
            />
          </Link>
          <p className={styles.brandDesc}>
            Empowering students with industry-relevant skills in Data Science,
            AI, Software Development, and more. Your gateway to a successful
            tech career.
          </p>
          <div className={styles.socials}>
            <a href="#" className={styles.socialLink} aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="#" className={styles.socialLink} aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="#" className={styles.socialLink} aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a href="#" className={styles.socialLink} aria-label="YouTube">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.08c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.41z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white" />
              </svg>
            </a>
          </div>
        </div>

        <div className={styles.linksGroup}>
          <h4 className={styles.groupTitle}>Quick Links</h4>
          <ul className={styles.linksList}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/courses">All Courses</Link></li>
            <li><Link href="/#about">About Us</Link></li>
            <li><Link href="/#contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className={styles.linksGroup}>
          <h4 className={styles.groupTitle}>Programs</h4>
          <ul className={styles.linksList}>
            {programs.map((prog) => (
              <li key={prog.sno}>
                <Link href="/courses">{prog.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.linksGroup}>
          <h4 className={styles.groupTitle}>Contact</h4>
          <ul className={`${styles.linksList} ${styles.contactList}`}>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <a href={contactInfo.phoneHref}>{contactInfo.phoneDisplay}</a>
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
              </svg>
              <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
              <span>{contactInfo.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <p>© {new Date().getFullYear()} Good Notation — The Data & AI School. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
