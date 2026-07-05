export const APP_NAME = "CampusSync AI";
export const APP_DESCRIPTION =
  "AI-powered college collaboration platform connecting students, faculty, and administrators.";

export const ALLOWED_EMAIL_DOMAINS = ["gmail.com", "googlemail.com"];

/** @deprecated Use ALLOWED_EMAIL_DOMAINS */
export const APPROVED_EMAIL_DOMAINS = ALLOWED_EMAIL_DOMAINS;

export const DEPARTMENTS = [
  "Computer Science",
  "Electronics & Communication",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Information Technology",
  "Biotechnology",
  "Business Administration",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Humanities",
];

export const SKILLS = [
  "React",
  "Node.js",
  "Python",
  "Machine Learning",
  "Data Science",
  "IoT",
  "Robotics",
  "UI/UX Design",
  "Cloud Computing",
  "Cybersecurity",
  "Mobile Development",
  "Blockchain",
  "DevOps",
  "Embedded Systems",
  "Research",
];

export const DOMAINS = [
  "Web Development",
  "AI/ML",
  "IoT",
  "Robotics",
  "Research",
  "Mobile Apps",
  "Data Analytics",
  "Cybersecurity",
  "Cloud",
  "Blockchain",
  "Design",
  "Entrepreneurship",
];

export const EQUIPMENT_CATEGORIES = [
  "Electronics Kits",
  "IoT Components",
  "Arduino",
  "Raspberry Pi",
  "Robotics",
  "Mechanical Tools",
  "Survey Equipment",
  "Books",
  "Lab Manuals",
  "Laptop Accessories",
];

export const FORUM_CATEGORIES = [
  "Programming",
  "Mathematics",
  "Engineering",
  "Science",
  "Career",
  "Projects",
  "Exams",
  "General",
];

export const FACULTY_STATUSES = [
  "Available",
  "In Class",
  "In Meeting",
  "Busy",
  "Out of Campus",
] as const;

export const STUDENT_NAV_ITEMS = [
  { label: "Overview", href: "/dashboard/student", icon: "LayoutDashboard" },
  { label: "Academic Tracker", href: "/dashboard/student/academic-tracker", icon: "GraduationCap" },
  { label: "My Requests", href: "/dashboard/student/requests", icon: "ListTodo" },
  { label: "Collaboration Hub", href: "/dashboard/student/collaboration-hub", icon: "Users" },
  { label: "Smart Faculty Connect", href: "/dashboard/student/faculty-connect", icon: "Calendar" },
  { label: "Academic Forum", href: "/dashboard/student/forum", icon: "MessageSquare" },
  { label: "Equipment Rental", href: "/dashboard/student/equipment", icon: "Wrench" },
  { label: "Ride Sharing", href: "/dashboard/student/rides", icon: "Car" },
  { label: "Errands", href: "/dashboard/student/errands", icon: "ShoppingBag" },
  { label: "Rental Marketplace", href: "/dashboard/student/rentals", icon: "Home" },
  { label: "Volunteering", href: "/dashboard/student/volunteering", icon: "Heart" },
  { label: "Colab Repository", href: "/dashboard/student/repository", icon: "Archive" },
  { label: "Notifications", href: "/dashboard/student/notifications", icon: "Bell" },
  { label: "Profile", href: "/dashboard/student/profile", icon: "User" },
  { label: "Settings", href: "/dashboard/student/settings", icon: "Settings" },
];

export const FACULTY_NAV_ITEMS = [
  { label: "Overview", href: "/dashboard/faculty", icon: "LayoutDashboard" },
  { label: "Faculty Scheduler", href: "/dashboard/faculty/scheduler", icon: "Calendar" },
  { label: "Feedback Analytics", href: "/dashboard/faculty/feedback", icon: "BarChart3" },
  { label: "Faculty Portfolio", href: "/dashboard/faculty/portfolio", icon: "Briefcase" },
  { label: "Student Appointments", href: "/dashboard/faculty/appointments", icon: "Users" },
  { label: "Notifications", href: "/dashboard/faculty/notifications", icon: "Bell" },
  { label: "Settings", href: "/dashboard/faculty/settings", icon: "Settings" },
];
