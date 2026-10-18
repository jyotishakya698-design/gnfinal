import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
// import CourseCategories from "../components/CourseCategories";
import PopularCourses from "../components/PopularCourses";
// import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import ContactCTA from "../components/ContactCTA";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        {/* <CourseCategories /> */}
        <PopularCourses />
        {/* <WhyChooseUs /> */}
        <Testimonials />
        <FAQ />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
