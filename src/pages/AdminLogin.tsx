import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, CheckCircle2, ShieldCheck, Lock, ArrowRight, Grid } from "lucide-react";
import SEO from "@/components/SEO";

// Define modules for the quick access section
const modules = [
  { label: "Blog Manager", section: "blog", color: "from-[#6B9E4F]/20 to-transparent" },
  { label: "Projects",     section: "projects", color: "from-[#5C3317]/20 to-transparent" },
  { label: "Products",     section: "products", color: "from-[#C4956A]/20 to-transparent" },
  { label: "Enquiries",    section: "leads", color: "from-[#2D5A27]/20 to-transparent" },
  { label: "Services",     section: "services", color: "from-[#3D2B1A]/20 to-transparent" },
  { label: "Analytics",    section: "analytics", color: "from-[#C8922A]/20 to-transparent" },
];

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    
    if (error) {
      setError(error.message);
    } else {
      setIsSuccess(true);
      setTimeout(() => navigate("/admin/dashboard"), 2000); 
    }
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden flex flex-col lg:flex-row relative">
      <SEO title="Secure Admin Portal" description="IGO Agritech Farms Secure Admin Authentication." noIndex />

      {/* --- LEFT: CINEMATIC HERO (60%) --- */}
      <div className="relative w-full lg:w-[60%] h-[40vh] lg:h-screen overflow-hidden group">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <img
            src="/assets/compressed/admini-login-page-image-.webp"
            alt="IGO Agritech Farms Global Operations and Headquarters"
            className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-[3000ms] ease-out"
          />
        </motion.div>

        {/* Branding Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent lg:from-black/40 lg:via-transparent lg:to-black" />
        
        <div className="absolute top-12 left-12 z-20">
             <motion.div
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1 }}
               className="flex items-center gap-4 bg-black/40 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/10"
             >
                <img src="/assets/compressed/logo-igo.webp" alt="IGO Agritech Farms Official Company Logo" className="w-8 h-8 object-contain" />
                <div className="h-4 w-px bg-white/20" />
                <span className="text-white font-black text-[10px] tracking-[0.4em] uppercase">Security Operations</span>
             </motion.div>
        </div>

        <div className="absolute bottom-12 left-12 z-20 hidden lg:block">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-color-gold-500" />
              <span className="text-color-gold-500 font-bold uppercase tracking-[0.5em] text-[10px]">Strategic Management</span>
            </div>
            <h1 className="text-white text-8xl font-black leading-[0.85] tracking-tighter">
              BEYOND <br />
              <span className="text-white/20">FARMING.</span>
            </h1>
          </motion.div>
        </div>
      </div>

      {/* --- RIGHT: SECURE LOGIN PANEL (40%) --- */}
      <div className="relative w-full lg:w-[40%] bg-black flex flex-col justify-center items-center px-8 lg:px-20 py-12 z-20 border-t lg:border-t-0 lg:border-l border-white/10 overflow-y-auto custom-scrollbar">
        
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="login-form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-sm space-y-12 py-10"
            >
              {/* Header */}
              <div className="space-y-2 text-center lg:text-left">
                <motion.div
                  initial={{ rotate: -10, scale: 0.8 }}
                  animate={{ rotate: 0, scale: 1 }}
                  className="inline-flex p-3 bg-color-green-900 border border-color-green-800 rounded-2xl mb-4 shadow-[0_0_50px_rgba(0,61,46,0.3)]"
                >
                  <ShieldCheck className="w-8 h-8 text-color-gold-500" strokeWidth={1} />
                </motion.div>
                <h2 className="text-white text-3xl font-black uppercase tracking-widest">IGO ADMIN</h2>
                <p className="text-white/40 font-medium tracking-[0.2em] text-[10px] uppercase">Central Nervous System Portal</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <label className="text-[10px] text-white/30 font-bold uppercase tracking-widest block ml-1">Authentication ID</label>
                  <div className="relative group">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="ACCESS_IDENTITY"
                      className="w-full bg-white/[0.03] border border-white/5 text-white py-5 px-6 rounded-2xl focus:outline-none focus:border-color-gold-500/50 transition-all font-mono text-sm tracking-wider placeholder:opacity-20"
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20">
                      <Lock className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-white/30 font-bold uppercase tracking-widest block ml-1">Secure Key</label>
                  <div className="relative group">
                    <input
                      type={showPw ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••••••"
                      className="w-full bg-white/[0.03] border border-white/5 text-white py-5 px-6 rounded-2xl focus:outline-none focus:border-color-gold-500/50 transition-all font-mono text-sm tracking-wider placeholder:opacity-20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                    >
                      {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full relative py-6 bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] rounded-2xl group overflow-hidden transition-all hover:bg-color-gold-500 hover:text-white active:scale-95 shadow-2xl"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {loading ? "Decrypting..." : "Initialize Access"}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
              </form>

              {/* Modules Quick Access */}
              <div className="pt-10 space-y-6">
                 <div className="flex items-center gap-4">
                    <span className="text-[10px] text-white/20 font-black uppercase tracking-widest">Quick Deployment</span>
                    <div className="h-px flex-1 bg-white/5" />
                 </div>
                 <div className="grid grid-cols-2 gap-3">
                    {modules.map((m) => (
                      <button 
                        key={m.label}
                        onClick={() => navigate(`/admin/dashboard?section=${m.section}`)}
                        className={`flex flex-col p-4 rounded-2xl border border-white/5 bg-gradient-to-br ${m.color} hover:border-color-gold-500/30 transition-all group text-left`}
                      >
                         <span className="text-[9px] text-white/30 font-black uppercase tracking-widest mb-1">{m.section}</span>
                         <span className="text-white text-[11px] font-bold tracking-tight group-hover:text-color-gold-500 transition-colors">{m.label}</span>
                      </button>
                    ))}
                 </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-950/20 border border-red-500/20 rounded-xl"
                >
                  <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest text-center">{error}</p>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="success-state"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-8"
            >
              <div className="w-40 h-40 rounded-full border-2 border-color-gold-500/30 flex items-center justify-center relative">
                 <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-0 rounded-full border border-dashed border-color-gold-500/50"
                 />
                 <CheckCircle2 className="w-20 h-20 text-color-gold-500" strokeWidth={1} />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-white text-5xl font-black tracking-tighter">ACCESS GRANTED</h3>
                <p className="text-color-gold-500 font-bold uppercase tracking-[0.4em] text-[10px]">Synchronizing Security Clearance...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-20 flex items-center gap-6 text-white/10 pb-10">
          <span className="text-[10px] font-black tracking-widest">v2.0.26</span>
          <div className="h-px w-12 bg-white/10" />
          <span className="text-[10px] font-black tracking-widest uppercase">IGO Defense Protocol 4.9.1 Active</span>
        </div>
      </div>

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-color-green-800/10 blur-[200px]" />
      </div>
    </div>
  );
};

export default AdminLogin;


