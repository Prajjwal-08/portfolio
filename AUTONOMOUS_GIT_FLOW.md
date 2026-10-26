# 🤖 Autonomous Git & Database Repository Management Guide

This document outlines the complete step-by-step workflow for enabling the AI coding agent to autonomously manage, develop, test, and push changes to a Git repository, as well as configure external database services (like Firebase Firestore) with minimal to zero manual intervention.

---

## 📑 Table of Contents
1. [Phase 0: Repository Cloning Options](#phase-0-repository-cloning-options)
2. [Prerequisites & Required Permissions](#prerequisites--required-permissions)
   - [A. GitHub Authentication (Headless Git Push)](#a-github-authentication-headless-git-push)
   - [B. Database / Firebase Permissions](#b-database--firebase-permissions)
3. [End-to-End Autonomous Workflow (Step-by-Step)](#end-to-end-autonomous-workflow-step-by-step)
4. [Troubleshooting & Common Pitfalls](#troubleshooting--common-pitfalls)

---

## Phase 0: Repository Cloning Options

Every autonomous engineering task begins with cloning the target repository. Depending on how your credentials are set up, choose one of the following methods:

### Method A: Cloning via HTTPS with Embedded Token (Recommended for full autonomy)
```powershell
git clone https://<YOUR_GITHUB_PAT>@github.com/<USERNAME>/<REPO_NAME>.git
cd <REPO_NAME>
```
*Benefits:* Automatically authorizes all subsequent `fetch` and `push` operations without interactive prompts.

### Method B: Cloning via SSH (Passphrase-less)
```powershell
git clone git@github.com:<USERNAME>/<REPO_NAME>.git
cd <REPO_NAME>
```
*Benefits:* Ideal if an unencrypted SSH key has already been added to your GitHub profile.

### Method C: Standard Clone (Pre-existing Local Workspace)
If the repository was already cloned, the agent simply verifies the current working branch and remote tracking URL:
```powershell
git status
git remote -v
```

---

## 1. Prerequisites & Required Permissions

Because the AI agent executes shell commands in **headless/automated background subshells**, interactive GUIs (such as Windows Credential Manager popups or browser login prompts) cannot be displayed. Non-interactive credentials must therefore be configured upfront.

### A. GitHub Authentication (Headless Git Push)

To allow the agent to run `git push` without prompting the user, choose **one** of the following methods:

#### Option 1: GitHub Personal Access Token (PAT) — *Recommended*
1. **Navigate to GitHub Settings:**
   - Go to [GitHub Settings → Developer Settings → Personal Access Tokens → Fine-grained tokens](https://github.com/settings/tokens?type=beta).
   - Alternatively, select **Tokens (classic)** if you want simpler full-repo access.
2. **Configure Permissions:**
   - **Repository access:** Select **"Only select repositories"** and choose your target repository (e.g., `portfolio`).
   - **Permissions:** Under **Repository permissions**, find **`Contents`** and set it to:
     - **`Read and write`** *(Crucial: "Read-only" will trigger a 403 Forbidden error upon push)*.
3. **Generate & Save:** Click **Generate token** and copy the resulting string (`github_pat_...`).
4. **Configuration in the Project:**
   The agent can authenticate on the fly or configure the remote URL:
   ```powershell
   git remote set-url origin https://<YOUR_PAT>@github.com/<USERNAME>/<REPO>.git
   ```

#### Option 2: SSH Key (Passphrase-less)
1. Generate an SSH key without a passphrase:
   ```powershell
   ssh-keygen -t ed25519 -C "your_email@example.com" -f "$HOME/.ssh/id_ed25519" -N ""
   ```
2. Copy the public key from `~/.ssh/id_ed25519.pub` to [GitHub SSH Keys](https://github.com/settings/keys).
3. Switch remote to SSH:
   ```powershell
   git remote set-url origin git@github.com:<USERNAME>/<REPO>.git
   ```

---

### B. Database / Firebase Permissions

When the agent connects the frontend to a cloud database (e.g. Firebase Firestore) for dynamic content:

1. **Client Configuration (`firebaseConfig`):**
   - Standard Web API keys (`apiKey`, `projectId`, `appId`) stored in `.env.local` or directly in `src/lib/firebase.ts`.
2. **Firestore Security Rules:**
   - By default, Firestore locks all writes (`allow write: if false;`).
   - To permit the website to read portfolio data publicly while allowing the agent and admin dashboard to write updates, configure your rules in **Firebase Console → Firestore Database → Rules**:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // 1. Form inquiries / leads (Public submission, private reading)
    match /todos/{document=**} {
      allow create: if true;
      allow read: if false;
    }

    // 2. Dynamic portfolio content (Public read, authenticated/admin write)
    match /projects/{document=**} {
      allow read, write: if true;
    }
    match /skills/{document=**} {
      allow read, write: if true;
    }
    match /experience/{document=**} {
      allow read, write: if true;
    }

    // 3. Admin dashboard accounts & audit logs
    match /admin_users/{document=**} {
      allow read, write: if true;
    }
    match /activity_logs/{document=**} {
      allow read, write: if true;
    }
  }
}
```

---

## 2. End-to-End Autonomous Workflow (Step-by-Step)

When given a cloned repository, the agent systematically proceeds through the following phases:

### Phase 1: Repository Initialization & Environment Audit
1. **Branch Check:** Run `git status` and `git branch` to determine the active working branch.
2. **Remote Check:** Run `git remote -v` to verify the origin URL and protocol (HTTPS or SSH).
3. **Structure Exploration:** List repository root and `/src` directories to detect framework patterns (Next.js App Router vs Pages Router, Vite, etc.).

### Phase 2: Project Setup & Dependency Verification
1. Inspect `package.json` to verify dependencies (`next`, `react`, `firebase`, `tailwindcss`).
2. Run `npm install` (via `cmd.exe /c "npm install"` on Windows) to verify all packages are installed in `node_modules`.

### Phase 3: Database Connection & Seeding
1. Inspect existing static data structures (e.g. `src/data/*.ts`).
2. Check Firestore client setup in `src/lib/firebase.ts`.
3. Create an automated standalone seed script (e.g. `scripts/seed-db.ts`) that loops through datasets and uploads them as documents.
4. Execute via `npx -y tsx scripts/seed-db.ts` to populate Firestore collections automatically.

### Phase 4: Feature Implementation & Verification
1. **Data Access Layer:** Create an abstraction (e.g. `src/lib/db.ts`) that fetches live data from Firestore with **graceful fallbacks** to static files so pages never break offline.
2. **Component Updates:** Convert relevant pages (`/projects`, `/skills`, `/about`) to read dynamically.
3. **Admin Dashboard:** Create `/admin` routes with hashed authentication, file upload endpoints (`/api/upload`), and real-time audit logging.

### Phase 5: Automated Testing & Build Validation
1. **Compile Check:** Run `npm run build` to execute TypeScript type-checking and Next.js static generation.
2. **Error Remediation:** If the build fails (e.g. strict TypeScript types, missing crypto libraries, or import mismatches), analyze the error log, apply the targeted fix, and re-compile until the exit code is `0`.

### Phase 6: Git Staging, Committing & Pushing
1. Review modified files using `git status` and `git diff`.
2. Stage modified and newly created files:
   ```bash
   git add <target_files>
   ```
3. Commit with standard semantic messages:
   ```bash
   git commit -m "feat: integrate dynamic database fetching and admin dashboard"
   ```
4. Authenticate push non-interactively using the PAT or SSH key:
   ```bash
   $env:GIT_TOKEN="<PAT>"; git push https://$env:GIT_TOKEN@github.com/<USER>/<REPO>.git <BRANCH>; $env:GIT_TOKEN=""
   ```
5. Confirm synchronization with `git status`.

---

## 3. Troubleshooting & Common Pitfalls

| Issue | Cause | Autonomous Solution |
| :--- | :--- | :--- |
| **`git push` hangs indefinitely** | Windows Credential Manager is prompting for a GUI popup in a headless terminal. | Provide a PAT token in the URL or configure SSH keys. |
| **`403 Forbidden` on push** | Fine-grained PAT was created with "Read-only" permission for Contents. | Update token permissions in GitHub to `Contents: Read and write`. |
| **`PERMISSION_DENIED` on Firestore** | Firestore rules default to `allow read, write: if false;`. | Update Firestore Rules in Firebase Console to allow matching collections. |
| **`crypto.subtle is undefined`** | Web Cryptography API is restricted to HTTPS/localhost secure contexts. | Use a universal pure JavaScript SHA-256 fallback for universal compatibility. |
| **Broken CSS / Unstyled layout** | Corrupted or stale Next.js build cache in `.next`. | Remove `.next` cache directory and run a hard refresh (`Ctrl + F5`). |
