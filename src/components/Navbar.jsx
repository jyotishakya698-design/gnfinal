"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.navInner}`}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
<Image
  src="/GN-logo.png"
  alt="Good Notation Logo"
  width={120}
  height={0}
  sizes="140px"
  style={{
    width: "120px",
    height: "auto",
  }}
  priority
/>
</Link>

        <div className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
          <Link href="/" className={styles.navLink} onClick={closeMenu}>
            Home
          </Link>
          <Link href="/courses" className={styles.navLink} onClick={closeMenu}>
            Courses
          </Link>
          <Link href="/#about" className={styles.navLink} onClick={closeMenu}>
            About
          </Link>
          <Link href="/#contact" className={styles.navLink} onClick={closeMenu}>
            Contact
          </Link>
          <Link href="/courses" className={`btnPrimary ${styles.navCta}`} onClick={closeMenu}>
            Enroll Now
          </Link>
        </div>

        <button
          className={`${styles.hamburger} ${menuOpen ? styles.active : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {menuOpen && <div className={styles.overlay} onClick={closeMenu}></div>}
    </nav>
  );
}
