import type { CollaborationProject, UserProfile, SearchResult } from "@/types";

export function getCollaborationRecommendations(
  user: UserProfile,
  projects: CollaborationProject[]
): (CollaborationProject & { matchScore: number })[] {
  return projects
    .filter((p) => p.status === "open")
    .map((project) => {
      const skillOverlap = project.requiredSkills.filter((s) =>
        user.skills.some((us) => us.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(us.toLowerCase()))
      ).length;
      const interestMatch = user.interests.some(
        (i) => i.toLowerCase() === project.domain.toLowerCase()
      )
        ? 20
        : 0;
      const deptMatch = user.department === project.department ? 15 : 0;
      const skillScore = (skillOverlap / Math.max(project.requiredSkills.length, 1)) * 65;
      const matchScore = Math.min(100, Math.round(skillScore + interestMatch + deptMatch));
      return { ...project, matchScore };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}

export function getFacultyRecommendations(
  purpose: string,
  facultyList: { id: string; name: string; department: string; expertise: string[]; status: string }[]
) {
  const keywords = purpose.toLowerCase().split(" ");
  return facultyList
    .map((f) => {
      const expertiseMatch = f.expertise.filter((e) =>
        keywords.some((k) => e.toLowerCase().includes(k))
      ).length;
      const available = f.status === "Available" ? 30 : 0;
      const score = expertiseMatch * 25 + available;
      return { ...f, score };
    })
    .sort((a, b) => b.score - a.score);
}

export function smartSearch(query: string, data: {
  students: { id: string; name: string; department: string }[];
  faculty: { id: string; name: string; department: string }[];
  projects: CollaborationProject[];
  equipment: { id: string; title: string; category: string }[];
  rides: { id: string; from: string; to: string }[];
  rentals: { id: string; title: string; type: string }[];
  events: { id: string; title: string; type: string }[];
  questions: { id: string; title: string; category: string }[];
}): SearchResult[] {
  const q = query.toLowerCase();
  if (!q.trim()) return [];

  const results: SearchResult[] = [];

  data.students
    .filter((s) => s.name.toLowerCase().includes(q) || s.department.toLowerCase().includes(q))
    .slice(0, 3)
    .forEach((s) =>
      results.push({ id: s.id, type: "student", title: s.name, subtitle: s.department, link: `/dashboard/student/profile` })
    );

  data.faculty
    .filter((f) => f.name.toLowerCase().includes(q) || f.department.toLowerCase().includes(q))
    .slice(0, 3)
    .forEach((f) =>
      results.push({ id: f.id, type: "faculty", title: f.name, subtitle: f.department, link: `/dashboard/student/faculty-connect` })
    );

  data.projects
    .filter((p) => p.title.toLowerCase().includes(q) || p.domain.toLowerCase().includes(q))
    .slice(0, 3)
    .forEach((p) =>
      results.push({ id: p.id, type: "project", title: p.title, subtitle: p.domain, link: `/dashboard/student/collaboration-hub` })
    );

  data.equipment
    .filter((e) => e.title.toLowerCase().includes(q) || e.category.toLowerCase().includes(q))
    .slice(0, 2)
    .forEach((e) =>
      results.push({ id: e.id, type: "equipment", title: e.title, subtitle: e.category, link: `/dashboard/student/equipment` })
    );

  data.questions
    .filter((qn) => qn.title.toLowerCase().includes(q))
    .slice(0, 2)
    .forEach((qn) =>
      results.push({ id: qn.id, type: "question", title: qn.title, subtitle: qn.category, link: `/dashboard/student/forum` })
    );

  return results;
}

export function getAcademicInsights(records: { subject: string; attendance: number; internalMarks: number; assignmentScore: number }[]) {
  const lowAttendance = records.filter((r) => r.attendance < 75);
  const strongSubjects = records.filter((r) => r.assignmentScore >= 90);
  const needsImprovement = records.filter((r) => r.internalMarks < 40);

  return {
    lowAttendance,
    strongSubjects,
    needsImprovement,
    overallAttendance: Math.round(records.reduce((a, r) => a + r.attendance, 0) / records.length),
    recommendations: [
      ...(lowAttendance.length > 0
        ? [`Improve attendance in ${lowAttendance.map((r) => r.subject).join(", ")}`]
        : []),
      ...(needsImprovement.length > 0
        ? [`Focus on internals for ${needsImprovement.map((r) => r.subject).join(", ")}`]
        : []),
      ...(strongSubjects.length > 0
        ? [`Great performance in ${strongSubjects.map((r) => r.subject).join(", ")}!`]
        : []),
    ],
  };
}
