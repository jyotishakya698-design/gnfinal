// ============================================
// Good Notation — Site Data
// Programs are now maintained as a single,
// flat list (the "Data & Analytics" category
// grouping and the fee column have been removed).
// ============================================

export const programs = [
  {
    sno: 1,
    name: "Agentic AI",
    duration: "5 Months",
    tags: ["AI Agents", "LLM Fundamentals", "RAG Systems", "Multi-Agent Systems"],
    brochure: "/brochures/Agentic-AI-Syllabus-2026.pdf",
    brochureName: "Agentic-AI-Syllabus-2026.pdf",
  },
  {
    sno: 2,
    name: "Generative AI",
    duration: "1 Month",
    tags: ["LLMs", "Prompt Engineering", "RAG", "AI Applications"],
  },
  {
    sno: 3,
    name: "Data Science",
    duration: "9 Months",
    tags: ["Machine Learning", "Deep Learning", "NLP", "Big Data"],
    brochure: "/brochures/Data-Science-Syllabus-2026.pdf",
    brochureName: "Data-Science-Syllabus-2026.pdf",
  },
  {
    sno: 4,
    name: "Data Analyst + Using AI",
    duration: "7 Months",
    tags: ["Python & R", "Statistical Analysis", "Data Visualization", "SQL"],
    brochure: "/brochures/Data-Analyst-Syllabus-2026.pdf",
    brochureName: "Data-Analyst-Syllabus-2026.pdf",
  },
  {
    sno: 5,
    name: "Business Analyst + Using AI",
    duration: "8 Months",
    tags: ["Requirements Analysis", "Process Modeling", "Agile", "Stakeholder Management"],
    brochure: "/brochures/Business-Analyst-Syllabus-2026.pdf",
    brochureName: "Business-Analyst-Syllabus-2026.pdf",
  },
  {
    sno: 6,
    name: "Web Development + Using AI",
    duration: "6 Months",
    tags: ["HTML, CSS & JS", "React", "Node.js", "Databases"],
  },
  {
    sno: 7,
    name: "Live Project Training Using AI",
    duration: "1 Month",
    tags: ["Real Projects", "Agile Workflow", "Git & GitHub", "Deployment"],
  },
  {
    sno: 8,
    name: "Interview Preparation",
    duration: "1 Month",
    tags: ["Communication", "Group Discussion", "Mock Interviews", "Resume Building"],
  },
];

// Resolve the brochure for a given program name. Programs without a
// dedicated syllabus PDF fall back to the general brochure.
export function getProgramBrochure(name) {
  const program = programs.find((p) => p.name === name);
  return {
    file: program?.brochure || "/brochures/Good-Notation-Brochure.pdf",
    fileName: program?.brochureName || "Good-Notation-Brochure.pdf",
  };
}

// Programs highlighted on the home page carousel
export const featuredPrograms = [
  "Data Science",
  "Generative AI",
  "Data Analyst + Using AI",
  "Web Development + Using AI",
  "Business Analyst + Using AI",
  "Live Project Training Using AI",
];

export const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    course: "Data Science",
    rating: 5,
    text: "Good Notation transformed my career! The Data Science program was hands-on, with real-world projects that gave me confidence. I landed a job within 2 months of completing the course.",
    avatar: "PS",
  },
  {
    id: 2,
    name: "Rahul Verma",
    course: "Web Development + Using AI",
    rating: 5,
    text: "The trainers are incredibly knowledgeable and patient. The curriculum covers everything from basics to advanced concepts. Highly recommend the Web Development program!",
    avatar: "RV",
  },
  {
    id: 3,
    name: "Anita Gupta",
    course: "Data Analyst + Using AI",
    rating: 5,
    text: "I was working in accounts and wanted to switch to analytics. The Data Analyst course at Good Notation gave me practical skills. Now I create dashboards for senior management daily!",
    avatar: "AG",
  },
  {
    id: 4,
    name: "Vikash Kumar",
    course: "Generative AI",
    rating: 5,
    text: "The GenAI course is cutting-edge! Learned about LLMs, prompt engineering, and building AI applications. The training quality is excellent and completely industry-focused.",
    avatar: "VK",
  },
  {
    id: 5,
    name: "Sneha Patel",
    course: "Data Analyst + Using AI",
    rating: 5,
    text: "As a fresher, I was confused about which direction to take. Good Notation's counselling and the Data Analyst program set me on the right path. Great placement support too!",
    avatar: "SP",
  },
];

export const faqs = [
  {
    question: "What makes Good Notation different from other institutes?",
    answer:
      "Good Notation focuses exclusively on Data, AI, and technology skills with industry-expert trainers, live project-based learning, and dedicated placement assistance. Our curriculum is constantly updated to match current industry demands.",
  },
  {
    question: "Do you provide placement assistance?",
    answer:
      "Yes! We provide 100% placement assistance including resume building, mock interviews, soft skills training, and direct referrals to our hiring partner companies.",
  },
  {
    question: "Are the courses suitable for beginners?",
    answer:
      "Absolutely. Our courses are designed for all levels — from complete beginners to working professionals looking to upskill. Each program starts with fundamentals before advancing to complex topics.",
  },
  {
    question: "What is the mode of training — online or offline?",
    answer:
      "We offer both online and offline training modes. Students can choose the format that best suits their schedule. Weekend and evening batches are also available for working professionals.",
  },
  {
    question: "Can I pay the fee in installments?",
    answer:
      "Yes, we offer flexible EMI options and installment payment plans. Contact our admissions team to learn about available payment options for your chosen course.",
  },
  {
    question: "Do I get a certificate after completing the course?",
    answer:
      "Yes, all students receive a course completion certificate from Good Notation. Some programs also prepare you for globally recognized industry certifications.",
  },
  {
    question: "What are the batch timings?",
    answer:
      "We offer morning, afternoon, and evening batches on weekdays, as well as weekend batches. This flexibility ensures students and working professionals can find a schedule that works for them.",
  },
];

export const stats = [
  { label: "Students Trained", value: 5000, suffix: "+" },
  { label: "Expert Trainers", value: 30, suffix: "+" },
  { label: "Placement Rate", value: 95, suffix: "%" },
  { label: "Courses Offered", value: 20, suffix: "+" },
];

// Central place for the institute's contact details
export const contactInfo = {
  phoneDisplay: "+91 92891 70269",
  phoneHref: "tel:+919289170269",
  email: "info@goodnotation.com",
  address:
    "Tech Zone IV, Amrapali Riverview, Greater Noida West, Uttar Pradesh 201318",
};
