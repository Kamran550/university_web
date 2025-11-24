export interface Program {
  id: string;
  title: string;
  category:
    | "undergraduate"
    | "graduate"
    | "doctoral"
    | "online"
    | "professional";
  degree: string;
  duration: string;
  description: string;
  features: string[];
  career: string[];
  image?: string;
  featured?: boolean;
}

export const programs: Program[] = [
  {
    id: "ba-business",
    title: "Business Administration",
    category: "undergraduate",
    degree: "Bachelor's",
    duration: "4 Years",
    description:
      "Comprehensive business education covering management, finance, marketing, and entrepreneurship to prepare future business leaders.",
    features: [
      "Modern curriculum",
      "Industry internships",
      "Case studies",
      "Business simulations",
      "Career counseling",
    ],
    career: [
      "Business Analyst",
      "Marketing Manager",
      "Entrepreneur",
      "Financial Advisor",
    ],
    featured: true,
  },
  {
    id: "ba-computer-science",
    title: "Computer Science",
    category: "undergraduate",
    degree: "Bachelor's",
    duration: "4 Years",
    description:
      "Cutting-edge computer science program focusing on software development, algorithms, and emerging technologies.",
    features: [
      "Hands-on projects",
      "Industry partnerships",
      "Research opportunities",
      "Modern labs",
      "Internship programs",
    ],
    career: [
      "Software Developer",
      "Data Scientist",
      "System Analyst",
      "IT Consultant",
    ],
    featured: true,
  },
  {
    id: "ba-psychology",
    title: "Psychology",
    category: "undergraduate",
    degree: "Bachelor's",
    duration: "4 Years",
    description:
      "Explore human behavior and mental processes through comprehensive psychological studies and practical applications.",
    features: [
      "Research labs",
      "Clinical experience",
      "Field work",
      "Case studies",
      "Internship opportunities",
    ],
    career: [
      "Counselor",
      "Research Analyst",
      "HR Specialist",
      "Mental Health Worker",
    ],
  },
  {
    id: "ma-mba",
    title: "Master of Business Administration",
    category: "graduate",
    degree: "Master's",
    duration: "2 Years",
    description:
      "Advanced business administration program designed for professionals seeking leadership roles and strategic management skills.",
    features: [
      "Executive workshops",
      "Global case studies",
      "Leadership development",
      "Networking events",
      "Career placement",
    ],
    career: [
      "CEO",
      "Operations Manager",
      "Strategy Consultant",
      "Business Development",
    ],
    featured: true,
  },
  {
    id: "ma-data-science",
    title: "Data Science",
    category: "graduate",
    degree: "Master's",
    duration: "2 Years",
    description:
      "Advanced data science program focusing on machine learning, big data analytics, and artificial intelligence.",
    features: [
      "Advanced analytics",
      "ML & AI focus",
      "Industry projects",
      "Research opportunities",
      "Tech partnerships",
    ],
    career: [
      "Data Scientist",
      "ML Engineer",
      "Analytics Manager",
      "AI Specialist",
    ],
    featured: true,
  },
  {
    id: "ma-education",
    title: "Education Leadership",
    category: "graduate",
    degree: "Master's",
    duration: "2 Years",
    description:
      "Prepare for educational leadership roles with advanced pedagogy, administration, and policy development skills.",
    features: [
      "Leadership training",
      "Policy analysis",
      "Administrative skills",
      "Field experience",
      "Mentorship program",
    ],
    career: [
      "School Principal",
      "Education Administrator",
      "Policy Advisor",
      "Curriculum Developer",
    ],
  },
  {
    id: "phd-business",
    title: "Business Administration",
    category: "doctoral",
    degree: "Ph.D.",
    duration: "3-4 Years",
    description:
      "Doctoral program in business administration focusing on advanced research, theory development, and academic excellence.",
    features: [
      "Research funding",
      "Thesis supervision",
      "Publication support",
      "Conference attendance",
      "Academic mentorship",
    ],
    career: [
      "University Professor",
      "Research Director",
      "Business Consultant",
      "Policy Researcher",
    ],
  },
  {
    id: "phd-psychology",
    title: "Psychology",
    category: "doctoral",
    degree: "Ph.D.",
    duration: "3-4 Years",
    description:
      "Advanced doctoral program in psychology with specialization in clinical, research, or applied psychology fields.",
    features: [
      "Clinical training",
      "Research opportunities",
      "Publication support",
      "Teaching experience",
      "Professional development",
    ],
    career: [
      "Clinical Psychologist",
      "Researcher",
      "University Professor",
      "Therapist",
    ],
  },
  {
    id: "online-mba",
    title: "Online MBA",
    category: "online",
    degree: "Master's",
    duration: "2 Years",
    description:
      "Flexible online MBA program designed for working professionals seeking to advance their careers without interrupting their work.",
    features: [
      "Flexible schedule",
      "Online resources",
      "Virtual lectures",
      "Student support",
      "Networking opportunities",
    ],
    career: ["Business Manager", "Executive", "Consultant", "Entrepreneur"],
  },
  {
    id: "online-compsci",
    title: "Online Computer Science",
    category: "online",
    degree: "Bachelor's",
    duration: "4 Years",
    description:
      "Comprehensive online computer science program offering the same quality education as on-campus programs.",
    features: [
      "Self-paced learning",
      "Virtual labs",
      "Online support",
      "Career services",
      "Digital resources",
    ],
    career: [
      "Software Developer",
      "Web Developer",
      "System Administrator",
      "IT Specialist",
    ],
  },
  {
    id: "cert-digital-marketing",
    title: "Digital Marketing Certificate",
    category: "professional",
    degree: "Certificate",
    duration: "6 Months",
    description:
      "Professional certificate program in digital marketing covering SEO, social media, content marketing, and analytics.",
    features: [
      "Industry-focused",
      "Practical projects",
      "Expert instructors",
      "Career support",
      "Certificate award",
    ],
    career: [
      "Digital Marketer",
      "SEO Specialist",
      "Content Manager",
      "Social Media Manager",
    ],
  },
  {
    id: "cert-project-management",
    title: "Project Management",
    category: "professional",
    degree: "Certificate",
    duration: "6 Months",
    description:
      "Professional project management certification preparing you for PMP certification and leadership roles.",
    features: [
      "PMP preparation",
      "Real-world projects",
      "Industry standards",
      "Certification support",
      "Career guidance",
    ],
    career: [
      "Project Manager",
      "Program Manager",
      "Operations Manager",
      "Consultant",
    ],
  },
];

export const categories = [
  { id: "all", label: "All Programs" },
  { id: "undergraduate", label: "Undergraduate" },
  { id: "graduate", label: "Graduate" },
  { id: "doctoral", label: "Doctoral" },
  { id: "online", label: "Online" },
  { id: "professional", label: "Professional" },
];
