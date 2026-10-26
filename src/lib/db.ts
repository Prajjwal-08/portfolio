import { db } from "@/lib/firebase";
import { collection, getDocs, onSnapshot, query, orderBy } from "firebase/firestore";
import { Project, projects as fallbackProjects } from "@/data/projects";
import { Skill, skills as fallbackSkills } from "@/data/skills";
import { TimelineItem, education as fallbackEducation, experience as fallbackExperience } from "@/data/experience";

export type { Project, Skill, TimelineItem };

/**
 * Fetch all projects from Firestore, falling back to static projects.ts if empty or error.
 */
export async function getProjects(): Promise<Project[]> {
  try {
    const snapshot = await getDocs(collection(db, "projects"));
    if (!snapshot.empty) {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as (Project & { order?: number; updatedAt?: string })[];

      // Sort in-memory: items with order first, otherwise by updatedAt descending
      return items.sort((a, b) => {
        if (a.order !== undefined && b.order !== undefined) {
          return a.order - b.order;
        }
        if (a.order !== undefined) return -1;
        if (b.order !== undefined) return 1;
        return (b.updatedAt || '').localeCompare(a.updatedAt || '');
      });
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
    const snapshot = await getDocs(collection(db, "skills"));
    if (!snapshot.empty) {
      const items = snapshot.docs.map((doc) => doc.data()) as (Skill & { order?: number })[];
      return items.sort((a, b) => (a.order || 999) - (b.order || 999));
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
    const snapshot = await getDocs(collection(db, "experience"));
    if (!snapshot.empty) {
      const all = snapshot.docs.map((doc) => doc.data()) as (TimelineItem & { order?: number })[];
      const sorted = all.sort((a, b) => (a.order || 999) - (b.order || 999));
      return {
        experience: sorted.filter((item) => item.type === "experience"),
        education: sorted.filter((item) => item.type === "education"),
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

/**
 * Subscribe to real-time project updates from Firestore.
 */
export function subscribeProjects(callback: (projects: Project[]) => void): () => void {
  try {
    return onSnapshot(
      collection(db, "projects"),
      (snapshot) => {
        if (!snapshot.empty) {
          const items = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as (Project & { order?: number; updatedAt?: string })[];

          const sorted = items.sort((a, b) => {
            if (a.order !== undefined && b.order !== undefined) {
              return a.order - b.order;
            }
            if (a.order !== undefined) return -1;
            if (b.order !== undefined) return 1;
            return (b.updatedAt || '').localeCompare(a.updatedAt || '');
          });
          callback(sorted);
        } else {
          callback(fallbackProjects);
        }
      },
      (err) => {
        console.warn("Realtime projects listener error:", err);
        callback(fallbackProjects);
      }
    );
  } catch (err) {
    console.warn("Could not attach projects listener:", err);
    callback(fallbackProjects);
    return () => {};
  }
}

/**
 * Subscribe to real-time skill updates from Firestore.
 */
export function subscribeSkills(callback: (skills: Skill[]) => void): () => void {
  try {
    return onSnapshot(
      collection(db, "skills"),
      (snapshot) => {
        if (!snapshot.empty) {
          const items = snapshot.docs.map((doc) => doc.data()) as (Skill & { order?: number })[];
          callback(items.sort((a, b) => (a.order || 999) - (b.order || 999)));
        } else {
          callback(fallbackSkills);
        }
      },
      (err) => {
        console.warn("Realtime skills listener error:", err);
        callback(fallbackSkills);
      }
    );
  } catch (err) {
    console.warn("Could not attach skills listener:", err);
    callback(fallbackSkills);
    return () => {};
  }
}

/**
 * Subscribe to real-time timeline updates from Firestore.
 */
export function subscribeTimeline(
  callback: (data: { experience: TimelineItem[]; education: TimelineItem[] }) => void
): () => void {
  try {
    return onSnapshot(
      collection(db, "experience"),
      (snapshot) => {
        if (!snapshot.empty) {
          const all = snapshot.docs.map((doc) => doc.data()) as (TimelineItem & { order?: number })[];
          const sorted = all.sort((a, b) => (a.order || 999) - (b.order || 999));
          callback({
            experience: sorted.filter((item) => item.type === "experience"),
            education: sorted.filter((item) => item.type === "education"),
          });
        } else {
          callback({
            experience: fallbackExperience,
            education: fallbackEducation,
          });
        }
      },
      (err) => {
        console.warn("Realtime timeline listener error:", err);
        callback({
          experience: fallbackExperience,
          education: fallbackEducation,
        });
      }
    );
  } catch (err) {
    console.warn("Could not attach timeline listener:", err);
    callback({
      experience: fallbackExperience,
      education: fallbackEducation,
    });
    return () => {};
  }
}
