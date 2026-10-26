import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { Project, Skill, TimelineItem } from "@/lib/db";

// --- ADMIN USERS (Stored in Firestore or default fallback) ---
export interface AdminUser {
  id: string;
  username: string;
  passwordHash: string; // SHA-256
  name: string;
  createdAt: string;
}

// Built-in default admin account (fallback if Firestore collection is empty)
// Default Password is: password123
export const DEFAULT_ADMIN: AdminUser = {
  id: "default-admin",
  username: "admin",
  passwordHash: "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f", // SHA-256 of "password123"
  name: "Prajjwal Admin",
  createdAt: new Date().toISOString(),
};

// SHA-256 hash using web crypto
export async function hashPassword(password: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Authenticate user against Firestore with default admin fallback
export async function authenticateAdmin(username: string, password: string): Promise<AdminUser | null> {
  const cleanUsername = username.toLowerCase().trim();
  const computedHash = await hashPassword(password);

  // 1. Check default admin
  if (cleanUsername === DEFAULT_ADMIN.username && computedHash === DEFAULT_ADMIN.passwordHash) {
    return DEFAULT_ADMIN;
  }

  // 2. Check Firestore users
  try {
    const snapshot = await getDocs(collection(db, "admin_users"));
    for (const doc of snapshot.docs) {
      const u = { id: doc.id, ...doc.data() } as AdminUser;
      if (u.username?.toLowerCase().trim() === cleanUsername && u.passwordHash === computedHash) {
        return u;
      }
    }
  } catch (err) {
    console.warn("Firestore admin_users read error:", err);
  }

  return null;
}

// Create new admin user in Firestore
export async function createAdminUser(username: string, password: string, name: string): Promise<boolean> {
  try {
    const cleanUsername = username.toLowerCase().trim();
    if (cleanUsername === "admin") {
      throw new Error("Username 'admin' is reserved");
    }

    const passwordHash = await hashPassword(password);
    const id = `user-${cleanUsername}-${Date.now()}`;
    const docRef = doc(db, "admin_users", id);
    await setDoc(docRef, {
      username: cleanUsername,
      passwordHash,
      name,
      createdAt: new Date().toISOString(),
    });
    return true;
  } catch (err: any) {
    throw new Error(err.message || "Failed to create user");
  }
}

// Get all admin users (combining default + created)
export async function getAdminUsers(): Promise<Omit<AdminUser, "passwordHash">[]> {
  const users: Omit<AdminUser, "passwordHash">[] = [
    {
      id: DEFAULT_ADMIN.id,
      username: DEFAULT_ADMIN.username,
      name: DEFAULT_ADMIN.name,
      createdAt: DEFAULT_ADMIN.createdAt,
    },
  ];

  try {
    const snapshot = await getDocs(collection(db, "admin_users"));
    snapshot.docs.forEach((d) => {
      const data = d.data();
      if (data.username !== "admin") {
        users.push({
          id: d.id,
          username: data.username,
          name: data.name,
          createdAt: data.createdAt,
        });
      }
    });
  } catch (err) {
    console.warn("Could not fetch remote admin users:", err);
  }

  return users;
}

// Delete admin user
export async function deleteAdminUser(id: string): Promise<void> {
  if (id === DEFAULT_ADMIN.id) {
    throw new Error("Cannot delete primary default admin");
  }
  await deleteDoc(doc(db, "admin_users", id));
}

// --- CRUD OPERATIONS ---

// Projects
export async function saveProject(project: Partial<Project> & { id?: string }): Promise<void> {
  const id = project.id || (project.title ? project.title.toLowerCase().replace(/[^a-z0-9]/g, "-") : String(Date.now()));
  const docRef = doc(db, "projects", id);
  await setDoc(docRef, { ...project, id, updatedAt: new Date().toISOString() }, { merge: true });
}

export async function deleteProject(id: string): Promise<void> {
  await deleteDoc(doc(db, "projects", id));
}

// Skills
export async function saveSkill(skill: Skill & { id?: string }): Promise<void> {
  const id = skill.id || skill.name.toLowerCase().replace(/[^a-z0-9]/g, "-");
  const docRef = doc(db, "skills", id);
  await setDoc(docRef, { ...skill, id, updatedAt: new Date().toISOString() }, { merge: true });
}

export async function deleteSkill(id: string): Promise<void> {
  await deleteDoc(doc(db, "skills", id));
}

// Experience & Education
export async function saveExperience(item: TimelineItem & { id?: string }): Promise<void> {
  const prefix = item.type === "education" ? "edu" : "exp";
  const id = item.id || `${prefix}-${Date.now()}`;
  const docRef = doc(db, "experience", id);
  await setDoc(docRef, { ...item, id, updatedAt: new Date().toISOString() }, { merge: true });
}

export async function deleteExperience(id: string): Promise<void> {
  await deleteDoc(doc(db, "experience", id));
}
