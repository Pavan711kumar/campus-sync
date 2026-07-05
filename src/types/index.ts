export type UserRole = "student" | "faculty" | "admin";

export type FacultyStatus =
  | "Available"
  | "In Class"
  | "In Meeting"
  | "Busy"
  | "Out of Campus";

export interface UserProfile {
  uid: string;
  email: string;
  fullName: string;
  role: UserRole;
  department: string;
  skills: string[];
  interests: string[];
  experience: string;
  profilePicture?: string;
  bio: string;
  badges: string[];
  domainExpertise: string[];
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CollaborationProject {
  id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  department: string;
  domain: string;
  teamSize: number;
  currentMembers: number;
  isPaid: boolean;
  budget?: number;
  deadline: string;
  creatorId: string;
  creatorName: string;
  status: "open" | "in_progress" | "completed" | "archived";
  type: "research" | "commercial" | "academic" | "hackathon";
  createdAt: string;
}

export interface ArchivedProject extends CollaborationProject {
  technologies: string[];
  documents: string[];
  contributors: string[];
  mentorId?: string;
  mentorName?: string;
  completedAt: string;
}

export interface AcademicRecord {
  subject: string;
  attendance: number;
  internalMarks: number;
  assignmentScore: number;
  quizScore: number;
  labScore: number;
  semesterResult?: number;
}

export interface Appointment {
  id: string;
  studentId: string;
  studentName: string;
  facultyId: string;
  facultyName: string;
  purpose: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  priority: "normal" | "urgent";
}

export interface ForumQuestion {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  tags: string[];
  category: string;
  upvotes: number;
  answers: number;
  hasAcceptedAnswer: boolean;
  createdAt: string;
}

export interface EquipmentListing {
  id: string;
  title: string;
  description: string;
  category: string;
  ownerId: string;
  ownerName: string;
  pricePerDay: number;
  securityDeposit: number;
  imageUrl?: string;
  available: boolean;
  rating: number;
  reviewCount: number;
}

export interface RideOffer {
  id: string;
  driverId: string;
  driverName: string;
  from: string;
  to: string;
  date: string;
  time: string;
  seats: number;
  costPerSeat: number;
  status: "open" | "full" | "completed";
}

export interface ErrandTask {
  id: string;
  title: string;
  description: string;
  reward: number;
  deadline: string;
  postedBy: string;
  postedByName: string;
  status: "open" | "accepted" | "in_progress" | "completed";
  category: string;
}

export interface RentalListing {
  id: string;
  title: string;
  type: "room" | "pg" | "hostel" | "bike" | "calculator" | "laptop" | "camera" | "projector";
  description: string;
  price: number;
  priceUnit: "day" | "month";
  location: string;
  ownerId: string;
  ownerName: string;
  rating: number;
  available: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type: "workshop" | "hackathon" | "club" | "volunteer" | "technical";
  date: string;
  location: string;
  organizerId: string;
  organizerName: string;
  volunteersNeeded: number;
  volunteersRegistered: number;
  certificateOffered: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "collaboration" | "appointment" | "forum" | "ride" | "rental" | "academic" | "event" | "general";
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface SearchResult {
  id: string;
  type: "student" | "faculty" | "project" | "equipment" | "ride" | "rental" | "event" | "question";
  title: string;
  subtitle: string;
  link: string;
}

export type RequestType = "project" | "equipment" | "ride" | "rental" | "errand" | "appointment" | "event";
export type RequestStatus = "pending" | "approved" | "rejected";

export interface TrackedRequest {
  id: string;
  type: RequestType;
  targetId: string;
  targetName: string;
  status: RequestStatus;
  createdAt: string;
}
