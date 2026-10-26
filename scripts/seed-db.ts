import { db } from "../src/lib/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { projects } from "../src/data/projects";
import { education, experience } from "../src/data/experience";
import { skills } from "../src/data/skills";

async function seedData() {
  console.log("🚀 Starting database seeding to Firebase Firestore...");

  try {
    // 1. Seed Projects
    console.log(`\n📦 Uploading ${projects.length} projects...`);
    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      const docRef = doc(collection(db, "projects"), project.id);
      await setDoc(
        docRef,
        {
          ...project,
          order: i + 1,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
      console.log(`  ✓ Project: ${project.title}`);
    }

    // 2. Seed Skills
    console.log(`\n🎨 Uploading ${skills.length} skills...`);
    for (let i = 0; i < skills.length; i++) {
      const skill = skills[i];
      const docId = skill.name.toLowerCase().replace(/[^a-z0-9]/g, "-");
      const docRef = doc(collection(db, "skills"), docId);
      await setDoc(
        docRef,
        {
          ...skill,
          order: i + 1,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
      console.log(`  ✓ Skill: ${skill.name} (${skill.category})`);
    }

    // 3. Seed Experience & Education
    console.log(`\n💼 Uploading ${experience.length} experiences...`);
    for (let i = 0; i < experience.length; i++) {
      const item = experience[i];
      const docId = `exp-${i + 1}-${item.organization.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
      const docRef = doc(collection(db, "experience"), docId);
      await setDoc(
        docRef,
        {
          ...item,
          order: i + 1,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
      console.log(`  ✓ Experience: ${item.title} @ ${item.organization}`);
    }

    console.log(`\n🎓 Uploading ${education.length} education items...`);
    for (let i = 0; i < education.length; i++) {
      const item = education[i];
      const docId = `edu-${i + 1}-${item.organization.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
      const docRef = doc(collection(db, "experience"), docId);
      await setDoc(
        docRef,
        {
          ...item,
          order: i + 1,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
      console.log(`  ✓ Education: ${item.title} @ ${item.organization}`);
    }

    console.log("\n✅ All data successfully seeded to Firebase Firestore!");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error seeding data to Firestore:", error);
    process.exit(1);
  }
}

seedData();
