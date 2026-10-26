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

// Pure JS SHA-256 implementation as safe fallback for non-secure contexts
function sha256Sync(ascii: string): string {
  function rightRotate(value: number, amount: number) {
    return (value >>> amount) | (value << (32 - amount));
  }

  const mathPow = Math.pow;
  const maxWord = mathPow(2, 32);
  let result = '';

  const words: number[] = [];
  const asciiBitLength = ascii.length * 8;

  let hash = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
  ];

  const k = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
  ];

  let padded = ascii + '\x80';
  while ((padded.length + 1) % 64 !== 56) {
    padded += '\0';
  }
  while (padded.length % 64 !== 56) {
    padded += '\0';
  }

  for (let i = 0; i < padded.length; i++) {
    const j = padded.charCodeAt(i);
    words[i >> 2] |= j << ((3 - (i % 4)) * 8);
  }
  words[words.length] = (asciiBitLength / maxWord) | 0;
  words[words.length] = asciiBitLength;

  for (let j = 0; j < words.length; ) {
    const w = words.slice(j, (j += 16));
    const oldHash = hash;
    hash = hash.slice(0, 8);

    for (let i = 0; i < 64; i++) {
      const w15 = w[i - 15] || 0,
        w2 = w[i - 2] || 0;

      const s0 = rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3);
      const s1 = rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10);
      w[i] =
        i < 16
          ? (w[i] || 0)
          : (((w[i - 16] || 0) + s0 + (w[i - 7] || 0) + s1) | 0);

      const s1h =
        rightRotate(hash[4], 6) ^ rightRotate(hash[4], 11) ^ rightRotate(hash[4], 25);
      const ch = (hash[4] & hash[5]) ^ (~hash[4] & hash[6]);
      const temp1 = (hash[7] + s1h + ch + k[i] + w[i]) | 0;
      const s0h =
        rightRotate(hash[0], 2) ^ rightRotate(hash[0], 13) ^ rightRotate(hash[0], 22);
      const maj = (hash[0] & hash[1]) ^ (hash[0] & hash[2]) ^ (hash[1] & hash[2]);
      const temp2 = (s0h + maj) | 0;

      hash = [(temp1 + temp2) | 0].concat(hash);
      hash[4] = (hash[4] + temp1) | 0;
    }

    for (let i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i]) | 0;
    }
  }

  for (let i = 0; i < 8; i++) {
    for (let j = 3; j >= 0; j--) {
      const b = (hash[i] >> (8 * j)) & 255;
      result += (b < 16 ? '0' : '') + b.toString(16);
    }
  }
  return result;
}

// Universal SHA-256 hash
export async function hashPassword(password: string): Promise<string> {
  if (typeof window !== "undefined" && window.crypto && window.crypto.subtle) {
    try {
      const msgBuffer = new TextEncoder().encode(password);
      const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    } catch {
      // Fallback below
    }
  }
  return sha256Sync(password);
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
