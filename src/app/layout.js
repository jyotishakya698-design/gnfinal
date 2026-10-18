import "./globals.css";

export const metadata = {
  title: "Good Notation — The Data & AI School",
  description:
    "Master Data Analytics, AI, Software Development & more with expert-led training programs. Job-oriented courses with placement assistance. Enroll today!",
  keywords:
    "data analytics training, AI courses, data science course, python training, power bi course, digital marketing, good notation, data school",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
