import React from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { ArrowRight, Shield, Zap, BadgeCheck, TrendingUp, Package, Globe, Headphones } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { navLinks } from "@/data/siteData";
import { productDetailData } from "@/data/productDetailData";
import OptimizedImage from "@/components/ui/OptimizedImage";

const fader: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
  }
};

const Products = () => {
  const productLinks = navLinks.find(l => l.label.trim() === "Products")?.children || [];

  return (
    <div className="bg-white min-h-screen selection:bg-agri-green-50 selection:text-agri-green-800">
      <SEO
        title="Agri Products | Buy Farming Equipment & Supplies — IGO Agritech Farms"
        description="Shop agri products from IGO Agritech Farms — polyhouse materials, hydroponic systems, drip irrigation, grow lights, pond liners, agri nets, bio-inputs, and more. Quality assured."
        keywords="buy polyhouse material India, hydroponic system buy, drip irrigation products, agri net India, pond liner buy, grow lights farming, bio inputs agriculture"
        url="/products"
      />
      
      {/* ── Premium Hero Section — Redesigned ─────────────────────────────────────────────── */}
      <section className="bg-white pt-24 sm:pt-32 md:pt-48 pb-20 sm:pb-32">
        <div className="container mx-auto px-6">
           <div className="flex flex-col lg:flex-row gap-20 items-center">
              {/* LEFT — Image Card */}
              <div className="lg:w-[45%]">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-slate-100 shadow-2xl border border-black/5 group"
                >
                  <img
                    src="/assets/product-images/new main image for product/agri inputs .jpg"
                    alt="Comprehensive Catalog of IGO Agritech Products and Solutions"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute top-8 left-8">
                    <div className="bg-white/95 backdrop-blur-md px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-agri-green-800 shadow-xl border border-black/5 flex items-center gap-2">
                       <BadgeCheck className="w-3.5 h-3.5 text-agri-gold-600" /> Premium Institutional Inputs
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* RIGHT — Info Side */}
              <div className="lg:w-[55%]">
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{ show: { transition: { staggerChildren: 0.2 } } }}
                >
                  <motion.div variants={fader} className="flex items-center gap-6 mb-10">
                    <div className="h-[1px] w-20 bg-agri-gold-500" />
                    <span className="text-agri-gold-500 font-black text-[10px] uppercase tracking-[0.6em]">Professional Standards</span>
                  </motion.div>
                  
                  <motion.h1 variants={fader} className="text-6xl sm:text-8xl md:text-[9rem] font-serif text-agri-green-800 mb-12 tracking-tighter leading-[0.8] italic">
                    Global <br /> <span className="text-agri-gold-500 pr-4">Institutional</span> Engineering.
                  </motion.h1>

                  <motion.div variants={fader} className="max-w-xl">
                    <p className="text-black/50 text-xl font-light leading-relaxed mb-10 border-l-4 border-agri-gold-500/20 pl-6">
                      IGO provides the architectural backbone for modern high-tech farming. From precision irrigation to turnkey engineering, we deliver performance at scale.
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-12">
                       <div className="flex -space-x-3">
                         {[1,2,3].map(i => (
                           <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-slate-100 shadow-xl overflow-hidden">
                              <img src={`/assets/compressed/clients/client-${i}.jpg`} alt={`IGO Agritech Farms Client Logo ${i}`} className="w-full h-full object-cover opacity-60" onError={(e) => (e.currentTarget.style.display = 'none')} />
                           </div>
                         ))}
                       </div>
                       
                       <div className="flex gap-10">
                          {[
                            { label: "SKUs Available", val: "1200+" },
                            { label: "Dispatch Points", val: "14" }
                          ].map((stat, i) => (
                            <div key={i} className="flex flex-col">
                               <span className="text-agri-green-800 text-2xl font-serif">{stat.val}</span>
                               <span className="text-[8px] font-bold text-black/30 uppercase tracking-widest">{stat.label}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
           </div>
        </div>
      </section>

      {/* ── Sub-Nav Filters ─────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-black/5 sticky top-[72px] z-30 transition-all duration-300">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
           <div className="flex gap-10 overflow-x-auto no-scrollbar">
              {productLinks.map((cat: any) => (
                <Link 
                  key={cat.label} 
                  to={cat.href}
                  className="shrink-0 text-[10px] font-black uppercase tracking-[0.25em] text-black/40 hover:text-agri-gold-600 transition-all relative group"
                >
                  {cat.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-agri-gold-500 transition-all group-hover:w-full" />
                </Link>
              ))}
           </div>
           <div className="hidden lg:flex items-center gap-2 text-agri-green-800 font-bold text-[10px] uppercase tracking-widest">
              <Package className="w-3.5 h-3.5" /> Direct institutional supply
           </div>
        </div>
      </div>

      {/* ── Catalog Overview — Categories ────────────────────────────────────── */}
      <section className="py-24 sm:py-32 md:py-48 container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
           <div className="max-w-2xl">
              <span className="text-[10px] font-black text-agri-gold-500 tracking-[0.4em] uppercase mb-4 block">Our Catalog</span>
              <h2 className="text-5xl md:text-7xl font-serif text-agri-green-800 leading-[0.95]">Architectural <br /> Categories.</h2>
           </div>
           <p className="max-w-md text-black/40 text-lg font-light leading-relaxed italic">
              Carefully curated divisions covering every phase of the agricultural lifecycle.
           </p>
        </div>

        <div className="grid grid-cols-1 gap-12 sm:gap-16">
          {productLinks.map((category, i) => {
            const isEven = i % 2 === 0;
            const productCount = productDetailData.filter(p => p.category === (category.href.split('/').pop() || '')).length;
            
            return (
              <motion.div
                key={category.label}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group w-full"
              >
                <Link 
                  to={category.href} 
                  className={`flex flex-col lg:flex-row ${!isEven ? 'lg:flex-row-reverse' : ''} bg-white rounded-[3rem] sm:rounded-[5rem] overflow-hidden border border-black/[0.04] hover:border-agri-gold-500/20 hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] transition-all duration-1000 min-h-[450px] sm:min-h-[550px] relative`}
                >
                  {/* Image Side */}
                  <div className="lg:w-1/2 relative overflow-hidden h-72 sm:h-96 lg:h-auto">
                    <OptimizedImage 
                      src={(category as any).cardImage || (category.icon && typeof category.icon === 'string' && category.icon.startsWith('/') 
                        ? category.icon 
                        : "/assets/compressed/projects/agri_farming.jpg")
                      } 
                      alt={category.label}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-1000" />
                    
                    {/* Badge Overlay */}
                    <div className="absolute top-10 left-10 transform -rotate-12 group-hover:rotate-0 transition-transform duration-700">
                       <div className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-full border border-black/5 shadow-2xl">
                          <span className="text-[10px] font-black text-black uppercase tracking-widest">ISO 9001:2015 QC</span>
                       </div>
                    </div>
                  </div>

                  {/* Text Side */}
                  <div className="lg:w-1/2 p-12 sm:p-20 md:p-24 flex flex-col justify-center relative bg-slate-50/50">
                    <div className="mb-10">
                       <span className="px-6 py-2.5 rounded-full bg-agri-green-800 text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                          0{i+1} Category
                       </span>
                    </div>
                    
                    <h3 className="text-4xl sm:text-6xl md:text-7xl font-serif text-agri-green-800 mb-10 leading-[0.9] tracking-tight group-hover:text-agri-gold-600 transition-colors duration-500">
                       {category.label}
                    </h3>
                    
                    <p className="text-black/40 text-xl font-light leading-relaxed mb-16 max-w-lg italic">
                       {(category as any).desc || "Professional grade materials and systems designed for longevity and maximum yields."}
                    </p>

                    <div className="flex items-center gap-6 group/btn">
                       <div className="px-8 py-4 bg-agri-green-800 rounded-full text-white text-[11px] font-black uppercase tracking-widest flex items-center gap-4 group-hover/btn:bg-agri-gold-500 transition-all duration-500">
                          Explore Catalog
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                       </div>
                       <div className="text-[9px] font-bold text-black/30 uppercase tracking-[0.3em]">
                          {productCount > 0 ? `${productCount} Dynamic SKUs` : "Premium Collection"}
                       </div>
                    </div>

                    {/* Faded Index Number */}
                    <div className="absolute bottom-10 right-10 text-9xl font-serif text-black/[0.02] select-none pointer-events-none group-hover:text-black/[0.05] transition-colors">
                       0{i+1}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Why IGO Strip ─────────────────────────────────────────────────── */}
      <section className="py-32 sm:py-48 bg-black text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-agri-gold-500 via-transparent to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
           <div className="max-w-4xl mx-auto text-center mb-32">
              <span className="text-[10px] font-black text-agri-gold-500 tracking-[0.4em] uppercase mb-8 block">Our Assurance</span>
              <h2 className="text-4xl sm:text-6xl md:text-8xl font-serif mb-12 leading-[1] tracking-tight">The Institutional <br /> <span className="italic text-agri-gold-500">Gold Standard.</span></h2>
           </div>

           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-20">
              {[
                { icon: Globe, title: "Pan-India Reach", desc: "Express farm-gate logistics to any location across the subcontinent." },
                { icon: Shield, title: "ISO Certified QC", desc: "Every SKU undergoes 3-stage visual and performance auditing before dispatch." },
                { icon: BadgeCheck, title: "Institutional Rates", desc: "Wholesale pricing structures designed for commercial and NGO projects." },
                { icon: Headphones, title: "Expert Support", desc: "Direct access to sales engineers for technical specifications and advice." }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.8 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-agri-gold-500 transition-all duration-500">
                     <item.icon className="w-7 h-7 text-agri-gold-500 group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="text-xl font-serif text-white mb-4 group-hover:text-agri-gold-500 transition-colors">{item.title}</h4>
                  <p className="text-white/30 text-sm leading-relaxed font-light">{item.desc}</p>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* ── Final Action ────────────────────────────────────────────────────── */}
      <section className="py-32 sm:py-48 md:py-64 container mx-auto px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-agri-earth-15 border border-black/5 text-agri-green-800 text-[10px] font-black uppercase tracking-widest mb-12">
             <TrendingUp className="w-4 h-4" /> Scalable Agri Solutions
          </div>
          
          <h2 className="text-5xl sm:text-7xl md:text-9xl font-serif text-agri-green-800 mb-12 tracking-tighter leading-[0.85]">
            Engineering <br /> <span className="italic">Future Yields.</span>
          </h2>
          
          <p className="text-black/40 text-xl md:text-2xl leading-relaxed mb-20 font-light max-w-3xl mx-auto italic">
            "We don't just sell components; we provide the foundation for sustainable agricultural excellence."
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-8">
             <Link 
              to="/contact" 
              className="px-16 py-6 bg-agri-green-800 text-white text-[11px] font-black rounded-full hover:bg-agri-gold-600 transition-all uppercase tracking-widest shadow-2xl shadow-agri-green-800/20"
             >
               Institutional Sales Desk
             </Link>
             <Link 
              to="/contact?subject=Catalog%20Request" 
              className="px-16 py-6 bg-white border-2 border-agri-green-800 text-agri-green-800 text-[11px] font-black rounded-full hover:bg-agri-green-50 transition-all uppercase tracking-widest"
             >
                Download Master Catalog
             </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Products;

