import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { Project, projects as fallbackProjects } from "@/data/projects";
import { Skill, skills as fallbackSkills } from "@/data/skills";
import { TimelineItem, education as fallbackEducation, experience as fallbackExperience } from "@/data/experience";

export type { Project, Skill, TimelineItem };

/**
 * Fetch all projects from Firestore, falling back to static projects.ts if empty or error.
 */
export async function getProjects(): Promise<Project[]> {
  try {
    const q = query(collection(db, "projects"), orderBy("order", "asc"));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Project[];
    }
  } catch (err) {
    console.warn("Firestore projects fetch failed or offline, using fallback:", err);
  }
  return fallbackProjects;
}

/**
 * Fetch all skills from Firestore, falling back to static skills.ts if empty or error.
 */
export async function getSkills(): Promise<Skill[]> {
  try {
    const q = query(collection(db, "skills"), orderBy("order", "asc"));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs.map((doc) => doc.data()) as Skill[];
    }
  } catch (err) {
    console.warn("Firestore skills fetch failed or offline, using fallback:", err);
  }
  return fallbackSkills;
}

/**
 * Fetch experience & education from Firestore, falling back to static experience.ts.
 */
export async function getTimeline(): Promise<{
  experience: TimelineItem[];
  education: TimelineItem[];
}> {
  try {
    const q = query(collection(db, "experience"), orderBy("order", "asc"));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const all = snapshot.docs.map((doc) => doc.data()) as TimelineItem[];
      return {
        experience: all.filter((item) => item.type === "experience"),
        education: all.filter((item) => item.type === "education"),
      };
    }
  } catch (err) {
    console.warn("Firestore timeline fetch failed or offline, using fallback:", err);
  }
  return {
    experience: fallbackExperience,
    education: fallbackEducation,
  };
}
