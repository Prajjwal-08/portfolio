'use client';

import { useState, useEffect, useRef } from 'react';
import {
  authenticateAdmin,
  createAdminUser,
  getAdminUsers,
  deleteAdminUser,
  saveProject,
  deleteProject,
  saveSkill,
  deleteSkill,
  saveExperience,
  deleteExperience,
  getAuditLogs,
  subscribeAuditLogs,
  subscribeAdminUsers,
  logActivity,
  AdminUser,
  AuditLog,
} from '@/lib/admin';
import {
  getProjects,
  getSkills,
  getTimeline,
  subscribeProjects,
  subscribeSkills,
  subscribeTimeline,
  Project,
  Skill,
  TimelineItem,
} from '@/lib/db';
import {
  Shield,
  KeyRound,
  User,
  LogOut,
  FolderGit2,
  Wrench,
  Briefcase,
  Users,
  Plus,
  Trash2,
  Edit,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Upload,
  FileText,
  Clock,
  Activity,
  FileUp,
  Image as ImageIcon,
  Loader2,
} from 'lucide-react';

export default function AdminPage() {
  const [currentUser, setCurrentUser] = useState<Omit<AdminUser, 'passwordHash'> | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);

  // Login form state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'experience' | 'users' | 'cv' | 'logs'>('projects');

  // Data states
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experience, setExperience] = useState<TimelineItem[]>([]);
  const [education, setEducation] = useState<TimelineItem[]>([]);
  const [adminUsers, setAdminUsers] = useState<Omit<AdminUser, 'passwordHash'>[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  // Feedback banner
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  // Modal / Editing states
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [projectTagsInput, setProjectTagsInput] = useState('');
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null);
  const [editingTimeline, setEditingTimeline] = useState<Partial<TimelineItem & { id?: string }> | null>(null);

  // CV Upload state
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvUploading, setCvUploading] = useState(false);

  // New user form state
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newName, setNewName] = useState('');
  const [creatingUser, setCreatingUser] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Check localStorage session
  useEffect(() => {
    const saved = localStorage.getItem('portfolio_admin_user');
    if (saved) {
      try {
        setCurrentUser(JSON.parse(saved));
      } catch (e) {
        localStorage.removeItem('portfolio_admin_user');
      }
    }
    setCheckingSession(false);
  }, []);

  // Refresh current data
  const refreshData = async () => {
    const [p, s, t, u, l] = await Promise.all([
      getProjects(),
      getSkills(),
      getTimeline(),
      getAdminUsers(),
      getAuditLogs(),
    ]);
    setProjects(p);
    setSkills(s);
    setExperience(t.experience);
    setEducation(t.education);
    setAdminUsers(u);
    setAuditLogs(l);
  };

  // Real-time synchronization: Any addition, update, or deletion reflects instantly without page refresh
  useEffect(() => {
    if (!currentUser) return;

    // Attach listeners
    const unsubProjects = subscribeProjects((data) => setProjects(data));
    const unsubSkills = subscribeSkills((data) => setSkills(data));
    const unsubTimeline = subscribeTimeline((data) => {
      setExperience(data.experience);
      setEducation(data.education);
    });
    const unsubUsers = subscribeAdminUsers((data) => setAdminUsers(data));
    const unsubLogs = subscribeAuditLogs((data) => setAuditLogs(data));

    return () => {
      unsubProjects();
      unsubSkills();
      unsubTimeline();
      unsubUsers();
      unsubLogs();
    };
  }, [currentUser]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const user = await authenticateAdmin(loginUsername, loginPassword);
      if (user) {
        const sanitized = {
          id: user.id,
          username: user.username,
          name: user.name,
          createdAt: user.createdAt,
        };
        setCurrentUser(sanitized);
        localStorage.setItem('portfolio_admin_user', JSON.stringify(sanitized));
        showToast(`Welcome back, ${user.name}!`);
        await logActivity(`Logged into admin control panel`, user.name);
      } else {
        setLoginError('Invalid username or password.');
      }
    } catch (err: any) {
      setLoginError(err.message || 'Authentication failed');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    if (currentUser) {
      await logActivity(`Logged out of admin panel`, currentUser.name);
    }
    setCurrentUser(null);
    localStorage.removeItem('portfolio_admin_user');
  };

  // --- IMAGE UPLOAD HANDLER ---
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploadLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'image');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to upload image');

      setEditingProject((prev) => ({
        ...prev,
        image: data.url,
      }));
      showToast('Image uploaded successfully!');
    } catch (err: any) {
      showToast(err.message || 'Image upload failed', 'error');
    } finally {
      setImageUploadLoading(false);
    }
  };

  // --- CV UPLOAD HANDLER ---
  const handleCvUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvFile) return;

    setCvUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', cvFile);
      formData.append('type', 'cv');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update CV');

      await logActivity(
        `Updated CV file (${cvFile.name})`,
        currentUser?.name || 'Admin'
      );

      showToast('CV updated successfully!');
      setCvFile(null);
      refreshData();
    } catch (err: any) {
      showToast(err.message || 'Failed to upload CV', 'error');
    } finally {
      setCvUploading(false);
    }
  };

  // --- PROJECT CRUD ---
  const [projectSaving, setProjectSaving] = useState(false);

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title || !editingProject.description) {
      showToast('Please fill in both title and description', 'error');
      return;
    }
    setProjectSaving(true);
    try {
      const parsedTags = projectTagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      await saveProject(
        {
          ...editingProject,
          tags: parsedTags,
        },
        currentUser?.name || 'Admin'
      );
      showToast('Project saved successfully!');
      setEditingProject(null);
      setProjectTagsInput('');
      await refreshData();
    } catch (err: any) {
      console.error('Error saving project to Firestore:', err);
      showToast(err.message || 'Error saving project to Firestore', 'error');
    } finally {
      setProjectSaving(false);
    }
  };

  const handleDeleteProject = async (proj: Project) => {
    if (!confirm(`Are you sure you want to delete "${proj.title}"?`)) return;
    try {
      await deleteProject(proj.id, proj.title, currentUser?.name || 'Admin');
      showToast('Project deleted');
      refreshData();
    } catch (err: any) {
      showToast('Failed to delete', 'error');
    }
  };

  // --- SKILL CRUD ---
  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill?.name || !editingSkill.category) return;
    try {
      await saveSkill(editingSkill as Skill, currentUser?.name || 'Admin');
      showToast('Skill saved!');
      setEditingSkill(null);
      refreshData();
    } catch (err: any) {
      showToast('Error saving skill', 'error');
    }
  };

  const handleDeleteSkill = async (id: string, name: string) => {
    if (!confirm(`Delete skill "${name}"?`)) return;
    try {
      await deleteSkill(id, name, currentUser?.name || 'Admin');
      showToast('Skill deleted');
      refreshData();
    } catch (err) {
      showToast('Failed to delete', 'error');
    }
  };

  // --- TIMELINE CRUD ---
  const handleSaveTimeline = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTimeline?.title || !editingTimeline?.organization) return;
    try {
      await saveExperience(editingTimeline as TimelineItem, currentUser?.name || 'Admin');
      showToast('Timeline item saved!');
      setEditingTimeline(null);
      refreshData();
    } catch (err) {
      showToast('Error saving item', 'error');
    }
  };

  const handleDeleteTimeline = async (id: string, title: string) => {
    if (!confirm(`Delete milestone "${title}"?`)) return;
    try {
      await deleteExperience(id, title, currentUser?.name || 'Admin');
      showToast('Item deleted');
      refreshData();
    } catch (err) {
      showToast('Failed to delete', 'error');
    }
  };

  // --- CREATE NEW ADMIN USER ---
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername || !newPassword || !newName) return;
    setCreatingUser(true);
    try {
      await createAdminUser(newUsername, newPassword, newName);
      await logActivity(
        `Created new admin user @${newUsername} (${newName})`,
        currentUser?.name || 'Admin'
      );
      showToast(`User @${newUsername} created successfully!`);
      setNewUsername('');
      setNewPassword('');
      setNewName('');
      refreshData();
    } catch (err: any) {
      showToast(err.message || 'Failed to create user', 'error');
    } finally {
      setCreatingUser(false);
    }
  };

  if (checkingSession) {
    return <div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>;
  }

  // --- 1. LOGIN SCREEN ---
  if (!currentUser) {
    return (
      <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md glow-card p-8 rounded-2xl border border-white/10 shadow-2xl relative">
          <div className="text-center space-y-3 mb-8">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#1cdce8]/10 border border-[#1cdce8]/30 flex items-center justify-center text-[#1cdce8]">
              <Shield className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Portfolio Admin</h1>
            <p className="text-xs text-gray-400">Enter your credentials to manage live portfolio content</p>
          </div>

          {loginError && (
            <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1.5">Username</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  required
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#1cdce8]"
                  placeholder="admin"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1.5">Password</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#1cdce8]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-2.5 px-4 rounded-xl bg-[#1cdce8] hover:bg-[#1cdce8]/90 text-black font-semibold text-sm transition-all shadow-lg shadow-[#1cdce8]/20 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{loginLoading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // --- 2. AUTHENTICATED DASHBOARD ---
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-2xl text-xs font-medium border ${
            toast.type === 'success'
              ? 'bg-[#131420] text-[#00D763] border-[#00D763]/30'
              : 'bg-[#131420] text-red-400 border-red-500/30'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          <span>{toast.msg}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/10">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-[#1cdce8]/10 text-[#1cdce8] border border-[#1cdce8]/20">
              <Shield className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Admin Control Center</h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Logged in as <span className="text-[#1cdce8] font-semibold">{currentUser.name}</span> (@
            {currentUser.username})
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-medium transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 my-8">
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'projects'
              ? 'bg-[#1cdce8] text-black shadow-lg shadow-[#1cdce8]/20'
              : 'bg-white/5 text-gray-400 hover:text-white border border-white/5'
          }`}
        >
          <FolderGit2 className="w-4 h-4" />
          <span>Projects ({projects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('skills')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'skills'
              ? 'bg-[#1cdce8] text-black shadow-lg shadow-[#1cdce8]/20'
              : 'bg-white/5 text-gray-400 hover:text-white border border-white/5'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>Skills ({skills.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('experience')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'experience'
              ? 'bg-[#1cdce8] text-black shadow-lg shadow-[#1cdce8]/20'
              : 'bg-white/5 text-gray-400 hover:text-white border border-white/5'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Experience & Education ({experience.length + education.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('cv')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'cv'
              ? 'bg-[#1cdce8] text-black shadow-lg shadow-[#1cdce8]/20'
              : 'bg-white/5 text-gray-400 hover:text-white border border-white/5'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Update CV (Resume)</span>
        </button>

        <button
          onClick={() => setActiveTab('logs')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'logs'
              ? 'bg-[#1cdce8] text-black shadow-lg shadow-[#1cdce8]/20'
              : 'bg-white/5 text-gray-400 hover:text-white border border-white/5'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Activity Logs ({auditLogs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'users'
              ? 'bg-[#1cdce8] text-black shadow-lg shadow-[#1cdce8]/20'
              : 'bg-white/5 text-gray-400 hover:text-white border border-white/5'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Admin Users ({adminUsers.length})</span>
        </button>
      </div>

      {/* TAB 1: PROJECTS */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-white">Live Projects</h2>
            <button
              onClick={() => {
                setEditingProject({
                  title: '',
                  description: '',
                  image: '/astrologer.jpg',
                  tags: [],
                  link: '',
                  github: '',
                });
                setProjectTagsInput('');
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1cdce8] text-black text-xs font-semibold hover:bg-[#1cdce8]/90 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Project</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <div key={proj.id} className="p-5 rounded-2xl glow-card border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-white text-base">{proj.title}</h3>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setEditingProject(proj);
                          setProjectTagsInput(proj.tags?.join(', ') || '');
                        }}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-gray-300 hover:text-[#1cdce8]"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-gray-300 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 line-clamp-3 leading-relaxed">{proj.description}</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {proj.tags?.map((t) => (
                      <span key={t} className="text-[10px] bg-white/5 text-gray-300 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex gap-2 text-xs">
                  {proj.link && (
                    <a href={proj.link} target="_blank" className="text-[#1cdce8] hover:underline flex items-center gap-1">
                      <ExternalLink className="w-3.5 h-3.5" /> Visit
                    </a>
                  )}
                  {proj.github && (
                    <a href={proj.github} target="_blank" className="text-gray-400 hover:underline">
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: SKILLS */}
      {activeTab === 'skills' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-white">Live Skills</h2>
            <button
              onClick={() =>
                setEditingSkill({
                  name: '',
                  category: 'Frontend',
                  icon: '/js1.png',
                })
              }
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1cdce8] text-black text-xs font-semibold hover:bg-[#1cdce8]/90 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Skill</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {skills.map((skill) => (
              <div key={skill.name} className="p-4 rounded-xl glow-card text-center relative group">
                <button
                  onClick={() => handleDeleteSkill(skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-'), skill.name)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 rounded bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-all"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
                <p className="font-semibold text-white text-sm">{skill.name}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-1">{skill.category}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: EXPERIENCE & EDUCATION */}
      {activeTab === 'experience' && (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-white">Career Milestones</h2>
            <button
              onClick={() =>
                setEditingTimeline({
                  title: '',
                  organization: '',
                  description: '',
                  period: '',
                  type: 'experience',
                })
              }
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1cdce8] text-black text-xs font-semibold hover:bg-[#1cdce8]/90 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Milestone</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Experience */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-[#1cdce8] uppercase tracking-wider">Work Experience</h3>
              {experience.map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl glow-card flex justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-white text-sm">{item.title}</h4>
                    <p className="text-xs text-gray-400">{item.organization} • {item.period}</p>
                    <p className="text-xs text-gray-300 mt-2">{item.description}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteTimeline(item.organization.toLowerCase().replace(/[^a-z0-9]/g, '-'), item.title)}
                    className="p-1.5 self-start rounded-lg bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-[#bb77ed] uppercase tracking-wider">Education</h3>
              {education.map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl glow-card flex justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-white text-sm">{item.title}</h4>
                    <p className="text-xs text-gray-400">{item.organization} • {item.period}</p>
                    <p className="text-xs text-gray-300 mt-2">{item.description}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteTimeline(item.organization.toLowerCase().replace(/[^a-z0-9]/g, '-'), item.title)}
                    className="p-1.5 self-start rounded-lg bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: UPDATE CV FILE */}
      {activeTab === 'cv' && (
        <div className="max-w-2xl mx-auto p-8 rounded-2xl glow-card border border-white/10 space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#1cdce8]" />
              Update CV / Resume File
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Upload an updated PDF of your resume. This will overwrite the live public download link
              (<span className="text-[#1cdce8] font-mono">/cv-Prajjwal-Shrimal.pdf</span>) across your About and Contact pages.
            </p>
          </div>

          <form onSubmit={handleCvUpload} className="space-y-5">
            <div className="p-8 border-2 border-dashed border-white/15 rounded-2xl flex flex-col items-center justify-center text-center hover:border-[#1cdce8]/50 transition-colors bg-white/[0.02]">
              <FileUp className="w-12 h-12 text-[#1cdce8] mb-3" />
              <label htmlFor="cv-upload-input" className="cursor-pointer">
                <span className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold inline-block transition-all">
                  Choose New PDF File
                </span>
                <input
                  id="cv-upload-input"
                  type="file"
                  accept=".pdf"
                  required
                  onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
              </label>
              {cvFile ? (
                <p className="text-xs text-[#00D763] font-medium mt-3">
                  Selected: {cvFile.name} ({(cvFile.size / 1024).toFixed(1)} KB)
                </p>
              ) : (
                <p className="text-[11px] text-gray-500 mt-3">Only PDF files are accepted.</p>
              )}
            </div>

            <div className="flex items-center justify-between gap-4 pt-2">
              <a
                href="/cv-Prajjwal-Shrimal.pdf"
                target="_blank"
                className="text-xs text-gray-400 hover:text-white underline flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" /> View Current Live CV
              </a>

              <button
                type="submit"
                disabled={!cvFile || cvUploading}
                className="px-6 py-2.5 rounded-xl bg-[#1cdce8] hover:bg-[#1cdce8]/90 text-black text-xs font-bold transition-all disabled:opacity-40 flex items-center gap-2"
              >
                {cvUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Uploading & Updating...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Publish Updated CV</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 5: ACTIVITY LOGS */}
      {activeTab === 'logs' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#1cdce8]" />
                Audit & Activity Logs
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Detailed timeline of updates, creations, uploads, and deletions performed in the admin panel.
              </p>
            </div>
            <button
              onClick={refreshData}
              className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-gray-300 border border-white/10 transition-all"
            >
              Refresh Logs
            </button>
          </div>

          <div className="p-6 rounded-2xl glow-card border border-white/10">
            {auditLogs.length === 0 ? (
              <div className="text-center py-12 text-gray-500 text-xs">
                No activity logs recorded yet.
              </div>
            ) : (
              <div className="space-y-4">
                {auditLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#1cdce8] mt-1.5 shrink-0" />
                      <div>
                        <p className="text-white font-medium">{log.message}</p>
                        <p className="text-[11px] text-gray-400">
                          Performed by: <span className="text-[#1cdce8]">{log.actor}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-400 text-[11px] shrink-0 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{log.formattedDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 6: ADMIN USERS */}
      {activeTab === 'users' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Create User Form */}
          <div className="lg:col-span-5 p-6 rounded-2xl glow-card border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-[#1cdce8]" />
              Create New Admin User
            </h3>
            <p className="text-xs text-gray-400">Add team members or co-administrators to manage this portfolio.</p>

            <form onSubmit={handleCreateUser} className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#1cdce8]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Username</label>
                <input
                  type="text"
                  required
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="e.g. johndoe"
                  className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#1cdce8]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#1cdce8]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={creatingUser}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#1cdce8] text-black text-xs font-bold hover:bg-[#1cdce8]/90 transition-all flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>{creatingUser ? 'Creating...' : 'Create Admin Account'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* List Current Admin Users */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-base font-bold text-white">Current Administrators</h3>
            <div className="space-y-3">
              {adminUsers.map((u) => (
                <div key={u.id} className="p-4 rounded-xl glow-card flex items-center justify-between border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#1cdce8] font-bold text-sm">
                      {u.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{u.name}</p>
                      <p className="text-xs text-gray-400">@{u.username}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {u.username === 'admin' ? (
                      <span className="text-[10px] text-[#00D763] bg-[#00D763]/10 px-2 py-0.5 rounded-full font-medium">
                        Primary Default
                      </span>
                    ) : (
                      <button
                        onClick={async () => {
                          if (confirm(`Delete admin user @${u.username}?`)) {
                            await deleteAdminUser(u.id, currentUser?.name || 'Admin');
                            showToast(`Deleted @${u.username}`);
                            refreshData();
                          }
                        }}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL FOR EDITING PROJECT (WITH FILE UPLOAD) --- */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#1a1b2e] border border-white/15 rounded-2xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white">
                {editingProject.id ? 'Edit Project' : 'New Project'}
              </h3>
              <button onClick={() => setEditingProject(null)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={editingProject.title || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full p-2.5 bg-white/5 border border-white/10 rounded-xl text-white"
                  placeholder="e.g. My Next.js Web App"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={editingProject.description || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full p-2.5 bg-white/5 border border-white/10 rounded-xl text-white"
                  placeholder="Describe the platform, role, and key features..."
                />
              </div>

              {/* PROJECT IMAGE (URL OR FILE UPLOAD) */}
              <div className="space-y-2 p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <label className="block text-gray-300 font-semibold flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-[#1cdce8]" />
                  <span>Project Image</span>
                </label>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingProject.image || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                    className="flex-1 p-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs"
                    placeholder="/astrologer.jpg or uploaded URL"
                  />
                  <label
                    htmlFor="project-img-upload"
                    className="cursor-pointer px-3 py-2 rounded-xl bg-[#1cdce8]/10 hover:bg-[#1cdce8] text-[#1cdce8] hover:text-black font-semibold text-xs transition-all flex items-center gap-1.5 shrink-0"
                  >
                    {imageUploadLoading ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Upload className="w-3.5 h-3.5" />
                    )}
                    <span>{imageUploadLoading ? 'Uploading...' : 'Upload File'}</span>
                    <input
                      id="project-img-upload"
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleImageFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {editingProject.image && (
                  <p className="text-[10px] text-gray-400 truncate">
                    Preview link: <span className="text-[#1cdce8]">{editingProject.image}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Tags (Comma-separated)</label>
                <input
                  type="text"
                  value={projectTagsInput}
                  onChange={(e) => setProjectTagsInput(e.target.value)}
                  className="w-full p-2.5 bg-white/5 border border-white/10 rounded-xl text-white"
                  placeholder="Next.js, Tailwind, Full Stack"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 mb-1">Live URL (optional)</label>
                  <input
                    type="url"
                    value={editingProject.link || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, link: e.target.value })}
                    className="w-full p-2.5 bg-white/5 border border-white/10 rounded-xl text-white"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1">GitHub URL (optional)</label>
                  <input
                    type="url"
                    value={editingProject.github || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, github: e.target.value })}
                    className="w-full p-2.5 bg-white/5 border border-white/10 rounded-xl text-white"
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={projectSaving}
                  className="px-4 py-2 rounded-xl bg-[#1cdce8] text-black font-semibold hover:bg-[#1cdce8]/90 disabled:opacity-50 flex items-center gap-1.5"
                >
                  {projectSaving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving to Database...</span>
                    </>
                  ) : (
                    <span>Save Project</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL FOR EDITING SKILL --- */}
      {editingSkill && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#1a1b2e] border border-white/15 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white">Add New Skill</h3>
              <button onClick={() => setEditingSkill(null)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSkill} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-300 mb-1">Skill Name</label>
                <input
                  type="text"
                  required
                  value={editingSkill.name || ''}
                  onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                  className="w-full p-2.5 bg-white/5 border border-white/10 rounded-xl text-white"
                  placeholder="e.g. Next.js"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Category</label>
                <select
                  value={editingSkill.category || 'Frontend'}
                  onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value as any })}
                  className="w-full p-2.5 bg-[#131420] border border-white/10 rounded-xl text-white"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="CMS & E-commerce">CMS & E-commerce</option>
                  <option value="Tools & Cloud">Tools & Cloud</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Icon Path / URL</label>
                <input
                  type="text"
                  required
                  value={editingSkill.icon || ''}
                  onChange={(e) => setEditingSkill({ ...editingSkill, icon: e.target.value })}
                  className="w-full p-2.5 bg-white/5 border border-white/10 rounded-xl text-white"
                  placeholder="/js1.png"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingSkill(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#1cdce8] text-black font-semibold hover:bg-[#1cdce8]/90"
                >
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL FOR TIMELINE (EXPERIENCE/EDUCATION) --- */}
      {editingTimeline && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#1a1b2e] border border-white/15 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white">Add Career Milestone</h3>
              <button onClick={() => setEditingTimeline(null)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTimeline} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-300 mb-1">Type</label>
                <select
                  value={editingTimeline.type || 'experience'}
                  onChange={(e) => setEditingTimeline({ ...editingTimeline, type: e.target.value as any })}
                  className="w-full p-2.5 bg-[#131420] border border-white/10 rounded-xl text-white"
                >
                  <option value="experience">Work Experience</option>
                  <option value="education">Education</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Title / Degree / Role</label>
                <input
                  type="text"
                  required
                  value={editingTimeline.title || ''}
                  onChange={(e) => setEditingTimeline({ ...editingTimeline, title: e.target.value })}
                  className="w-full p-2.5 bg-white/5 border border-white/10 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Organization / University</label>
                <input
                  type="text"
                  required
                  value={editingTimeline.organization || ''}
                  onChange={(e) => setEditingTimeline({ ...editingTimeline, organization: e.target.value })}
                  className="w-full p-2.5 bg-white/5 border border-white/10 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Period (e.g., 2023 - Present)</label>
                <input
                  type="text"
                  required
                  value={editingTimeline.period || ''}
                  onChange={(e) => setEditingTimeline({ ...editingTimeline, period: e.target.value })}
                  className="w-full p-2.5 bg-white/5 border border-white/10 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={editingTimeline.description || ''}
                  onChange={(e) => setEditingTimeline({ ...editingTimeline, description: e.target.value })}
                  className="w-full p-2.5 bg-white/5 border border-white/10 rounded-xl text-white"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingTimeline(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#1cdce8] text-black font-semibold hover:bg-[#1cdce8]/90"
                >
                  Save Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
