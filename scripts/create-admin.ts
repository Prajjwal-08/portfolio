import { db } from "../src/lib/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { createHash } from "crypto";

async function createDefaultAdmin() {
  console.log("🔐 Creating default admin user in Firestore...");
  const username = "admin";
  const password = "password123";
  const name = "Prajjwal Admin";

  const passwordHash = createHash("sha256").update(password).digest("hex");

  try {
    const docRef = doc(collection(db, "admin_users"), "default-admin");
    await setDoc(docRef, {
      username: username.toLowerCase().trim(),
      passwordHash,
      name,
      createdAt: new Date().toISOString(),
    }, { merge: true });

    console.log("✅ Admin user created successfully!");
    console.log(`\n📋 Login Credentials:`);
    console.log(`   Username: ${username}`);
    console.log(`   Password: ${password}\n`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Failed to create admin user:", err);
    process.exit(1);
  }
}

createDefaultAdmin();
