export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  category:
    | "university"
    | "events"
    | "announcements"
    | "academic"
    | "student-life";
  date: string;
  excerpt: string;
  content: string;
  image?: string;
  author: string;
  featured?: boolean;
  readTime?: number;
  tags?: string[];
}

export const newsCategories = [
  { id: "all", label: "All News" },
  { id: "university", label: "University" },
  { id: "events", label: "Events" },
  { id: "announcements", label: "Announcements" },
  { id: "academic", label: "Academic" },
  { id: "student-life", label: "Student Life" },
];

export const news: NewsItem[] = [
  {
    id: "1",
    title: "EIPU Welcomes New International Students",
    slug: "eipu-welcomes-new-international-students",
    category: "university",
    date: "2024-12-15",
    excerpt:
      "European International Peace University proudly welcomes over 150 new international students from 30 different countries this academic year.",
    content: `
      <p>European International Peace University (EIPU) is thrilled to announce the arrival of over 150 new international students from 30 different countries, marking one of the most diverse cohorts in our university's history.</p>
      
      <h2>A Global Community</h2>
      <p>This year's international students represent a wide range of cultures, bringing unique perspectives and experiences to our campus community. The incoming students come from countries across Europe, Asia, Africa, and the Americas, further enriching our global educational environment.</p>
      
      <h2>Orientation Program</h2>
      <p>To ensure a smooth transition, we've organized a comprehensive orientation program that includes:</p>
      <ul>
        <li>Campus tours and facility introductions</li>
        <li>Academic advising sessions</li>
        <li>Cultural integration workshops</li>
        <li>International student support services</li>
      </ul>
      
      <p>We're excited to see the contributions these new students will make to our university community and wish them success in their academic journey at EIPU.</p>
    `,
    author: "Admissions Office",
    featured: true,
    readTime: 3,
    tags: ["International Students", "Admissions", "University"],
    image: "/images/about-campus.jpg",
  },
  {
    id: "2",
    title: "Annual Peace Education Conference 2024",
    slug: "annual-peace-education-conference-2024",
    category: "events",
    date: "2024-12-10",
    excerpt:
      "Join us for our annual Peace Education Conference featuring renowned speakers and workshops on global peace initiatives.",
    content: `
      <p>We're excited to announce the Annual Peace Education Conference 2024, scheduled for March 15-17, 2025. This year's conference will focus on "Building Bridges: Education for Global Peace."</p>
      
      <h2>Featured Speakers</h2>
      <p>The conference will feature distinguished speakers from around the world, including Nobel Peace Prize laureates, renowned academics, and peace activists.</p>
      
      <h2>Workshops and Sessions</h2>
      <p>Participants can attend various workshops covering topics such as conflict resolution, international diplomacy, and community peacebuilding.</p>
    `,
    author: "Events Committee",
    featured: true,
    readTime: 5,
    tags: ["Conference", "Peace Education", "Events"],
    image: "/images/about-campus.jpg",
  },
  {
    id: "3",
    title: "New Research Lab Opening Ceremony",
    slug: "new-research-lab-opening-ceremony",
    category: "academic",
    date: "2024-12-05",
    excerpt:
      "EIPU celebrates the opening of a state-of-the-art research laboratory dedicated to peace studies and international relations.",
    content: `
      <p>Today marks a significant milestone as we officially open our new research laboratory, equipped with cutting-edge technology for peace studies and international relations research.</p>
      
      <p>The facility will support innovative research projects and provide students with hands-on learning opportunities in advanced research methodologies.</p>
    `,
    author: "Research Department",
    featured: false,
    readTime: 4,
    tags: ["Research", "Academic", "Facilities"],
    image: "/images/about-campus.jpg",
  },
  {
    id: "4",
    title: "Scholarship Application Deadline Extended",
    slug: "scholarship-application-deadline-extended",
    category: "announcements",
    date: "2024-12-01",
    excerpt:
      "Good news! The deadline for scholarship applications has been extended to January 15, 2025.",
    content: `
      <p>Due to high demand, we're pleased to announce that the scholarship application deadline has been extended to January 15, 2025. This gives prospective students additional time to complete their applications.</p>
      
      <p>Visit our fees page for more information about available scholarships and application requirements.</p>
    `,
    author: "Financial Aid Office",
    featured: false,
    readTime: 2,
    tags: ["Scholarships", "Financial Aid", "Admissions"],
  },
  {
    id: "5",
    title: "Student Leadership Workshop Series",
    slug: "student-leadership-workshop-series",
    category: "student-life",
    date: "2024-11-28",
    excerpt:
      "Join our new student leadership workshop series designed to develop leadership skills and empower student leaders.",
    content: `
      <p>We're launching a comprehensive student leadership workshop series open to all students interested in developing their leadership capabilities.</p>
      
      <p>The workshops will cover topics including effective communication, team management, and ethical leadership practices.</p>
    `,
    author: "Student Affairs",
    featured: false,
    readTime: 3,
    tags: ["Student Life", "Leadership", "Workshops"],
  },
  {
    id: "6",
    title: "International Partnership with European Universities",
    slug: "international-partnership-european-universities",
    category: "university",
    date: "2024-11-25",
    excerpt:
      "EIPU signs partnership agreements with leading European universities to enhance student exchange programs.",
    content: `
      <p>We're excited to announce new partnership agreements with several leading European universities, expanding our student exchange program opportunities.</p>
      
      <p>These partnerships will enable students to study abroad and gain international experience while earning credits towards their degrees.</p>
    `,
    author: "International Relations Office",
    featured: false,
    readTime: 4,
    tags: ["Partnerships", "International", "Exchange Programs"],
  },
  {
    id: "7",
    title: "New Online Learning Platform Launch",
    slug: "new-online-learning-platform-launch",
    category: "academic",
    date: "2024-11-20",
    excerpt:
      "EIPU launches a new online learning platform providing enhanced digital learning experiences for students.",
    content: `
      <p>We're proud to announce the launch of our new online learning platform, designed to provide an enhanced digital learning experience for all students.</p>
      
      <p>The platform features interactive modules, virtual classrooms, and comprehensive course management tools.</p>
    `,
    author: "IT Department",
    featured: false,
    readTime: 3,
    tags: ["Technology", "Online Learning", "Academic"],
  },
  {
    id: "8",
    title: "Graduation Ceremony 2024 Highlights",
    slug: "graduation-ceremony-2024-highlights",
    category: "events",
    date: "2024-11-15",
    excerpt:
      "Celebrating the achievements of our 2024 graduates in a memorable commencement ceremony.",
    content: `
      <p>We celebrated the achievements of our 2024 graduates in a memorable commencement ceremony attended by families, friends, and distinguished guests.</p>
      
      <p>Congratulations to all our graduates on their outstanding achievements and best wishes for their future endeavors.</p>
    `,
    author: "University Communications",
    featured: false,
    readTime: 4,
    tags: ["Graduation", "Events", "Celebration"],
    image: "/images/about-campus.jpg",
  },
  {
    id: "9",
    title: "Sustainability Initiatives at EIPU",
    slug: "sustainability-initiatives-at-eipu",
    category: "university",
    date: "2024-11-10",
    excerpt:
      "EIPU announces new sustainability initiatives as part of our commitment to environmental responsibility.",
    content: `
      <p>As part of our commitment to environmental responsibility, we're launching several new sustainability initiatives on campus.</p>
      
      <p>These include renewable energy projects, waste reduction programs, and sustainable transportation options for students and staff.</p>
    `,
    author: "Sustainability Office",
    featured: false,
    readTime: 5,
    tags: ["Sustainability", "Environment", "University"],
  },
  {
    id: "10",
    title: "Career Fair 2024 Success",
    slug: "career-fair-2024-success",
    category: "student-life",
    date: "2024-11-05",
    excerpt:
      "The annual career fair connected students with top employers and internship opportunities.",
    content: `
      <p>Our annual career fair was a tremendous success, connecting over 500 students with leading employers and internship opportunities.</p>
      
      <p>Students had the chance to network with industry professionals and explore various career paths in their fields of study.</p>
    `,
    author: "Career Services",
    featured: false,
    readTime: 3,
    tags: ["Career", "Student Life", "Employment"],
  },
  {
    id: "11",
    title: "New Faculty Members Join EIPU",
    slug: "new-faculty-members-join-eipu",
    category: "academic",
    date: "2024-10-30",
    excerpt:
      "We welcome distinguished faculty members who bring expertise and innovation to our academic programs.",
    content: `
      <p>We're pleased to welcome several distinguished faculty members to EIPU, bringing valuable expertise and fresh perspectives to our academic programs.</p>
      
      <p>These new faculty members will strengthen our commitment to academic excellence and innovative teaching.</p>
    `,
    author: "Academic Affairs",
    featured: false,
    readTime: 3,
    tags: ["Faculty", "Academic", "University"],
  },
  {
    id: "12",
    title: "Holiday Break Schedule Announcement",
    slug: "holiday-break-schedule-announcement",
    category: "announcements",
    date: "2024-10-25",
    excerpt:
      "Important information about the holiday break schedule and campus operations during the festive season.",
    content: `
      <p>We're sharing important information about the holiday break schedule and campus operations during the festive season.</p>
      
      <p>Please check the academic calendar for specific dates and ensure you're aware of any changes to your class schedules.</p>
    `,
    author: "Administration",
    featured: false,
    readTime: 2,
    tags: ["Announcements", "Holidays", "Schedule"],
  },
];
