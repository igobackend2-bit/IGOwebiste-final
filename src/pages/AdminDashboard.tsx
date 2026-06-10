import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase as _supabase } from "@/integrations/supabase/client";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const supabase = _supabase as any;
import { motion, AnimatePresence } from "framer-motion";
import SEO from "@/components/SEO";
import {
  LayoutDashboard, BookOpen, FolderKanban, Package, Inbox,
  Settings, HelpCircle, LogOut, Plus, Pencil, Trash2, X,
  ChevronRight, Eye, EyeOff, CheckCircle, Clock, AlertCircle,
  Menu, Search, RefreshCw, Save, Upload, Rocket, GraduationCap, Leaf
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
type Section = "overview" | "blog" | "projects" | "products" | "enquiries" | "services" | "faq" | "agristartup" | "academy";

interface BlogPost { id: string; title: string; slug: string; excerpt: string; cover_url: string; status: string; published_at: string; created_at: string; }
interface Project { id: string; title: string; domain: string; slug: string; description: string; cover_url: string; status: string; location: string; year: string; }
interface Product { id: string; name: string; category: string; slug: string; description: string; cover_url: string; price_label: string; status: string; is_featured: boolean; }
interface Service { id: string; title: string; domain: string; description: string; cover_url: string; status: string; }
interface FAQ { id: string; question: string; answer: string; category: string; sort_order: number; status: string; }
interface AgriStartup { id: string; title: string; tagline: string; description: string; cover_url: string; image_position: string; content_position: string; icon: string; color: string; status: string; sort_order: number; }
interface AcademyCourse { id: string; title: string; slug: string; description: string; cover_url: string; image_position: string; content_position: string; duration: string; price_label: string; category: string; status: string; sort_order: number; }
interface Contact { id: string; name: string; email: string; phone: string; subject: string; message: string; created_at: string; }
interface Enquiry { id: string; name: string; email: string; phone: string; course: string; message: string; status: string; created_at: string; }

// ─── Sidebar Nav ─────────────────────────────────────────────────────────────
const navItems: { id: Section; label: string; icon: React.ElementType; color: string }[] = [
  { id: "overview",  label: "Overview",  icon: LayoutDashboard, color: "#6FC87A" },
  { id: "blog",      label: "Blog",      icon: BookOpen,        color: "#6B9E4F" },
  { id: "projects",  label: "Projects",  icon: FolderKanban,    color: "#C4956A" },
  { id: "products",  label: "Products",  icon: Package,         color: "#D4A843" },
  { id: "enquiries", label: "Enquiries", icon: Inbox,           color: "#5B9BD5" },
  { id: "services",    label: "Services",    icon: Settings,        color: "#A78BFA" },
  { id: "faq",         label: "FAQ",         icon: HelpCircle,      color: "#F472B6" },
  { id: "agristartup", label: "Agri Startup",icon: Rocket,          color: "#34D399" },
  { id: "academy",     label: "IGO Academy", icon: GraduationCap,   color: "#FB923C" },
];

// ─── Reusable Components ──────────────────────────────────────────────────────
const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, string> = {
    published: "bg-green-100 text-green-700",
    draft:     "bg-yellow-100 text-yellow-700",
    pending:   "bg-orange-100 text-orange-700",
    resolved:  "bg-blue-100 text-blue-700",
    active:    "bg-green-100 text-green-700",
  };
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${map[status] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
};

const SectionHeader = ({ title, count, onAdd, addLabel }: { title: string; count?: number; onAdd?: () => void; addLabel?: string }) => (
  <div className="flex items-center justify-between mb-6">
    <div>
      <h2 className="text-2xl font-black text-gray-900">{title}</h2>
      {count !== undefined && <p className="text-sm text-gray-400 mt-0.5">{count} records</p>}
    </div>
    {onAdd && (
      <button onClick={onAdd} className="flex items-center gap-2 px-4 py-2 bg-[#1A3A22] text-white text-sm font-bold rounded-xl hover:bg-[#2D5A35] transition-colors">
        <Plus className="w-4 h-4" /> {addLabel || "Add New"}
      </button>
    )}
  </div>
);

const Modal = ({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10"
    >
      <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl">
        <h3 className="text-lg font-black text-gray-900">{title}</h3>
        <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"><X className="w-5 h-5 text-gray-500" /></button>
      </div>
      <div className="p-6">{children}</div>
    </motion.div>
  </div>
);

const FormField = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">{label}{required && <span className="text-red-400 ml-0.5">*</span>}</label>
    {children}
  </div>
);

const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#3D7A45] focus:ring-1 focus:ring-[#3D7A45]/20 transition bg-gray-50 focus:bg-white";
const textareaCls = `${inputCls} resize-none`;

const Toast = ({ msg, type, onClose }: { msg: string; type: "success" | "error"; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, x: "-50%" }}
    animate={{ opacity: 1, y: 0, x: "-50%" }}
    exit={{ opacity: 0, y: 50, x: "-50%" }}
    className={`fixed bottom-6 left-1/2 z-[100] flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl text-white text-sm font-semibold ${type === "success" ? "bg-[#1A3A22]" : "bg-red-600"}`}
  >
    {type === "success" ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
    {msg}
    <button onClick={onClose}><X className="w-4 h-4 opacity-60" /></button>
  </motion.div>
);

// ─── Overview Section ─────────────────────────────────────────────────────────
const OverviewSection = () => {
  const [stats, setStats] = useState({ blogs: 0, projects: 0, products: 0, contacts: 0, enquiries: 0, services: 0, agristartup: 0, academy: 0 });
  const [recentContacts, setRecentContacts] = useState<Contact[]>([]);
  const [recentEnquiries, setRecentEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const [b, pr, pd, c, e, s, ag, ac] = await Promise.all([
        supabase.from("blog_posts").select("id", { count: "exact", head: true }),
        supabase.from("projects").select("id", { count: "exact", head: true }),
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("contacts").select("id", { count: "exact", head: true }),
        supabase.from("course_enquiries").select("id", { count: "exact", head: true }),
        supabase.from("services").select("id", { count: "exact", head: true }),
        supabase.from("agri_startup_programs").select("id", { count: "exact", head: true }),
        supabase.from("academy_courses").select("id", { count: "exact", head: true }),
      ]);
      setStats({ blogs: b.count||0, projects: pr.count||0, products: pd.count||0, contacts: c.count||0, enquiries: e.count||0, services: s.count||0, agristartup: ag.count||0, academy: ac.count||0 });
      const [rc, re] = await Promise.all([
        supabase.from("contacts").select("*").order("created_at", { ascending: false }).limit(5),
        supabase.from("course_enquiries").select("*").order("created_at", { ascending: false }).limit(5),
      ]);
      setRecentContacts(rc.data || []);
      setRecentEnquiries(re.data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  const cards = [
    { label: "Blog Posts",      value: stats.blogs,       color: "bg-[#6B9E4F]",  icon: BookOpen },
    { label: "Projects",        value: stats.projects,    color: "bg-[#C4956A]",  icon: FolderKanban },
    { label: "Products",        value: stats.products,    color: "bg-[#D4A843]",  icon: Package },
    { label: "Contacts",        value: stats.contacts,    color: "bg-[#5B9BD5]",  icon: Inbox },
    { label: "Course Enquiries",value: stats.enquiries,   color: "bg-[#A78BFA]",  icon: Clock },
    { label: "Services",        value: stats.services,    color: "bg-[#1A3A22]",  icon: Settings },
    { label: "Agri Programs",   value: stats.agristartup, color: "bg-[#34D399]",  icon: Rocket },
    { label: "Academy Courses", value: stats.academy,     color: "bg-[#FB923C]",  icon: GraduationCap },
  ];

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-[#1A3A22] border-t-transparent rounded-full" /></div>;

  return (
    <div>
      <SectionHeader title="Overview" />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {cards.map((c, i) => (
          <motion.div key={c.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 ${c.color} rounded-xl flex items-center justify-center mb-3`}>
              <c.icon className="w-5 h-5 text-white" />
            </div>
            <div className="text-3xl font-black text-gray-900">{c.value}</div>
            <div className="text-xs text-gray-400 font-medium mt-0.5 uppercase tracking-wide">{c.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <Inbox className="w-4 h-4 text-[#5B9BD5]" />
            <h3 className="font-bold text-gray-800 text-sm">Recent Contacts</h3>
          </div>
          {recentContacts.length === 0 ? <p className="text-center text-gray-400 py-8 text-sm">No contacts yet</p> : (
            <div className="divide-y divide-gray-50">
              {recentContacts.map(c => (
                <div key={c.id} className="px-6 py-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-gray-800">{c.name}</span>
                    <span className="text-[10px] text-gray-400">{new Date(c.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-gray-400 truncate">{c.subject || c.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#A78BFA]" />
            <h3 className="font-bold text-gray-800 text-sm">Recent Enquiries</h3>
          </div>
          {recentEnquiries.length === 0 ? <p className="text-center text-gray-400 py-8 text-sm">No enquiries yet</p> : (
            <div className="divide-y divide-gray-50">
              {recentEnquiries.map(e => (
                <div key={e.id} className="px-6 py-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-gray-800">{e.name}</span>
                    <StatusBadge status={e.status} />
                  </div>
                  <p className="text-xs text-gray-400">{e.course}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Blog Manager ─────────────────────────────────────────────────────────────
const BlogManager = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<null | "create" | BlogPost>(null);
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", cover_url: "", image_position: "top", content_position: "left", status: "draft", content: "" });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    setPosts(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => {
    setForm({ title: "", slug: "", excerpt: "", cover_url: "", image_position: "top", content_position: "left", status: "draft", content: "" });
    setModal("create");
  };

  const openEdit = (p: BlogPost) => {
    setForm({ title: p.title, slug: p.slug, excerpt: p.excerpt || "", cover_url: p.cover_url || "", image_position: (p as any).image_position || "top", content_position: (p as any).content_position || "left", status: p.status, content: (p as any).content || "" });
    setModal(p);
  };

  const slugify = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const save = async () => {
    if (!form.title) return;
    setSaving(true);
    const payload = { ...form, slug: form.slug || slugify(form.title), updated_at: new Date().toISOString(), ...(form.status === "published" ? { published_at: new Date().toISOString() } : {}) };
    let err;
    if (modal === "create") {
      ({ error: err } = await supabase.from("blog_posts").insert([payload]));
    } else {
      ({ error: err } = await supabase.from("blog_posts").update(payload).eq("id", (modal as BlogPost).id));
    }
    setSaving(false);
    if (err) { showToast(err.message, "error"); return; }
    showToast(modal === "create" ? "Post created!" : "Post updated!");
    setModal(null);
    load();
  };

  const del = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    await supabase.from("blog_posts").delete().eq("id", id);
    showToast("Post deleted");
    load();
  };

  return (
    <div>
      <AnimatePresence>{toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}</AnimatePresence>
      <SectionHeader title="Blog Manager" count={posts.length} onAdd={openCreate} addLabel="New Post" />
      {loading ? <div className="flex justify-center py-16"><div className="animate-spin w-8 h-8 border-4 border-[#1A3A22] border-t-transparent rounded-full" /></div> : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Title</th>
              <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider hidden md:table-cell">Status</th>
              <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider hidden lg:table-cell">Date</th>
              <th className="text-right px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-gray-50">
              {posts.length === 0 && <tr><td colSpan={4} className="text-center py-12 text-gray-400">No posts yet. Create your first post!</td></tr>}
              {posts.map(p => (
                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {p.cover_url && <img src={p.cover_url} className="w-10 h-10 rounded-lg object-cover shrink-0 bg-gray-100" alt={`${p.name || "Product"} cover image`} onError={e => (e.currentTarget.style.display = "none")} />}
                      <div>
                        <p className="font-semibold text-gray-800 line-clamp-1">{p.title}</p>
                        <p className="text-xs text-gray-400 line-clamp-1">{p.excerpt}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell"><StatusBadge status={p.status} /></td>
                  <td className="px-6 py-4 text-gray-400 hidden lg:table-cell">{new Date(p.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(p)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-gray-800"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => del(p.id)} className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AnimatePresence>
        {modal && (
          <Modal title={modal === "create" ? "Create Blog Post" : "Edit Blog Post"} onClose={() => setModal(null)}>
            <div className="space-y-4">
              <FormField label="Title" required>
                <input className={inputCls} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value, slug: slugify(e.target.value) }))} placeholder="Post title..." />
              </FormField>
              <FormField label="Slug">
                <input className={inputCls} value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} placeholder="post-slug" />
              </FormField>
              <FormField label="Cover Image URL">
                <input className={inputCls} value={form.cover_url} onChange={e => setForm(f => ({ ...f, cover_url: e.target.value }))} placeholder="https://..." />
              </FormField>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Image Position">
                  <select className={inputCls} value={form.image_position} onChange={e => setForm(f => ({ ...f, image_position: e.target.value }))}>
                    <option value="top">Top</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                    <option value="background">Background</option>
                    <option value="none">None</option>
                  </select>
                </FormField>
                <FormField label="Content Position">
                  <select className={inputCls} value={form.content_position} onChange={e => setForm(f => ({ ...f, content_position: e.target.value }))}>
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                    <option value="overlay">Overlay</option>
                  </select>
                </FormField>
              </div>
              <FormField label="Excerpt">
                <textarea className={textareaCls} rows={2} value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} placeholder="Short description..." />
              </FormField>
              <FormField label="Content">
                <textarea className={textareaCls} rows={6} value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} placeholder="Full content (markdown supported)..." />
              </FormField>
              <FormField label="Status">
                <select className={inputCls} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </FormField>
              <div className="flex justify-end gap-3 pt-2">
                <button onClick={() => setModal(null)} className="px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">Cancel</button>
                <button onClick={save} disabled={saving} className="flex items-center gap-2 px-5 py-2 bg-[#1A3A22] text-white text-sm font-bold rounded-xl hover:bg-[#2D5A35] transition-colors disabled:opacity-60">
                  <Save className="w-4 h-4" />{saving ? "Saving..." : "Save Post"}
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Projects Manager ─────────────────────────────────────────────────────────
const ProjectsManager = () => {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<null | "create" | Project>(null);
  const [form, setForm] = useState({ title: "", slug: "", domain: "", description: "", cover_url: "", image_position: "top", content_position: "left", location: "", year: "", status: "published" });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };
  const slugify = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
    setItems(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => {
    setForm({ title: "", slug: "", domain: "", description: "", cover_url: "", image_position: "top", content_position: "left", location: "", year: new Date().getFullYear().toString(), status: "published" });
    setModal("create");
  };

  const openEdit = (p: Project) => {
    setForm({ title: p.title, slug: p.slug, domain: p.domain, description: p.description || "", cover_url: p.cover_url || "", image_position: (p as any).image_position || "top", content_position: (p as any).content_position || "left", location: p.location || "", year: p.year || "", status: p.status });
    setModal(p);
  };

  const save = async () => {
    if (!form.title || !form.domain) return;
    setSaving(true);
    const payload = { ...form, slug: form.slug || slugify(form.title), updated_at: new Date().toISOString() };
    let err;
    if (modal === "create") ({ error: err } = await supabase.from("projects").insert([payload]));
    else ({ error: err } = await supabase.from("projects").update(payload).eq("id", (modal as Project).id));
    setSaving(false);
    if (err) { showToast(err.message, "error"); return; }
    showToast(modal === "create" ? "Project created!" : "Project updated!");
    setModal(null);
    load();
  };

  const del = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await supabase.from("projects").delete().eq("id", id);
    showToast("Project deleted");
    load();
  };

  return (
    <div>
      <AnimatePresence>{toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}</AnimatePresence>
      <SectionHeader title="Projects Manager" count={items.length} onAdd={openCreate} addLabel="New Project" />
      {loading ? <div className="flex justify-center py-16"><div className="animate-spin w-8 h-8 border-4 border-[#1A3A22] border-t-transparent rounded-full" /></div> : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Project</th>
              <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider hidden md:table-cell">Domain</th>
              <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider hidden lg:table-cell">Location</th>
              <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider hidden md:table-cell">Status</th>
              <th className="text-right px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-gray-50">
              {items.length === 0 && <tr><td colSpan={5} className="text-center py-12 text-gray-400">No projects yet.</td></tr>}
              {items.map(p => (
                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {p.cover_url && <img src={p.cover_url} className="w-10 h-10 rounded-lg object-cover shrink-0 bg-gray-100" alt={`${p.name || "Product"} cover image`} onError={e => (e.currentTarget.style.display = "none")} />}
                      <p className="font-semibold text-gray-800 line-clamp-1">{p.title}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 hidden md:table-cell">{p.domain}</td>
                  <td className="px-6 py-4 text-gray-400 text-xs hidden lg:table-cell">{p.location}</td>
                  <td className="px-6 py-4 hidden md:table-cell"><StatusBadge status={p.status} /></td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(p)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-800 transition-colors"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => del(p.id)} className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <AnimatePresence>
        {modal && (
          <Modal title={modal === "create" ? "Add Project" : "Edit Project"} onClose={() => setModal(null)}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Title" required><input className={inputCls} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value, slug: slugify(e.target.value) }))} placeholder="Project name" /></FormField>
                <FormField label="Domain / Category" required><input className={inputCls} value={form.domain} onChange={e => setForm(f => ({ ...f, domain: e.target.value }))} placeholder="e.g. Polyhouse" /></FormField>
              </div>
              <FormField label="Slug"><input className={inputCls} value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} /></FormField>
              <FormField label="Cover Image URL"><input className={inputCls} value={form.cover_url} onChange={e => setForm(f => ({ ...f, cover_url: e.target.value }))} placeholder="https://..." /></FormField>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Image Position">
                  <select className={inputCls} value={form.image_position} onChange={e => setForm(f => ({ ...f, image_position: e.target.value }))}>
                    <option value="top">Top</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                    <option value="background">Background</option>
                    <option value="none">None</option>
                  </select>
                </FormField>
                <FormField label="Content Position">
                  <select className={inputCls} value={form.content_position} onChange={e => setForm(f => ({ ...f, content_position: e.target.value }))}>
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                    <option value="overlay">Overlay</option>
                  </select>
                </FormField>
              </div>
              <FormField label="Description"><textarea className={textareaCls} rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></FormField>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Location"><input className={inputCls} value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="Chennai, TN" /></FormField>
                <FormField label="Year"><input className={inputCls} value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))} placeholder="2024" /></FormField>
              </div>
              <FormField label="Status">
                <select className={inputCls} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </FormField>
              <div className="flex justify-end gap-3 pt-2">
                <button onClick={() => setModal(null)} className="px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">Cancel</button>
                <button onClick={save} disabled={saving} className="flex items-center gap-2 px-5 py-2 bg-[#1A3A22] text-white text-sm font-bold rounded-xl hover:bg-[#2D5A35] transition-colors disabled:opacity-60">
                  <Save className="w-4 h-4" />{saving ? "Saving..." : "Save Project"}
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Products Manager ─────────────────────────────────────────────────────────
const ProductsManager = () => {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<null | "create" | Product>(null);
  const [form, setForm] = useState({ name: "", slug: "", category: "", description: "", cover_url: "", image_position: "top", content_position: "left", price_label: "", status: "published", is_featured: false });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };
  const slugify = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    setItems(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => { setForm({ name: "", slug: "", category: "", description: "", cover_url: "", image_position: "top", content_position: "left", price_label: "", status: "published", is_featured: false }); setModal("create"); };
  const openEdit = (p: Product) => { setForm({ name: p.name, slug: p.slug, category: p.category, description: p.description || "", cover_url: p.cover_url || "", image_position: (p as any).image_position || "top", content_position: (p as any).content_position || "left", price_label: p.price_label || "", status: p.status, is_featured: p.is_featured }); setModal(p); };

  const save = async () => {
    if (!form.name || !form.category) return;
    setSaving(true);
    const payload = { ...form, slug: form.slug || slugify(form.name), updated_at: new Date().toISOString() };
    let err;
    if (modal === "create") ({ error: err } = await supabase.from("products").insert([payload]));
    else ({ error: err } = await supabase.from("products").update(payload).eq("id", (modal as Product).id));
    setSaving(false);
    if (err) { showToast(err.message, "error"); return; }
    showToast(modal === "create" ? "Product created!" : "Product updated!");
    setModal(null);
    load();
  };

  const del = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await supabase.from("products").delete().eq("id", id);
    showToast("Product deleted");
    load();
  };

  return (
    <div>
      <AnimatePresence>{toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}</AnimatePresence>
      <SectionHeader title="Products Manager" count={items.length} onAdd={openCreate} addLabel="New Product" />
      {loading ? <div className="flex justify-center py-16"><div className="animate-spin w-8 h-8 border-4 border-[#1A3A22] border-t-transparent rounded-full" /></div> : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Product</th>
              <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider hidden md:table-cell">Category</th>
              <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider hidden lg:table-cell">Price</th>
              <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider hidden md:table-cell">Status</th>
              <th className="text-right px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-gray-50">
              {items.length === 0 && <tr><td colSpan={5} className="text-center py-12 text-gray-400">No products yet.</td></tr>}
              {items.map(p => (
                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {p.cover_url && <img src={p.cover_url} className="w-10 h-10 rounded-lg object-cover shrink-0 bg-gray-100" alt={`${p.name || "Product"} cover image`} onError={e => (e.currentTarget.style.display = "none")} />}
                      <div>
                        <p className="font-semibold text-gray-800">{p.name}</p>
                        {p.is_featured && <span className="text-[9px] bg-amber-100 text-amber-700 font-bold uppercase tracking-wide px-1.5 py-0.5 rounded">Featured</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 hidden md:table-cell">{p.category}</td>
                  <td className="px-6 py-4 text-gray-400 hidden lg:table-cell">{p.price_label || "—"}</td>
                  <td className="px-6 py-4 hidden md:table-cell"><StatusBadge status={p.status} /></td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(p)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-800 transition-colors"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => del(p.id)} className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <AnimatePresence>
        {modal && (
          <Modal title={modal === "create" ? "Add Product" : "Edit Product"} onClose={() => setModal(null)}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Name" required><input className={inputCls} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value, slug: slugify(e.target.value) }))} placeholder="Product name" /></FormField>
                <FormField label="Category" required><input className={inputCls} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} placeholder="e.g. Seeds" /></FormField>
              </div>
              <FormField label="Slug"><input className={inputCls} value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} /></FormField>
              <FormField label="Cover Image URL"><input className={inputCls} value={form.cover_url} onChange={e => setForm(f => ({ ...f, cover_url: e.target.value }))} placeholder="https://..." /></FormField>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Image Position">
                  <select className={inputCls} value={form.image_position} onChange={e => setForm(f => ({ ...f, image_position: e.target.value }))}>
                    <option value="top">Top</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                    <option value="background">Background</option>
                    <option value="none">None</option>
                  </select>
                </FormField>
                <FormField label="Content Position">
                  <select className={inputCls} value={form.content_position} onChange={e => setForm(f => ({ ...f, content_position: e.target.value }))}>
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                    <option value="overlay">Overlay</option>
                  </select>
                </FormField>
              </div>
              <FormField label="Description"><textarea className={textareaCls} rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></FormField>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Price Label"><input className={inputCls} value={form.price_label} onChange={e => setForm(f => ({ ...f, price_label: e.target.value }))} placeholder="₹999 / bag" /></FormField>
                <FormField label="Status">
                  <select className={inputCls} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </FormField>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.is_featured} onChange={e => setForm(f => ({ ...f, is_featured: e.target.checked }))} className="w-4 h-4 accent-[#1A3A22]" />
                <span className="text-sm text-gray-600 font-medium">Mark as Featured</span>
              </label>
              <div className="flex justify-end gap-3 pt-2">
                <button onClick={() => setModal(null)} className="px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">Cancel</button>
                <button onClick={save} disabled={saving} className="flex items-center gap-2 px-5 py-2 bg-[#1A3A22] text-white text-sm font-bold rounded-xl hover:bg-[#2D5A35] transition-colors disabled:opacity-60">
                  <Save className="w-4 h-4" />{saving ? "Saving..." : "Save Product"}
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Enquiries Section ────────────────────────────────────────────────────────
const EnquiriesSection = () => {
  const [tab, setTab] = useState<"contacts" | "courses">("contacts");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewItem, setViewItem] = useState<Contact | Enquiry | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const [c, e] = await Promise.all([
      supabase.from("contacts").select("*").order("created_at", { ascending: false }),
      supabase.from("course_enquiries").select("*").order("created_at", { ascending: false }),
    ]);
    setContacts(c.data || []);
    setEnquiries(e.data || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("course_enquiries").update({ status }).eq("id", id);
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status } : e));
  };

  return (
    <div>
      <SectionHeader title="Enquiries" />
      <div className="flex gap-2 mb-6">
        {(["contacts", "courses"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${tab === t ? "bg-[#1A3A22] text-white shadow" : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"}`}>
            {t === "contacts" ? `Contact Messages (${contacts.length})` : `Course Enquiries (${enquiries.length})`}
          </button>
        ))}
        <button onClick={load} className="ml-auto p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"><RefreshCw className="w-4 h-4" /></button>
      </div>

      {loading ? <div className="flex justify-center py-16"><div className="animate-spin w-8 h-8 border-4 border-[#1A3A22] border-t-transparent rounded-full" /></div> : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {tab === "contacts" ? (
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Name</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider hidden md:table-cell">Email</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider hidden lg:table-cell">Subject</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider hidden lg:table-cell">Date</th>
                <th className="text-right px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">View</th>
              </tr></thead>
              <tbody className="divide-y divide-gray-50">
                {contacts.length === 0 && <tr><td colSpan={5} className="text-center py-12 text-gray-400">No contacts yet</td></tr>}
                {contacts.map(c => (
                  <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-800">{c.name}</td>
                    <td className="px-6 py-4 text-gray-500 hidden md:table-cell">{c.email}</td>
                    <td className="px-6 py-4 text-gray-400 hidden lg:table-cell truncate max-w-[200px]">{c.subject || "—"}</td>
                    <td className="px-6 py-4 text-gray-400 hidden lg:table-cell">{new Date(c.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right"><button onClick={() => setViewItem(c)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-700 transition-colors"><Eye className="w-4 h-4" /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Name</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider hidden md:table-cell">Course</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider hidden md:table-cell">Status</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider hidden lg:table-cell">Date</th>
                <th className="text-right px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr></thead>
              <tbody className="divide-y divide-gray-50">
                {enquiries.length === 0 && <tr><td colSpan={5} className="text-center py-12 text-gray-400">No enquiries yet</td></tr>}
                {enquiries.map(e => (
                  <tr key={e.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-800">{e.name}</td>
                    <td className="px-6 py-4 text-gray-500 hidden md:table-cell">{e.course}</td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <select value={e.status} onChange={ev => updateStatus(e.id, ev.target.value)}
                        className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:border-[#3D7A45] bg-gray-50">
                        <option value="pending">Pending</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-gray-400 hidden lg:table-cell">{new Date(e.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right"><button onClick={() => setViewItem(e)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-700 transition-colors"><Eye className="w-4 h-4" /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      <AnimatePresence>
        {viewItem && (
          <Modal title="Full Details" onClose={() => setViewItem(null)}>
            <div className="space-y-3">
              {Object.entries(viewItem).filter(([k]) => k !== "id").map(([k, v]) => (
                <div key={k}>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{k.replace(/_/g, " ")}</p>
                  <p className="text-sm text-gray-800 bg-gray-50 rounded-xl px-4 py-2.5 whitespace-pre-wrap">{String(v)}</p>
                </div>
              ))}
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Services Manager ─────────────────────────────────────────────────────────
const ServicesManager = () => {
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<null | "create" | Service>(null);
  const [form, setForm] = useState({ title: "", domain: "", description: "", cover_url: "", image_position: "top", content_position: "left", status: "published" });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("services").select("*").order("sort_order", { ascending: true });
    setItems(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => { setForm({ title: "", domain: "", description: "", cover_url: "", image_position: "top", content_position: "left", status: "published" }); setModal("create"); };
  const openEdit = (s: Service) => { setForm({ title: s.title, domain: s.domain, description: s.description || "", cover_url: s.cover_url || "", image_position: (s as any).image_position || "top", content_position: (s as any).content_position || "left", status: s.status }); setModal(s); };

  const save = async () => {
    if (!form.title) return;
    setSaving(true);
    const payload = { ...form, updated_at: new Date().toISOString() };
    let err;
    if (modal === "create") ({ error: err } = await supabase.from("services").insert([payload]));
    else ({ error: err } = await supabase.from("services").update(payload).eq("id", (modal as Service).id));
    setSaving(false);
    if (err) { showToast(err.message, "error"); return; }
    showToast(modal === "create" ? "Service created!" : "Service updated!");
    setModal(null);
    load();
  };

  const del = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    await supabase.from("services").delete().eq("id", id);
    showToast("Service deleted");
    load();
  };

  return (
    <div>
      <AnimatePresence>{toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}</AnimatePresence>
      <SectionHeader title="Services Manager" count={items.length} onAdd={openCreate} addLabel="New Service" />
      {loading ? <div className="flex justify-center py-16"><div className="animate-spin w-8 h-8 border-4 border-[#1A3A22] border-t-transparent rounded-full" /></div> : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.length === 0 && <div className="col-span-3 text-center py-12 text-gray-400 bg-white rounded-2xl border border-gray-100">No services yet.</div>}
          {items.map(s => (
            <div key={s.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              {s.cover_url && <img src={s.cover_url} className="w-full h-32 object-cover bg-gray-100" alt={`${s.title || "Subcategory"} cover image`} onError={e => (e.currentTarget.style.display = "none")} />}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{s.title}</p>
                    <p className="text-xs text-gray-400">{s.domain}</p>
                  </div>
                  <StatusBadge status={s.status} />
                </div>
                <p className="text-xs text-gray-500 line-clamp-2 mb-3">{s.description}</p>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(s)} className="flex-1 py-1.5 text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center justify-center gap-1"><Pencil className="w-3 h-3" />Edit</button>
                  <button onClick={() => del(s.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <AnimatePresence>
        {modal && (
          <Modal title={modal === "create" ? "Add Service" : "Edit Service"} onClose={() => setModal(null)}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Title" required><input className={inputCls} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></FormField>
                <FormField label="Domain"><input className={inputCls} value={form.domain} onChange={e => setForm(f => ({ ...f, domain: e.target.value }))} placeholder="e.g. Agri Engineering" /></FormField>
              </div>
              <FormField label="Cover Image URL"><input className={inputCls} value={form.cover_url} onChange={e => setForm(f => ({ ...f, cover_url: e.target.value }))} placeholder="https://..." /></FormField>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Image Position">
                  <select className={inputCls} value={form.image_position} onChange={e => setForm(f => ({ ...f, image_position: e.target.value }))}>
                    <option value="top">Top</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                    <option value="background">Background</option>
                    <option value="none">None</option>
                  </select>
                </FormField>
                <FormField label="Content Position">
                  <select className={inputCls} value={form.content_position} onChange={e => setForm(f => ({ ...f, content_position: e.target.value }))}>
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                    <option value="overlay">Overlay</option>
                  </select>
                </FormField>
              </div>
              <FormField label="Description"><textarea className={textareaCls} rows={4} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></FormField>
              <FormField label="Status">
                <select className={inputCls} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </FormField>
              <div className="flex justify-end gap-3 pt-2">
                <button onClick={() => setModal(null)} className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">Cancel</button>
                <button onClick={save} disabled={saving} className="flex items-center gap-2 px-5 py-2 bg-[#1A3A22] text-white text-sm font-bold rounded-xl hover:bg-[#2D5A35] transition-colors disabled:opacity-60">
                  <Save className="w-4 h-4" />{saving ? "Saving..." : "Save Service"}
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── FAQ Manager ──────────────────────────────────────────────────────────────
const FAQManager = () => {
  const [items, setItems] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<null | "create" | FAQ>(null);
  const [form, setForm] = useState({ question: "", answer: "", category: "general", sort_order: 0, status: "published" });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("faq_items").select("*").order("sort_order", { ascending: true });
    setItems(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => { setForm({ question: "", answer: "", category: "general", sort_order: items.length, status: "published" }); setModal("create"); };
  const openEdit = (f: FAQ) => { setForm({ question: f.question, answer: f.answer, category: f.category, sort_order: f.sort_order, status: f.status }); setModal(f); };

  const save = async () => {
    if (!form.question || !form.answer) return;
    setSaving(true);
    const payload = { ...form, updated_at: new Date().toISOString() };
    let err;
    if (modal === "create") ({ error: err } = await supabase.from("faq_items").insert([payload]));
    else ({ error: err } = await supabase.from("faq_items").update(payload).eq("id", (modal as FAQ).id));
    setSaving(false);
    if (err) { showToast(err.message, "error"); return; }
    showToast(modal === "create" ? "FAQ created!" : "FAQ updated!");
    setModal(null);
    load();
  };

  const del = async (id: string) => {
    if (!confirm("Delete this FAQ?")) return;
    await supabase.from("faq_items").delete().eq("id", id);
    showToast("FAQ deleted");
    load();
  };

  return (
    <div>
      <AnimatePresence>{toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}</AnimatePresence>
      <SectionHeader title="FAQ Manager" count={items.length} onAdd={openCreate} addLabel="New FAQ" />
      {loading ? <div className="flex justify-center py-16"><div className="animate-spin w-8 h-8 border-4 border-[#1A3A22] border-t-transparent rounded-full" /></div> : (
        <div className="space-y-3">
          {items.length === 0 && <div className="text-center py-12 text-gray-400 bg-white rounded-2xl border border-gray-100">No FAQs yet.</div>}
          {items.map(f => (
            <div key={f.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{f.category}</span>
                    <StatusBadge status={f.status} />
                  </div>
                  <p className="font-bold text-gray-800 text-sm mb-1">{f.question}</p>
                  <p className="text-xs text-gray-500 line-clamp-2">{f.answer}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => openEdit(f)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-700 transition-colors"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => del(f.id)} className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <AnimatePresence>
        {modal && (
          <Modal title={modal === "create" ? "Add FAQ" : "Edit FAQ"} onClose={() => setModal(null)}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Category"><input className={inputCls} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} placeholder="general" /></FormField>
                <FormField label="Sort Order"><input type="number" className={inputCls} value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: parseInt(e.target.value) || 0 }))} /></FormField>
              </div>
              <FormField label="Question" required><input className={inputCls} value={form.question} onChange={e => setForm(f => ({ ...f, question: e.target.value }))} placeholder="What is...?" /></FormField>
              <FormField label="Answer" required><textarea className={textareaCls} rows={5} value={form.answer} onChange={e => setForm(f => ({ ...f, answer: e.target.value }))} /></FormField>
              <FormField label="Status">
                <select className={inputCls} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </FormField>
              <div className="flex justify-end gap-3 pt-2">
                <button onClick={() => setModal(null)} className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">Cancel</button>
                <button onClick={save} disabled={saving} className="flex items-center gap-2 px-5 py-2 bg-[#1A3A22] text-white text-sm font-bold rounded-xl hover:bg-[#2D5A35] transition-colors disabled:opacity-60">
                  <Save className="w-4 h-4" />{saving ? "Saving..." : "Save FAQ"}
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Agri Startup Manager ─────────────────────────────────────────────────────
const AgriStartupManager = () => {
  const [items, setItems] = useState<AgriStartup[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<null | "create" | AgriStartup>(null);
  const [form, setForm] = useState({ title: "", tagline: "", description: "", cover_url: "", image_position: "top", content_position: "left", icon: "", color: "#1A4231", status: "published", sort_order: 0 });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("agri_startup_programs").select("*").order("sort_order", { ascending: true });
    setItems(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => { setForm({ title: "", tagline: "", description: "", cover_url: "", image_position: "top", content_position: "left", icon: "", color: "#1A4231", status: "published", sort_order: items.length }); setModal("create"); };
  const openEdit = (s: AgriStartup) => { setForm({ title: s.title, tagline: s.tagline || "", description: s.description || "", cover_url: s.cover_url || "", image_position: s.image_position || "top", content_position: s.content_position || "left", icon: s.icon || "", color: s.color || "#1A4231", status: s.status, sort_order: s.sort_order }); setModal(s); };

  const save = async () => {
    if (!form.title) return;
    setSaving(true);
    const payload = { ...form, updated_at: new Date().toISOString() };
    let err;
    if (modal === "create") ({ error: err } = await supabase.from("agri_startup_programs").insert([payload]));
    else ({ error: err } = await supabase.from("agri_startup_programs").update(payload).eq("id", (modal as AgriStartup).id));
    setSaving(false);
    if (err) { showToast(err.message, "error"); return; }
    showToast(modal === "create" ? "Program created!" : "Program updated!");
    setModal(null);
    load();
  };

  const del = async (id: string) => {
    if (!confirm("Delete this program?")) return;
    await supabase.from("agri_startup_programs").delete().eq("id", id);
    showToast("Program deleted");
    load();
  };

  return (
    <div>
      <AnimatePresence>{toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}</AnimatePresence>
      <SectionHeader title="Agri Startup Manager" count={items.length} onAdd={openCreate} addLabel="New Program" />
      {loading ? <div className="flex justify-center py-16"><div className="animate-spin w-8 h-8 border-4 border-[#1A3A22] border-t-transparent rounded-full" /></div> : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.length === 0 && <div className="col-span-3 text-center py-12 text-gray-400 bg-white rounded-2xl border border-gray-100">No programs yet.</div>}
          {items.map(s => (
            <div key={s.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              {s.cover_url && <div className="relative h-32 bg-gray-100"><img src={s.cover_url} className="w-full h-full object-cover" alt={`${s.title || "Subcategory"} cover image`} onError={e => (e.currentTarget.style.display = "none")} /><span className="absolute top-2 right-2 text-[9px] bg-black/40 text-white px-2 py-0.5 rounded font-bold uppercase">{s.image_position}</span></div>}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div><p className="font-bold text-gray-800 text-sm">{s.title}</p><p className="text-xs text-gray-400 italic">{s.tagline}</p></div>
                  <StatusBadge status={s.status} />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[9px] bg-blue-50 text-blue-600 font-bold uppercase tracking-wide px-2 py-0.5 rounded">content: {s.content_position}</span>
                </div>
                <p className="text-xs text-gray-500 line-clamp-2 mb-3">{s.description}</p>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(s)} className="flex-1 py-1.5 text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center justify-center gap-1"><Pencil className="w-3 h-3" />Edit</button>
                  <button onClick={() => del(s.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <AnimatePresence>
        {modal && (
          <Modal title={modal === "create" ? "Add Program" : "Edit Program"} onClose={() => setModal(null)}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Title" required><input className={inputCls} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Startup Incubation" /></FormField>
                <FormField label="Tagline"><input className={inputCls} value={form.tagline} onChange={e => setForm(f => ({ ...f, tagline: e.target.value }))} placeholder="Short tagline..." /></FormField>
              </div>
              <FormField label="Cover Image URL"><input className={inputCls} value={form.cover_url} onChange={e => setForm(f => ({ ...f, cover_url: e.target.value }))} placeholder="https://..." /></FormField>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Image Position">
                  <select className={inputCls} value={form.image_position} onChange={e => setForm(f => ({ ...f, image_position: e.target.value }))}>
                    <option value="top">Top</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                    <option value="background">Background</option>
                    <option value="none">None</option>
                  </select>
                </FormField>
                <FormField label="Content Position">
                  <select className={inputCls} value={form.content_position} onChange={e => setForm(f => ({ ...f, content_position: e.target.value }))}>
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                    <option value="overlay">Overlay</option>
                  </select>
                </FormField>
              </div>
              <FormField label="Description"><textarea className={textareaCls} rows={4} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Full program description..." /></FormField>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Icon (Lucide name)"><input className={inputCls} value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} placeholder="e.g. Rocket" /></FormField>
                <FormField label="Accent Color"><input type="color" className={`${inputCls} h-[42px] cursor-pointer`} value={form.color} onChange={e => setForm(f => ({ ...f, color: e.target.value }))} /></FormField>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Sort Order"><input type="number" className={inputCls} value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: parseInt(e.target.value) || 0 }))} /></FormField>
                <FormField label="Status">
                  <select className={inputCls} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </FormField>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button onClick={() => setModal(null)} className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">Cancel</button>
                <button onClick={save} disabled={saving} className="flex items-center gap-2 px-5 py-2 bg-[#1A3A22] text-white text-sm font-bold rounded-xl hover:bg-[#2D5A35] transition-colors disabled:opacity-60">
                  <Save className="w-4 h-4" />{saving ? "Saving..." : "Save Program"}
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── IGO Academy Manager ──────────────────────────────────────────────────────
const AcademyManager = () => {
  const [items, setItems] = useState<AcademyCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<null | "create" | AcademyCourse>(null);
  const [form, setForm] = useState({ title: "", slug: "", description: "", cover_url: "", image_position: "top", content_position: "left", duration: "", price_label: "", category: "professional", status: "published", sort_order: 0 });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };
  const slugify = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("academy_courses").select("*").order("sort_order", { ascending: true });
    setItems(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => { setForm({ title: "", slug: "", description: "", cover_url: "", image_position: "top", content_position: "left", duration: "", price_label: "", category: "professional", status: "published", sort_order: items.length }); setModal("create"); };
  const openEdit = (c: AcademyCourse) => { setForm({ title: c.title, slug: c.slug, description: c.description || "", cover_url: c.cover_url || "", image_position: c.image_position || "top", content_position: c.content_position || "left", duration: c.duration || "", price_label: c.price_label || "", category: c.category || "professional", status: c.status, sort_order: c.sort_order }); setModal(c); };

  const save = async () => {
    if (!form.title) return;
    setSaving(true);
    const payload = { ...form, slug: form.slug || slugify(form.title), updated_at: new Date().toISOString() };
    let err;
    if (modal === "create") ({ error: err } = await supabase.from("academy_courses").insert([payload]));
    else ({ error: err } = await supabase.from("academy_courses").update(payload).eq("id", (modal as AcademyCourse).id));
    setSaving(false);
    if (err) { showToast(err.message, "error"); return; }
    showToast(modal === "create" ? "Course created!" : "Course updated!");
    setModal(null);
    load();
  };

  const del = async (id: string) => {
    if (!confirm("Delete this course?")) return;
    await supabase.from("academy_courses").delete().eq("id", id);
    showToast("Course deleted");
    load();
  };

  return (
    <div>
      <AnimatePresence>{toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}</AnimatePresence>
      <SectionHeader title="IGO Academy Manager" count={items.length} onAdd={openCreate} addLabel="New Course" />
      {loading ? <div className="flex justify-center py-16"><div className="animate-spin w-8 h-8 border-4 border-[#1A3A22] border-t-transparent rounded-full" /></div> : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Course</th>
              <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider hidden md:table-cell">Category</th>
              <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider hidden lg:table-cell">Image Pos</th>
              <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider hidden lg:table-cell">Content Pos</th>
              <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider hidden md:table-cell">Status</th>
              <th className="text-right px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-gray-50">
              {items.length === 0 && <tr><td colSpan={6} className="text-center py-12 text-gray-400">No courses yet.</td></tr>}
              {items.map(c => (
                <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {c.cover_url && <img src={c.cover_url} className="w-10 h-10 rounded-lg object-cover shrink-0 bg-gray-100" alt={`${c.label || "Category"} cover image`} onError={e => (e.currentTarget.style.display = "none")} />}
                      <div>
                        <p className="font-semibold text-gray-800">{c.title}</p>
                        <p className="text-xs text-gray-400">{c.duration} {c.price_label && `· ${c.price_label}`}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 hidden md:table-cell capitalize">{c.category}</td>
                  <td className="px-6 py-4 hidden lg:table-cell"><span className="text-[10px] bg-purple-50 text-purple-600 font-bold uppercase px-2 py-0.5 rounded">{c.image_position}</span></td>
                  <td className="px-6 py-4 hidden lg:table-cell"><span className="text-[10px] bg-blue-50 text-blue-600 font-bold uppercase px-2 py-0.5 rounded">{c.content_position}</span></td>
                  <td className="px-6 py-4 hidden md:table-cell"><StatusBadge status={c.status} /></td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(c)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-800 transition-colors"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => del(c.id)} className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <AnimatePresence>
        {modal && (
          <Modal title={modal === "create" ? "Add Course" : "Edit Course"} onClose={() => setModal(null)}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Title" required><input className={inputCls} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value, slug: slugify(e.target.value) }))} placeholder="Course title" /></FormField>
                <FormField label="Category">
                  <select className={inputCls} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                    <option value="professional">Professional Training</option>
                    <option value="internship">Student Internship</option>
                    <option value="specialized">Specialized Course</option>
                    <option value="online">Online Program</option>
                  </select>
                </FormField>
              </div>
              <FormField label="Slug"><input className={inputCls} value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} /></FormField>
              <FormField label="Cover Image URL"><input className={inputCls} value={form.cover_url} onChange={e => setForm(f => ({ ...f, cover_url: e.target.value }))} placeholder="https://..." /></FormField>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Image Position">
                  <select className={inputCls} value={form.image_position} onChange={e => setForm(f => ({ ...f, image_position: e.target.value }))}>
                    <option value="top">Top</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                    <option value="background">Background</option>
                    <option value="none">None</option>
                  </select>
                </FormField>
                <FormField label="Content Position">
                  <select className={inputCls} value={form.content_position} onChange={e => setForm(f => ({ ...f, content_position: e.target.value }))}>
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                    <option value="overlay">Overlay</option>
                  </select>
                </FormField>
              </div>
              <FormField label="Description"><textarea className={textareaCls} rows={4} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Course description..." /></FormField>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Duration"><input className={inputCls} value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} placeholder="e.g. 3 Days" /></FormField>
                <FormField label="Price Label"><input className={inputCls} value={form.price_label} onChange={e => setForm(f => ({ ...f, price_label: e.target.value }))} placeholder="e.g. ₹15,000" /></FormField>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Sort Order"><input type="number" className={inputCls} value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: parseInt(e.target.value) || 0 }))} /></FormField>
                <FormField label="Status">
                  <select className={inputCls} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </FormField>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button onClick={() => setModal(null)} className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">Cancel</button>
                <button onClick={save} disabled={saving} className="flex items-center gap-2 px-5 py-2 bg-[#1A3A22] text-white text-sm font-bold rounded-xl hover:bg-[#2D5A35] transition-colors disabled:opacity-60">
                  <Save className="w-4 h-4" />{saving ? "Saving..." : "Save Course"}
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Leaf Entrance Animation ───────────────────────────────────────────────────
const LeafEntranceTransition = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Unmount the animation overlay after 4.5 seconds for slow motion effect
    const timer = setTimeout(() => {
      setVisible(false);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  // Generate 15 leaves with random falling physics
  const leaves = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    xStart: Math.random() * 100 - 20, // -20vw to 80vw initial position
    yStart: -20 - Math.random() * 20, // Start slightly above the screen
    // SLOW MOTION: 3.5s to 6.5s fall duration
    duration: 3.5 + Math.random() * 3, 
    delay: Math.random() * 1.5, // staggered drop spread out more
    size: 20 + Math.random() * 30, // 20px to 50px leaf size
    rotation: Math.random() * 360, // random Initial rotation
  }));

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(15,36,20,0.9) 0%, rgba(26,58,34,0.95) 100%)", backdropFilter: "blur(10px)" }}
        >
          {/* Central Logo Sequence */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 1 }}
            exit={{ scale: 1.3, opacity: 0 }}
            transition={{ duration: 3.5, ease: "easeOut" }}
            className="absolute flex flex-col items-center justify-center"
          >
             <h1 className="text-4xl md:text-6xl font-black text-white tracking-[0.2em] drop-shadow-2xl">IGO ADMIN</h1>
             <p className="text-[#6FC87A] mt-3 font-semibold tracking-[0.3em] text-sm uppercase">Welcome Back</p>
          </motion.div>

          {/* Falling Leaves */}
          {leaves.map((leaf) => (
            <motion.div
              key={leaf.id}
              initial={{ 
                x: `${leaf.xStart}vw`, 
                y: `${leaf.yStart}vh`, 
                rotate: leaf.rotation,
                opacity: 0 
              }}
              animate={{ 
                x: `${leaf.xStart + 30 + Math.random() * 40}vw`, // blow to the right
                y: `110vh`, // fall all the way down off screen
                rotate: leaf.rotation + 360 + Math.random() * 720,
                opacity: [0, 1, 1, 0] // fade in and then fade out at the very end
              }}
              transition={{ 
                duration: leaf.duration, 
                delay: leaf.delay, 
                ease: [0.25, 0.1, 0.25, 1] // airy easing curve simulating wind
              }}
              className="absolute text-[#6FC87A]/80 drop-shadow-lg"
              style={{ width: leaf.size, height: leaf.size }}
            >
              <Leaf className="w-full h-full drop-shadow-md" fill="currentColor" strokeWidth={1} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeSection, setActiveSection] = useState<Section>((searchParams.get("section") as Section) || "overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) navigate("/admin/login");
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    const t = setTimeout(() => { if (loading) navigate("/admin/login"); }, 8000);
    return () => clearTimeout(t);
  }, [loading, navigate]);

  if (loading || !isAdmin) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F2414]">
      <div className="animate-spin w-10 h-10 border-4 border-[#6FC87A] border-t-transparent rounded-full" />
    </div>
  );

  const sectionComponents: Record<Section, React.ReactNode> = {
    overview:    <OverviewSection />,
    blog:        <BlogManager />,
    projects:    <ProjectsManager />,
    products:    <ProductsManager />,
    enquiries:   <EnquiriesSection />,
    services:    <ServicesManager />,
    faq:         <FAQManager />,
    agristartup: <AgriStartupManager />,
    academy:     <AcademyManager />,
  };

  const activeNav = navItems.find(n => n.id === activeSection);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <SEO title="Admin Dashboard" description="IGO Agritech Farms admin dashboard." noIndex />
      <LeafEntranceTransition />

      {/* ── Sidebar ── */}
      <>
        {sidebarOpen && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}
        <aside className={`fixed top-0 left-0 h-full w-64 z-40 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
          style={{ background: "linear-gradient(180deg, #0F2414 0%, #1A3A22 40%, #1F4A2A 100%)" }}>

          {/* Logo */}
          <div className="px-6 py-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/15">
                <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
                  <circle cx="16" cy="12" r="3" fill="#6FC87A"/>
                  <path d="M16 15 L16 26" stroke="#6FC87A" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M8 8 C8 4 12 2 16 4 C20 2 24 4 24 8" stroke="#A2CFA8" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <p className="text-white font-black text-sm tracking-wide">IGO ADMIN</p>
                <p className="text-white/40 text-[10px] tracking-widest uppercase">Control Panel</p>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto overflow-x-hidden pb-10">
            {navItems.map(item => {
              const active = activeSection === item.id;
              return (
                <button key={item.id} onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
                  className={`group relative w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors duration-300 ${active ? "text-white" : "text-white/50 hover:text-white/90 hover:bg-white/5"}`}>

                  {/* Liquid Sliding Active Background */}
                  {active && (
                    <motion.div
                      layoutId="activeSidebarTabBackground"
                      className="absolute inset-0 rounded-xl"
                      initial={false}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      style={{ 
                        backgroundColor: `${item.color}20`, 
                        border: `1px solid ${item.color}40`,
                        boxShadow: `0 0 15px ${item.color}15`
                      }}
                    />
                  )}

                  <div className={`relative z-10 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 ${active ? "shadow-lg scale-110" : "opacity-60 group-hover:scale-110 group-hover:opacity-100"}`}
                    style={{ backgroundColor: active ? item.color + "40" : "transparent" }}>
                    
                    {/* Animated Icon */}
                    <motion.div
                      animate={active ? {
                        rotate: [0, -12, 12, -12, 12, 0],
                        scale: [1, 1.25, 1]
                      } : {
                        rotate: 0, scale: 1
                      }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <item.icon className="w-5 h-5" style={{ color: active ? item.color : "currentColor" }} strokeWidth={active ? 2.5 : 2} />
                    </motion.div>
                  </div>
                  
                  <span className={`relative z-10 text-sm tracking-wide transition-all duration-300 ${active ? "font-bold text-white translate-x-1" : "font-medium"}`}>{item.label}</span>
                  
                  {active && (
                    <motion.div 
                      className="relative z-10 ml-auto"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronRight className="w-4 h-4 text-white/60" />
                    </motion.div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User + Logout */}
          <div className="px-4 py-4 border-t border-white/10">
            <div className="flex items-center gap-3 px-3 py-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-[#6FC87A]/20 border border-[#6FC87A]/30 flex items-center justify-center text-[#6FC87A] font-bold text-sm">
                {user?.email?.[0]?.toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-semibold truncate">{user?.email}</p>
                <p className="text-white/40 text-[10px] uppercase tracking-wide">Super Admin</p>
              </div>
            </div>
            <button onClick={() => { signOut(); navigate("/"); }}
              className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </aside>
      </>

      {/* ── Main Area ── */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm">
          <div className="flex items-center gap-4 px-6 h-16">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center gap-2">
              {activeNav && <activeNav.icon className="w-5 h-5" style={{ color: activeNav.color }} />}
              <h1 className="text-base font-black text-gray-900">{activeNav?.label}</h1>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs text-gray-400 hidden sm:block">{new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeSection} 
              initial={{ opacity: 0, x: -30, scale: 0.98 }} 
              animate={{ opacity: 1, x: 0, scale: 1 }} 
              exit={{ opacity: 0, x: 20, scale: 0.98 }} 
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              {sectionComponents[activeSection]}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
