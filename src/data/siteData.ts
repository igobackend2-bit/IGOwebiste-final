// Site-wide data for IGO Agritech Farms
import {
  Tent, Droplets, Layers, TreeDeciduous, Carrot, Pill, Flower,
  Leaf, Building, Sprout, Fish, Waves, RefreshCcw, Shield,
  Scissors, Milk, Bird, Heart, Factory, Sun, Map, Grid, Grid3x3, Warehouse, Wind,
  Briefcase, TrendingUp, CircleDollarSign, MapPin, Globe, Ruler,
  Settings, Settings2, PenTool, Wrench, Hammer, MessageSquare, Box, Package,
  PencilRuler, Droplet, CloudRain, Cog, ThermometerSnowflake,
  FlaskConical, Beaker, Bug, Fan, Database, Syringe, AlignJustify,
  Lightbulb, Zap, Microscope, Activity, Tractor, Cpu, Radar, ToggleRight, Beef,
  HardDrive, Monitor, Truck, Construction, Cherry, Apple,
  ShieldCheck, Pipette, Thermometer, Gauge
} from "lucide-react";
export const companyInfo = {
  name: "IGO Agritech Farms",
  tagline: "India's Best Agri Engineering & Consulting Group",
  logo: "/assets/compressed/logo-igo.webp",
  msmeAward: "MSME 2024 Award - Best Agri-Consulting Brand",
  vision: "To be the leading pan-India brand in precision agriculture, empowering farmers with innovative, sustainable engineering that maximizes ROI while nurturing the earth.",
  mission: "To win lifetime loyal customers across pan-India by farming every square meter of land/space using high-tech engineering, professional consulting, and smart livestock ecosystems.",
  description: "IGO Agritech Farms is a leading agricultural solutions provider that has made a significant impact in the industry. Over the years, the company has received numerous awards and recognition for its excellence in the field of agriculture.",
  phone: "+91 73977 89803",
  email: "bankingbackend.indiagreen@gmail.com",
  website: "https://www.igoagritechfarms.com",
  address: "No 17, Kovalan street, 2nd main road, Uthandi kanathur, Chennai 600119",
  whatsapp: "https://wa.me/917397789803",
  awards: [
    "MSME Awards 2024 - Best Agri-Consulting Brand",
    "SISI Award for Industrial Development",
    "Trade Award for Export Excellence",
    "Valluvam Award for Agricultural Excellence",
    "National Excellence Award",
    "Best Innovative Start-up Agri tech brand 2022"
  ],
  social: {
    facebook: "https://www.facebook.com/IGOAgriTechfarms/",
    twitter: "https://twitter.com/igoagritechfarm",
    instagram: "https://www.instagram.com/igoagritechfarms/",
    linkedin: "https://www.linkedin.com/company/igo-agritechfarms/mycompany/",
    youtube: "https://youtube.com/@IGOAgriTechfarms?si=mUSQdsTySbT5d3Jo",
  },
};

export const stats = [
  { label: "Years of Experience", value: "10+", sublabel: "VERIFIED" },
  { label: "Happy Clients", value: "15,000+", sublabel: "VERIFIED" },
  { label: "Successful Projects", value: "15,000+", sublabel: "VERIFIED" },
  { label: "Awards Won", value: "75+", sublabel: "VERIFIED" },
];

export const projects = [
  { id: "joint-venture", title: "IGO Joint Venture Projects", category: "Infrastructure", image: "/assets/new project images/joint-venture-premium-1773750685382.webp", description: "Strategic partnerships for large-scale agricultural infrastructure development." },
  { id: "floriculture", title: "IGO Floriculture Projects", category: "Specialized", image: "/assets/new project images/floriculture-high-tech-1773750708446.webp", description: "High-tech commercial flower cultivation systems with automated climate control." },
  { id: "horticulture", title: "IGO Horticulture Projects", category: "Specialized", image: "/assets/new project images/horticulture-enterprise-1773750728597.webp", description: "Industrial orchard management and fruit production systems." },
  { id: "microgreens", title: "IGO Microgreens Projects", category: "High-Tech", image: "/assets/new project images/microgreens-lab-style-1773750748522.webp", description: "Scientific indoor cultivation of nutrient-dense microgreens." },
  { id: "vertical-farming", title: "IGO Vertical Farming Projects", category: "High-Tech", image: "/assets/new project images/vertical-farming-futuristic-1773750768705.webp", description: "Futuristic multi-layer growing systems maximizing yield per square meter." },
  { id: "mushroom", title: "IGO Mushroom Farming Projects", category: "Specialized", image: "/assets/new project images/igo-mushroom-farming-1774957443125.webp", description: "Climate-controlled mushroom production with medical-grade precision." },
  { id: "polyhouse", title: "IGO Polyhouse Farming Projects", category: "Engineering", image: "/assets/new project images/igo-polyhouse-farming-1774957390686.webp", description: "State-of-the-art protected cultivation structures for optimal growth." },
  { id: "hydroponic", title: "IGO Hydroponic Farming Projects", category: "Engineering", image: "/assets/new project images/igo-hydroponic-farming-1774957407427.webp", description: "Advanced soil-less cultivation systems using NFT and DWC technologies." },
  { id: "rooftop", title: "IGO Rooftop Projects", category: "Urban", image: "/assets/new project images/rooftop-farming-corporate-1773750857107.webp", description: "Transforming urban spaces into productive, sustainable green ecosystems." },
  { id: "pond-liner", title: "IGO Pond Liner Projects", category: "Engineering", image: "/assets/new project images/pond-liner-engineering-1773750874112.webp", description: "High-precision reservoir engineering and water management solutions." },
  { id: "multi-tier", title: "IGO Multi-tier Farming Projects", category: "High-Tech", image: "/assets/new project images/multi-tier-farming-sleek-1773750910232.webp", description: "Innovative multi-layer soil-based and soil-less farming systems." },
  { id: "solar", title: "IGO Solar Powered Projects", category: "Energy", image: "/assets/new project images/solar-agri-premium-1773750927133.webp", description: "Renewable energy integration for self-sustaining agricultural ecosystems." },
  { id: "nursery", title: "IGO Nursery Projects", category: "Specialized", image: "/assets/new project images/nursery-modern-minimalist-1773750946194.webp", description: "Industrial-scale plant propagation and tissue culture facilities." },
  { id: "net-house", title: "IGO Net-house Projects", category: "Infrastructure", image: "/assets/new project images/net-house-premium-1773750966052.png", description: "Cost-effective insect-protected cultivation for a variety of crops." },
  { id: "open-cultivation", title: "IGO Open Cultivation Projects", category: "Precision", image: "/assets/new project images/igo-open-field-farming-1774957423553.webp", description: "Large-scale field cultivation optimized with precision irrigation." },
];

export const services = [
  {
    title: "Polyhouse Projects",
    description: "Controlled environment farming with precision climate management.",
    icon: Tent,
    image: "/assets/new project images/igo-polyhouse-farming-1774957390686.webp",
    path: "/projects/agri/polyhouse"
  },
  {
    title: "Training & Academy",
    description: "Expert-led workshops on high-tech farming and precision agri-ops.",
    icon: Microscope,
    image: "/assets/compressed/services/academy.png",
    path: "/courses"
  },
  {
    title: "IGO AgriMart",
    description: "Premium marketplace for high-quality seeds, fertilizers, and tools.",
    icon: Package,
    image: "/assets/product-images/npk-fertilizer.png",
    path: "/products"
  },
  {
    title: "Hydroponics Projects",
    cardImage: "/assets/compressed/projects/main-page/hydroponic-mart.webp",
    description: "NFT and DWC systems designed for maximum rapid growth.",
    icon: Droplets,
    image: "/assets/new project images/igo-hydroponic-farming-1774957407427.webp",
    path: "/projects/agri/hydroponic"
  },
  {
    title: "Open Cultivation Projects",
    description: "Tailored outdoors projects for high-value fruit and medicinal crops.",
    icon: Tractor,
    image: "/assets/new project images/igo-open-field-farming-1774957423553.webp",
    path: "/projects/agri-farming"
  },
  {
    title: "IGO AMC Service",
    description: "Dedicated partner in farm maintenance and reliable support.",
    icon: Settings,
    image: "/assets/new project images/pond-liner-engineering-1773750874112.webp",
    path: "/services/engineering/maintenance"
  },
  {
    title: "IGO Buyback Service",
    description: "Beacon of trust for farmers in agricultural buyback programs.",
    icon: Heart,
    image: "/assets/new project images/joint-venture-premium-1773750685382.webp",
    path: "/contact"
  },
  {
    title: "IGO Gardening",
    description: "Rooftop Garden Services designed to inspire sustainable lifestyles.",
    icon: Sprout,
    image: "/assets/new project images/rooftop-farming-corporate-1773750857107.webp",
    path: "/projects/urban/rooftop"
  },
];

export const blogPosts = [
  {
    id: "igo-agrimart-solutions",
    title: "IGO Agrimart: Your One-Stop Shop for Cutting-Edge Farming Solutions",
    excerpt: "In the world of modern agriculture, innovation and efficiency reign supreme. IGO Agrimart is your comprehensive destination for polyhouse products, hydroponics, fertilizers, and cutting-edge farming equipment.",
    date: "June 12, 2024",
    image: "/assets/blog/blog1.webp",
    author: "IGO Admin",
    category: "Products",
    content: `<p>In the world of modern agriculture, innovation and efficiency reign supreme. As farmers and cultivators continue to embrace advanced techniques and technologies to improve yields and sustainability, the need for a reliable partner in agritech becomes increasingly critical. That is where IGO Agrimart steps in — your one-stop shop for all cutting-edge farming solutions.</p>

<img src="/assets/blog/blog11.webp" alt="IGO Agrimart Farming Solutions" style="width:100%;border-radius:1.5rem;margin:2rem 0;" />

<h2>Polyhouse Products: Embrace Controlled Environment Agriculture</h2>
<p>Polyhouse farming represents the future of modern agriculture. These innovative structures provide a controlled environment that optimizes crop growth by regulating temperature, humidity, and light conditions. At IGO Agrimart, we offer a comprehensive range of polyhouse products including structures, UV-stabilized covering materials, shading systems, and advanced ventilation equipment — everything you need to build and maintain a world-class polyhouse facility.</p>

<img src="/assets/blog/blog111.webp" alt="Polyhouse Products" style="width:100%;border-radius:1.5rem;margin:2rem 0;" />

<h2>Hydroponic Products: Nurturing Plants without Soil</h2>
<p>Hydroponics is revolutionizing how we grow food. By cultivating plants in nutrient-rich water solutions rather than soil, hydroponic farming achieves faster growth, higher yields, and dramatically reduced water usage. IGO Agrimart stocks a full range of hydroponic equipment including NFT channels, DWC systems, nutrient solutions, growing mediums, and accessories — all designed to support commercial-scale production.</p>

<img src="/assets/blog/blog1111.webp" alt="Hydroponic Products" style="width:100%;border-radius:1.5rem;margin:2rem 0;" />

<h2>Fertilizers: Enrich Your Soil for Bountiful Harvests</h2>
<p>Soil health is the foundation of successful farming. Our curated selection of fertilizers — both organic and synthetic — is tailored to meet the specific nutrient requirements of different crops and soil types. Whether you are growing vegetables in open fields or running a commercial hydroponic operation, IGO Agrimart has the right fertilizer solution to maximize your yields.</p>

<h2>Motors and Irrigation Systems: Power Your Farming Ventures</h2>
<p>Efficient water management is critical for sustainable agriculture. IGO Agrimart offers high-performance motors and irrigation systems including drip irrigation networks, sprinkler systems, and high-capacity pumps. Our products are engineered to ensure precise water delivery, minimize wastage, and support large-scale farming operations with reliability and ease.</p>

<img src="/assets/blog/blog11111.webp" alt="Irrigation Systems" style="width:100%;border-radius:1.5rem;margin:2rem 0;" />

<h2>Farming Tools and Accessories: Elevate Your Productivity</h2>
<p>The right tools make all the difference in daily farming operations. From precision hand tools to protective gear and specialty accessories, IGO Agrimart's range of farming equipment is designed to enhance productivity, reduce labor, and ensure the highest standards of farm management at every scale.</p>

<h2>Expert Guidance: Navigating Your Farming Journey</h2>
<p>At IGO Agrimart, we believe that success in modern farming is not just about the products — it is about the knowledge and support behind them. Our team of experienced agri-experts is always ready to guide you in selecting the right products, understanding best practices, and optimizing your farming operations for maximum profitability.</p>

<img src="/assets/blog/blog111111.webp" alt="Expert Guidance" style="width:100%;border-radius:1.5rem;margin:2rem 0;" />

<h2>Online Convenience: Shop Anytime, Anywhere</h2>
<p>We understand that farmers and agri-entrepreneurs have demanding schedules. That is why IGO Agrimart offers a seamless online shopping experience with secure payment options and reliable delivery services across India. Whether you are a seasoned farmer or just starting your agri journey, you can access our complete product catalog and expert support from the comfort of your home or farm.</p>

<blockquote>IGO Agrimart is committed to being more than a marketplace — we are a partner in your farming success story, every step of the way.</blockquote>`
  },
  {
    id: "dr-john-yesudhas-icon-of-india",
    title: "Celebrating Excellence in Agriculture: Dr. John Yesudhas Named Icon of India for Positive Change",
    excerpt: "Dr. John Yesudhas, CEO and Founder of IGO Agritech Farms, has been selected as one of the Icons of India for his outstanding contributions to fostering positive change within the realm of Indian agriculture.",
    date: "June 12, 2024",
    image: "/assets/blog/blog2.webp",
    author: "IGO News",
    category: "Awards & Recognition",
    content: `<p>In a landmark recognition of dedication and innovation in Indian agriculture, Dr. John Yesudhas, the visionary CEO and Founder of IGO Agritech Farms, has been selected as one of the <strong>Icons of India for Positive Change</strong>. This prestigious honor celebrates individuals who have made extraordinary contributions to transforming sectors critical to India's growth and welfare.</p>

<img src="/assets/blog/blog2.webp" alt="Dr. John Yesudhas - Icon of India" style="width:100%;border-radius:1.5rem;margin:2rem 0;" />

<h2>Pioneering the Future: Tech Farming Expert</h2>
<p>Dr. Yesudhas's unwavering commitment to innovation and sustainable agriculture has earned him the distinguished title of <em>Tech Farming Expert</em>. Under his visionary leadership, IGO Agritech Farms has developed cutting-edge solutions that merge technology and farming to optimize productivity, efficiency, and sustainability across India's agricultural landscape.</p>

<p>His collaborative approach — working closely with governmental bodies, industry leaders, and local communities — has driven initiatives that uplift the agricultural sector at every level, from smallholder farmers to large-scale commercial operations.</p>

<h2>Catalyzing Change: A Glimpse into Dr. Yesudhas' Achievements</h2>
<p>Over the years, Dr. Yesudhas has championed the integration of modern agricultural technologies including polyhouse farming, hydroponics, aquaculture, and precision agri-engineering into mainstream Indian farming practices. His work has directly impacted thousands of farming families, providing them with the knowledge, tools, and support needed to transition to high-yield, sustainable farming models.</p>

<p>IGO Agritech Farms, under his direction, has successfully executed over 1,000 projects across India, trained thousands of agri-entrepreneurs, and created significant employment opportunities in rural communities — all while maintaining a steadfast commitment to environmental sustainability.</p>

<h2>Awards and Accolades: A Testament to Dr. Yesudhas' Impact</h2>
<p>The Icon of India recognition joins a growing list of awards and accolades that reflect the profound impact Dr. John Yesudhas has had on Indian agriculture. From being named India's best innovative agritech entrepreneur to receiving recognition from industry bodies and media organizations, his journey stands as an inspiration for the next generation of agri-innovators.</p>

<blockquote>"True progress in agriculture means uplifting every farmer, from the smallest field to the largest enterprise. That is the mission we pursue every single day at IGO Agritech Farms." — Dr. John Yesudhas</blockquote>

<p>We at IGO Agritech Farms congratulate Dr. John Yesudhas on this well-deserved recognition and reaffirm our commitment to being at the forefront of India's agricultural revolution.</p>`
  },
  {
    id: "independence-day-2023",
    title: "Celebrating 77th Independence Day with Pride: Flag Hosting at IGO Agritechfarms",
    excerpt: "Freedom is a gift that demands to be cherished. IGO Agritechfarms celebrated India's 77th Independence Day with a heartfelt flag hoisting ceremony, honoring both the nation's independence and the dedication of the IGO family.",
    date: "August 15, 2023",
    image: "/assets/blog/blog3.webp",
    author: "IGO News",
    category: "Company News",
    content: `<p>Freedom is a gift that demands to be cherished, and as a nation, we celebrate this precious gift every year on Independence Day with immense pride and joy. This year, IGO Agritechfarms marked India's <strong>77th Independence Day</strong> with a memorable flag hoisting ceremony that honored not only our nation's great heritage but also celebrated the growth, unity, and dedication of the IGO family.</p>

<img src="/assets/blog/blog3.webp" alt="Independence Day Flag Hoisting at IGO" style="width:100%;border-radius:1.5rem;margin:2rem 0;" />

<h2>A Patriotic Morning at IGO Agritechfarms</h2>
<p>The morning began with a sense of patriotic fervor as the entire IGO team gathered together in the company premises. Dr. John Yesudhas, CEO and Founder of IGO Agritechfarms, proudly hoisted the national flag, marking the occasion with dignity and reverence. The ceremony was a moment of collective pride — a reminder of the sacrifices made by freedom fighters and the responsibility we carry to build a stronger, more prosperous India.</p>

<p>As part of the celebration, the organization recognized employees with awards for exceptional performance in their respective roles, reinforcing the company's core values of excellence, innovation, and teamwork. These recognitions served as a powerful reminder that individual dedication contributes to collective progress — both within IGO and across India's agricultural sector.</p>

<img src="/assets/blog/blog33.webp" alt="IGO Independence Day Celebration" style="width:100%;border-radius:1.5rem;margin:2rem 0;" />

<h2>A Unified Vision: Growth, Independence, and Innovation</h2>
<p>The celebration went beyond ceremony — it became a moment of reflection and renewal for the entire IGO team. Just as India's independence was built on the vision of a better future, IGO Agritechfarms draws inspiration from that same spirit in its mission to transform Indian agriculture through technology, innovation, and sustainable practices.</p>

<p>Independence Day at IGO had become a reflection of the values that define the organization — dedication, excellence, and progress. The event reinforced the team's shared commitment to making Indian agriculture a model of innovation and sustainability for the world.</p>

<blockquote>Independence Day, in all its glory, had become a reflection of the values that define IGO — dedication, excellence, and progress.</blockquote>

<h2>Conclusion</h2>
<p>As we celebrate 77 years of independence, IGO Agritechfarms remains dedicated to contributing to India's agricultural renaissance. We are proud to be building technologies and farming solutions that empower farmers, create employment, and secure food for generations to come. Happy Independence Day to all — Jai Hind!</p>`
  },
  {
    id: "jnn-institute-industrial-visit",
    title: "IGO Agritech Farms Provides IV to JNN Institute of Engineering Students on Polyhouse Farming",
    excerpt: "IGO Agritech Farms facilitated a comprehensive industrial visit for JNN Institute of Engineering students, offering hands-on exposure to modern polyhouse farming techniques and bridging the gap between academia and industry.",
    date: "June 12, 2024",
    image: "/assets/blog/blog4.webp",
    author: "IGO Admin",
    category: "Education",
    content: `<p>IGO Agritech Farms, India's leading agricultural technology company, recently facilitated a comprehensive industrial visit (IV) for students from <strong>JNN Institute of Engineering</strong>. The program offered students valuable hands-on exposure to modern polyhouse farming techniques, bridging the critical gap between academic learning and real-world agri-industry practices.</p>

<img src="/assets/blog/blog4.webp" alt="JNN Students at IGO Agritech Farms" style="width:100%;border-radius:1.5rem;margin:2rem 0;" />

<h2>What is Polyhouse Farming?</h2>
<p>Polyhouse farming is a modern technique of agriculture that involves growing plants in a controlled environment. By enclosing crops within a polyethylene-covered structure, farmers can regulate temperature, humidity, and light conditions throughout the year — enabling crop production irrespective of external season and climate. This approach is transforming Indian agriculture by dramatically improving yields, reducing pest incidence, and enabling year-round cultivation of high-value crops.</p>

<h2>What Students Experienced</h2>
<p>During the industrial visit, engineering students were given a thorough walkthrough of IGO Agritech Farms' polyhouse operations. The program covered:</p>

<ul style="margin-left:2rem;margin-bottom:2rem;">
  <li style="margin-bottom:0.75rem;">Polyhouse structure design and materials used</li>
  <li style="margin-bottom:0.75rem;">Key components: ventilation systems, irrigation networks, and climate control equipment</li>
  <li style="margin-bottom:0.75rem;">Soil preparation and crop planting techniques</li>
  <li style="margin-bottom:0.75rem;">Technology applications including sensors and automated irrigation systems</li>
  <li style="margin-bottom:0.75rem;">Operational management and day-to-day farm practices</li>
</ul>

<img src="/assets/blog/blog44.webp" alt="Polyhouse Farming Demonstration" style="width:100%;border-radius:1.5rem;margin:2rem 0;" />

<p>The IGO Agritech team provided hands-on training sessions where students could directly interact with equipment, observe automated systems in action, and understand the commercial aspects of running a modern polyhouse operation.</p>

<img src="/assets/blog/blog444.webp" alt="Students Learning Polyhouse Techniques" style="width:100%;border-radius:1.5rem;margin:2rem 0;" />

<h2>Bridging Academia and Industry</h2>
<p>The industrial visit program represents IGO Agritech Farms' commitment to building the next generation of agri-tech professionals. By exposing engineering students to real-world polyhouse operations, the program helps bridge the gap between academic theory and practical application — creating a win-win situation for both students and the industry.</p>

<blockquote>"The best education happens not just in classrooms, but in the fields and farms where real change is taking shape. We are proud to open our facilities to students who will lead India's agricultural future." — IGO Agritech Farms</blockquote>

<p>IGO Agritech Farms continues to welcome students, academic institutions, and aspiring agri-entrepreneurs for industrial visits and internship programs. To schedule a visit or learn about our internship opportunities, please contact us through our website or reach us at +91 73977 89803.</p>`
  },
  {
    id: "best-innovative-startup-2022",
    title: "IGO was awarded the Best Innovative Start-up Agri tech brand 2022",
    excerpt: "IGO Agritech Farms received the prestigious recognition as the Best Innovative Start-up Agri Tech Brand at the India Trade Awards 2022, as the company expands its vision across Asia, Australia, and the UAE.",
    date: "June 12, 2024",
    image: "/assets/blog/blog5.webp",
    author: "IGO Admin",
    category: "Awards & Recognition",
    content: `<p>We are proud and honored to announce that <strong>IGO Agritech Farms</strong> has been recognized as the <strong>Best Innovative Start-up Agri Tech Brand at the India Trade Awards 2022</strong>. This prestigious recognition is a testament to the hard work, innovation, and dedication of our entire team and every stakeholder who has been part of the IGO journey.</p>

<img src="/assets/blog/blog5.webp" alt="IGO Award 2022" style="width:100%;border-radius:1.5rem;margin:2rem 0;" />

<h2>A Milestone That Inspires Greater Purpose</h2>
<p>Receiving this award at the India Trade Awards 2022 is not just a celebration of what we have achieved — it is a powerful motivation to aim higher. IGO Agritech Farms has always been committed to delivering agricultural projects, products, and services that meet global standards, and this recognition reaffirms that we are on the right path.</p>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin:2rem 0;">
  <img src="/assets/blog/b51.webp" alt="IGO Award Ceremony" style="width:100%;border-radius:1rem;" />
  <img src="/assets/blog/b52.webp" alt="IGO Award Recognition" style="width:100%;border-radius:1rem;" />
</div>

<h2>Expanding Our Vision Globally</h2>
<p>Alongside this recognition, IGO Agritech Farms is actively pursuing expansion initiatives across <strong>Asia, Australia, and the United Arab Emirates</strong>. Our mission is to bring world-class agri-engineering solutions, polyhouse farming technologies, and sustainable agricultural practices to international markets — creating impact far beyond India's borders.</p>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin:2rem 0;">
  <img src="/assets/blog/b53.webp" alt="IGO Global Expansion" style="width:100%;border-radius:1rem;" />
  <img src="/assets/blog/b54.webp" alt="IGO International Projects" style="width:100%;border-radius:1rem;" />
</div>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin:2rem 0;">
  <img src="/assets/blog/b55.webp" alt="IGO Team" style="width:100%;border-radius:1rem;" />
  <img src="/assets/blog/b56.webp" alt="IGO Projects" style="width:100%;border-radius:1rem;" />
</div>

<h2>Gratitude to Our Stakeholders</h2>
<p>This achievement belongs to every person who has believed in the IGO Agritech Farms vision — our farmers, investors, partners, clients, employees, and supporters. We are deeply grateful to all who have stood beside us through every challenge and every milestone. Your trust and support are what make achievements like this possible.</p>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin:2rem 0;">
  <img src="/assets/blog/b57.webp" alt="IGO Community" style="width:100%;border-radius:1rem;" />
  <img src="/assets/blog/b58.webp" alt="IGO Stakeholders" style="width:100%;border-radius:1rem;" />
</div>

<blockquote>This award is not a destination — it is a new beginning. We dedicate this recognition to every farmer we have served and every agricultural dream we will help realize in the years ahead.</blockquote>

<p>As we continue our journey with renewed energy and purpose, IGO Agritech Farms remains committed to transforming Indian agriculture through innovation, technology, and uncompromising dedication to farmer success.</p>`
  },
  {
    id: "campus-drive-200-students",
    title: "IGO Agritech Farms Selects 200+ Students in Campus Drive for AgriTech Careers",
    excerpt: "IGO Group successfully conducted a landmark campus recruitment drive at Paavai Engineering College, selecting over 200 talented students to join India's most dynamic agritech company.",
    date: "February 24, 2024",
    image: "/assets/blog/b7-4.webp",
    author: "IGO Careers",
    category: "Careers",
    content: `<p>IGO Group is proud to announce the resounding success of its recent campus recruitment drive at <strong>Paavai Engineering College</strong>, one of Tamil Nadu's premier engineering institutions. The drive resulted in the selection of over <strong>200 talented students</strong> for diverse roles within our rapidly expanding organization — marking a significant milestone in our mission to build India's most capable agritech workforce.</p>

<img src="/assets/blog/b7-4.webp" alt="IGO Campus Drive at Paavai Engineering College" style="width:100%;border-radius:1.5rem;margin:2rem 0;" />

<h2>Innovation Meets Talent</h2>
<p>The key to solving today's agricultural challenges lies in smart solutions, sustainability, and skilled professionals. IGO Agritech Farms has always believed that the future of Indian agriculture will be built by bright, driven young minds who combine technical expertise with a passion for transforming the sector. The campus drive at Paavai Engineering College was designed to identify exactly those individuals.</p>

<p>Selected candidates will be working across departments that leverage cutting-edge technologies including:</p>

<ul style="margin-left:2rem;margin-bottom:2rem;">
  <li style="margin-bottom:0.75rem;">Internet of Things (IoT) for precision farming</li>
  <li style="margin-bottom:0.75rem;">Artificial Intelligence (AI) for crop monitoring and analytics</li>
  <li style="margin-bottom:0.75rem;">Automation systems for polyhouse and hydroponic operations</li>
  <li style="margin-bottom:0.75rem;">Agri-engineering and project management</li>
  <li style="margin-bottom:0.75rem;">Business development and market expansion</li>
</ul>

<img src="/assets/blog/b7-2.webp" alt="Students Selected in IGO Campus Drive" style="width:100%;border-radius:1.5rem;margin:2rem 0;" />

<h2>Building the Agritech Workforce of Tomorrow</h2>
<p>IGO Group's commitment to industry-academia partnerships goes beyond recruitment. We work closely with engineering colleges and universities to provide real-world exposure through industrial visits, internships, and collaborative research programs — ensuring that students are career-ready from day one.</p>

<p>This campus drive is just the beginning. As part of our ambitious expansion plans, IGO Agritech Farms aims to create thousands of agritech job opportunities across India, empowering youth with meaningful careers that contribute directly to the nation's food security and agricultural transformation.</p>

<img src="/assets/blog/b7-3.webp" alt="IGO Agritech Career Opportunities" style="width:100%;border-radius:1.5rem;margin:2rem 0;" />

<blockquote>"We are not just hiring — we are cultivating the next generation of agritech leaders who will redefine what Indian agriculture can achieve." — IGO Agritech Farms</blockquote>

<p>To all the 200+ students who have joined the IGO family — welcome aboard. Your journey to transform Indian agriculture starts now. We look forward to growing together.</p>`
  },
  {
    id: "agriculture-subsidies-india",
    title: "Subsidy in Agriculture: A Boon for Farmers and the Backbone of Food Security",
    excerpt: "Agriculture is the lifeline of India. This comprehensive guide explores what agricultural subsidies are, how to avail them, the nine key types available to Indian farmers, and the path forward for a more equitable farming sector.",
    date: "June 12, 2024",
    image: "/assets/blog/blog8.webp",
    author: "IGO Admin",
    category: "Agriculture Insights",
    content: `<p>Agriculture is the lifeline of India, employing over half the population and significantly contributing to the country's GDP. Yet, farmers face a constant set of challenges — unpredictable weather patterns, expensive inputs, volatile market pricing, and limited access to modern farming technologies. In this context, <strong>government agricultural subsidies</strong> play an essential role in supporting farmers and ensuring stable, consistent food production for the nation.</p>

<h2>What Is a Subsidy in Agriculture?</h2>
<p>An agricultural subsidy is a form of financial assistance provided by the government to farmers or agribusinesses. The primary goals are to decrease farming input costs, improve rural infrastructure, foster sustainable agricultural practices, and ensure long-term food security. Well-designed subsidies make farming more profitable, encourage rural development, and accelerate the adoption of innovative farming technologies.</p>

<h2>How to Avail Agricultural Subsidies?</h2>
<p>Farmers in India can access agricultural subsidies through several official channels:</p>

<ul style="margin-left:2rem;margin-bottom:2rem;">
  <li style="margin-bottom:0.75rem;"><strong>State Agriculture Departments</strong> — Each state has dedicated departments for processing subsidy applications</li>
  <li style="margin-bottom:0.75rem;"><strong>Krishi Vigyan Kendras (KVKs)</strong> — Agricultural science centers that guide farmers through available schemes</li>
  <li style="margin-bottom:0.75rem;"><strong>Digital Platforms</strong> — Online portals such as PM-Kisan and agrimachinery.nic.in for direct benefit access</li>
  <li style="margin-bottom:0.75rem;"><strong>Registered Agri Project Companies</strong> — Companies like IGO Agritech Farms help farmers navigate and access relevant subsidies</li>
</ul>

<h2>Types of Agricultural Subsidies in India</h2>
<p>The Indian government offers a wide spectrum of subsidies covering nearly every aspect of the agricultural value chain:</p>

<ol style="margin-left:2rem;margin-bottom:2rem;">
  <li style="margin-bottom:1rem;"><strong>Fertilizer Subsidies</strong> — Making essential crop nutrients more affordable for smallholder farmers</li>
  <li style="margin-bottom:1rem;"><strong>Irrigation Support</strong> — Funding for drip irrigation, sprinkler systems, and water management infrastructure</li>
  <li style="margin-bottom:1rem;"><strong>Seed Subsidies</strong> — Providing certified, high-yielding seed varieties at reduced prices</li>
  <li style="margin-bottom:1rem;"><strong>Power and Fuel Cost Reduction</strong> — Electricity subsidies for agricultural pumps and machinery</li>
  <li style="margin-bottom:1rem;"><strong>Agricultural Credit</strong> — Low-interest loans through Kisan Credit Cards and priority sector lending</li>
  <li style="margin-bottom:1rem;"><strong>Farm Machinery Assistance</strong> — Subsidies on tractors, harvesters, and agri-equipment under various state schemes</li>
  <li style="margin-bottom:1rem;"><strong>Crop Insurance (PMFBY)</strong> — Pradhan Mantri Fasal Bima Yojana providing financial cover against crop loss from natural calamities</li>
  <li style="margin-bottom:1rem;"><strong>Polyhouse & Greenhouse Development (MIDH)</strong> — The Mission for Integrated Development of Horticulture offers 50–75% financial support for protected farming structures</li>
  <li style="margin-bottom:1rem;"><strong>Organic Farming Initiatives (PKVY)</strong> — Paramparagat Krishi Vikas Yojana supporting the transition to certified organic farming</li>
</ol>

<h2>Benefits of Agricultural Subsidies</h2>
<p>When effectively designed and delivered, agricultural subsidies create multiple layers of benefit for farmers and the broader economy:</p>

<ul style="margin-left:2rem;margin-bottom:2rem;">
  <li style="margin-bottom:0.75rem;"><strong>Cost Reduction</strong> — Lowering the financial burden of inputs, infrastructure, and equipment</li>
  <li style="margin-bottom:0.75rem;"><strong>Technology Adoption</strong> — Encouraging uptake of modern farming methods that would otherwise be financially inaccessible</li>
  <li style="margin-bottom:0.75rem;"><strong>Improved Yields</strong> — Supporting the conditions that lead to better crop performance and higher productivity</li>
  <li style="margin-bottom:0.75rem;"><strong>Sustainability Promotion</strong> — Incentivizing eco-friendly, water-efficient, and soil-preserving practices</li>
  <li style="margin-bottom:0.75rem;"><strong>Food Security</strong> — Ensuring stable domestic food production regardless of market volatility</li>
  <li style="margin-bottom:0.75rem;"><strong>Risk Mitigation</strong> — Protecting farmers from catastrophic losses due to weather events or market shocks</li>
</ul>

<h2>Challenges and the Way Forward</h2>
<p>Despite their importance, agricultural subsidies in India face challenges including leakages, delayed disbursement, and uneven access across farming communities. The way forward involves:</p>

<ul style="margin-left:2rem;margin-bottom:2rem;">
  <li style="margin-bottom:0.75rem;">Digitalization of subsidy delivery to eliminate middlemen</li>
  <li style="margin-bottom:0.75rem;">Direct Benefit Transfer (DBT) implementation to ensure funds reach farmers directly</li>
  <li style="margin-bottom:0.75rem;">Farmer education programs to increase awareness of available schemes</li>
  <li style="margin-bottom:0.75rem;">Greater transparency and grievance redressal mechanisms</li>
  <li style="margin-bottom:0.75rem;">Public-private partnerships to amplify the impact of subsidy programs</li>
</ul>

<blockquote>Agricultural subsidies, when well-targeted and efficiently delivered, are not a cost to the nation — they are an investment in our food sovereignty, farmer welfare, and economic future.</blockquote>

<p>At IGO Agritech Farms, we actively support our project partners in navigating available subsidy schemes for polyhouse farming, hydroponics, and other protected agriculture projects. Our team provides end-to-end guidance on subsidy applications to ensure our clients maximize available government support. Contact us to learn more about how we can help you access the subsidies your project qualifies for.</p>`
  },
  {
    id: "press-media-honours-dr-john",
    title: "Press & Media Reporters Union Honours Dr. John Yesudhas for Agritech Leadership",
    excerpt: "The Tamil Nadu Press & Media Reporters Union honored Dr. John Yesudhas, Founder & CEO of IGO Group, for his visionary leadership in agricultural technology innovation and commitment to creating employment through agritech initiatives.",
    date: "December 14, 2024",
    image: "/assets/blog/b9-1.webp",
    author: "IGO News",
    category: "Awards & Recognition",
    content: `<p>India's agricultural sector is undergoing a profound transformation, driven by technology adoption, sustainable practices, and a new generation of visionary leaders who see farming not just as a livelihood, but as a high-growth industry with global potential. In recognition of one such leader, the <strong>Tamil Nadu Press & Media Reporters Union</strong> organized a special felicitation event honoring individuals who have made extraordinary contributions to agricultural transformation.</p>

<img src="/assets/blog/b9-1.webp" alt="Press & Media Reporters Union Honour" style="width:100%;border-radius:1.5rem;margin:2rem 0;" />

<h2>Recognizing Visionary Leadership</h2>
<p>Dr. John Yesudhas, <strong>Founder & CEO of IGO Group</strong> and recognized as a <em>Tech Farming Scientist</em>, was honored at the event for his outstanding contributions to modern agriculture and agritech development across India. The award particularly acknowledged his visionary leadership and commitment to making farming profitable, structured, and technology-driven — transforming the way Indian farming is perceived and practiced.</p>

<img src="/assets/blog/b9-2.webp" alt="Dr. John Yesudhas Receiving Award" style="width:100%;border-radius:1.5rem;margin:2rem 0;" />

<h2>25,000+ Jobs and Counting</h2>
<p>One of the most remarkable aspects of IGO Group's journey under Dr. Yesudhas' leadership is its impact on employment generation. IGO Group has <strong>successfully created over 25,000 job opportunities</strong> through its diversified agritech initiatives, spanning a wide range of operations including:</p>

<ul style="margin-left:2rem;margin-bottom:2rem;">
  <li style="margin-bottom:0.75rem;">Polyhouse farming projects and operations</li>
  <li style="margin-bottom:0.75rem;">Microgreens cultivation units</li>
  <li style="margin-bottom:0.75rem;">Hydroponic farming systems</li>
  <li style="margin-bottom:0.75rem;">Open field cultivation projects</li>
  <li style="margin-bottom:0.75rem;">Aquaculture and livestock development</li>
  <li style="margin-bottom:0.75rem;">Agri-engineering and farm infrastructure</li>
</ul>

<p>This employment impact underscores the broader social responsibility that IGO Group embraces — creating dignified, skilled employment in rural and semi-urban communities while driving agricultural modernization.</p>

<img src="/assets/blog/b9-3.webp" alt="IGO Employment and Community Impact" style="width:100%;border-radius:1.5rem;margin:2rem 0;" />

<h2>Discussions on the Future of Indian Agriculture</h2>
<p>The event also featured substantive discussions among media leaders, agricultural experts, and policy advocates on topics including:</p>

<ul style="margin-left:2rem;margin-bottom:2rem;">
  <li style="margin-bottom:0.75rem;"><strong>Precision Farming</strong> — Using data, sensors, and AI to optimize crop yield and resource use</li>
  <li style="margin-bottom:0.75rem;"><strong>Agri-Technology Advancements</strong> — Emerging technologies reshaping how India grows its food</li>
  <li style="margin-bottom:0.75rem;"><strong>Rural Employment Generation</strong> — Strategies for creating sustainable livelihoods through agritech</li>
  <li style="margin-bottom:0.75rem;"><strong>Sustainable Agriculture</strong> — Balancing productivity with environmental stewardship</li>
</ul>

<blockquote>"Making farming profitable is not just a business goal — it is a social mission. Every structured, technology-driven farming project we create changes lives in ways that go far beyond the harvest." — Dr. John Yesudhas</blockquote>

<p>IGO Agritech Farms is proud to have Dr. John Yesudhas at the helm, guiding the organization with integrity, innovation, and an unshakeable commitment to India's agricultural future. We thank the Tamil Nadu Press & Media Reporters Union for this meaningful recognition and look forward to achieving even greater milestones in the years ahead.</p>`
  }
];

export const products = [
  { id: "polyethylene-sheet", title: "Polyethylene Sheet", category: "Polyhouse Parts", description: "UV-stabilized professional-grade polyhouse covering.", price: "Price on Request", image: "/assets/compressed/product/types/polyhouse-sheets.webp" },
  { id: "zig-zag-wire", title: "Zig Zag Wire", category: "Polyhouse Parts", description: "Specialized wires for securing polyethylene sheets safely.", price: "Price on Request", image: "/assets/compressed/product/types/polyhouse-sheets.webp" },
  { id: "insect-net", title: "Insect Net", category: "Polyhouse Parts", description: "High-density UV protected nets for pest exclusion.", price: "Price on Request", image: "/assets/compressed/product/types/insect-net-.webp" },
  { id: "shade-net", title: "Shade Net", category: "Polyhouse Parts", description: "Multi-layered nets for light and heat management.", price: "Price on Request", image: "/assets/compressed/product/types/shade-nets-.webp" },
  { id: "gutter", title: "Structural Gutter", category: "Polyhouse Parts", description: "Industrial-grade galvanized gutters for drainage.", price: "Price on Request", image: "/assets/compressed/product/types/gi-pipes-.webp" },
  { id: "universal-joint", title: "Universal Joint", category: "Polyhouse Parts", description: "Heavy-duty joints for structural stability.", price: "Price on Request", image: "/assets/compressed/product/types/gi-pipes-.webp" },
  { id: "aluminium-profile", title: "Aluminium Profile", category: "Polyhouse Parts", description: "High-strength C-profiles for sheet locking.", price: "Price on Request", image: "/assets/compressed/product/types/gi-pipes-.webp" },
  { id: "screw-nuts-bolts", title: "Screw, Nuts & Bolts", category: "Polyhouse Parts", description: "Corrosion-resistant fasteners for polyhouse assembly.", price: "Price on Request", image: "/assets/compressed/product/types/gi-pipes-.webp" },
  { id: "clamps", title: "Clamps", category: "Polyhouse Parts", description: "Various structural clamps for tube connections.", price: "Price on Request", image: "/assets/compressed/product/types/gi-pipes-.webp" },
  { id: "teflon-tape", title: "Teflon Thread Tape", category: "Hydroponic Parts", description: "Professional grade sealing tape for plumbing.", price: "Price on Request", image: "/assets/compressed/product/types/hydroponic-nutrients-.webp" },
  { id: "upvc-solvent", title: "UPVC Solvent", category: "Hydroponic Parts", description: "High-strength adhesive for hydroponic pipe networks.", price: "Price on Request", image: "/assets/compressed/product/types/hydroponic-nutrients-.webp" },
  { id: "crop-net", title: "Crop Net", category: "Hydroponic Parts", description: "Support netting for climbing and heavy crops.", price: "Price on Request", image: "/assets/compressed/product/types/insect-net-.webp" },
  { id: "twine-rope", title: "Twine Rope", category: "Hydroponic Parts", description: "Trellising rope for vertical growing systems.", price: "Price on Request", image: "/assets/compressed/product/types/insect-net-.webp" },
  { id: "nft-channel-2", title: "NFT Channel (2 inch)", category: "Hydroponic Parts", description: "High-grade food-safe channels for NFT systems.", price: "Price on Request", image: "/assets/compressed/product/types/nft-channels-.webp" },
  { id: "nft-channel-3", title: "NFT Channel (3 inch)", category: "Hydroponic Parts", description: "Wider NFT channels for larger root systems.", price: "Price on Request", image: "/assets/compressed/product/types/nft-channels-.webp" },
  { id: "greenpro", title: "Greenpro Products", category: "Specialized", description: "Exclusive range of Greenpro agricultural inputs.", price: "Price on Request", image: "/assets/compressed/product/types/organic-fertilizer-.webp" },
];

export const courses = [
  {
    id: "polyhouse-training",
    title: "Polyhouse Training",
    duration: "5 Days",
    level: "All Levels",
    description: "Complete training on polyhouse construction, operation, and crop management. Master industrial-grade setup, climate control, and commercial profitability.",
    topics: ["Structure Design & Installation", "Climate Control Systems", "Crop Selection & Management", "Fertigation & Drip Irrigation", "Business Planning & ROI"],
  },
  {
    id: "hydroponics-training",
    title: "Hydroponics Training",
    duration: "5 Days",
    level: "Beginner to Advanced",
    description: "Hands-on training in soilless farming techniques and commercial NFT/DWC system setup. Learn to grow high-value crops year-round without soil.",
    topics: ["NFT & DWC System Setup", "Nutrient Solution Management", "pH & EC Balancing", "Commercial Crop Scheduling", "Market & Sales Strategy"],
  },
  {
    id: "vertical-farming-training",
    title: "Vertical Farming Training",
    duration: "3 Days",
    level: "Intermediate",
    description: "Mastering light physics and modular layer design for high-density urban agriculture — grow 10× more in the same footprint.",
    topics: ["Multi-Layer Farm Design", "LED Lighting Systems", "Climate Automation", "Space Optimization", "Cost-Benefit Analysis"],
  },
  {
    id: "mushroom-cultivation",
    title: "Mushroom Cultivation",
    duration: "3 Days",
    level: "Beginner Friendly",
    description: "Learn the complete commercial mushroom farming cycle — from substrate preparation and spawn inoculation to harvest and high-margin retail packaging.",
    topics: ["Substrate Preparation", "Spawn Inoculation Techniques", "Humidity & Temperature Control", "Oyster & Button Varieties", "Packaging & Market Linkage"],
  },
  {
    id: "aquaculture-fish-farming",
    title: "Aquaculture & Fish Farming",
    duration: "5 Days",
    level: "All Levels",
    description: "Comprehensive aquaculture training covering traditional pond farming, RAS systems, cage culture, and integrated fish-crop farming for maximum returns.",
    topics: ["Pond Design & Water Management", "Species & Fingerling Selection", "Feed & Nutrition Planning", "Disease Prevention & Treatment", "Harvest, Processing & Marketing"],
  },
  {
    id: "biofloc-technology",
    title: "Biofloc Technology Training",
    duration: "3 Days",
    level: "Intermediate",
    description: "Master the revolutionary Biofloc Technology for intensive fish and shrimp farming with zero water exchange, superior FCR, and dramatically reduced input costs.",
    topics: ["Biofloc Fundamentals & Microbiology", "C:N Ratio Management", "Aeration & Tank Design", "Shrimp & Fish Integration", "Disease Prevention & Biosecurity"],
  },
  {
    id: "goat-livestock-farming",
    title: "Goat & Livestock Farming",
    duration: "3 Days",
    level: "Beginner Friendly",
    description: "End-to-end commercial goat farming training including breed selection, shed design, feed planning, veterinary care, and profitable market linkage strategies.",
    topics: ["High-Yield Breed Selection", "Shed Design & Construction", "Scientific Feed Planning", "Veterinary Care & Vaccination", "Business Model & Buyback Options"],
  },
  {
    id: "microgreens-production",
    title: "Microgreens Production",
    duration: "2 Days",
    level: "Beginner",
    description: "A quick-start training program for growing nutrient-dense microgreens for high-value restaurant, hotel, and premium retail markets with very low investment.",
    topics: ["Seed Selection & Pre-Soaking", "Tray Setup & Precision Sowing", "Light & Irrigation Management", "Harvesting & Cold Chain", "Premium Sales Channels"],
  },
  {
    id: "drip-irrigation-training",
    title: "Drip Irrigation & Farm Engineering",
    duration: "3 Days",
    level: "Technical",
    description: "Hands-on training in designing, installing, and maintaining drip and sprinkler irrigation systems for large-scale commercial farms and government subsidy projects.",
    topics: ["System Design & Layout", "Pump & Filter Selection", "Drip Line & Emitter Installation", "Fertigation System Integration", "Maintenance & Troubleshooting"],
  },
  {
    id: "agri-entrepreneur-masterclass",
    title: "Agri Entrepreneur Masterclass",
    duration: "2 Days",
    level: "All Levels",
    description: "A high-impact business masterclass for aspiring agri-entrepreneurs — covering DPR writing, subsidy navigation, investor pitch, and end-to-end farm business planning.",
    topics: ["DPR & Feasibility Report Writing", "NABARD & NHB Subsidy Schemes", "Investor Pitch Preparation", "Financial Modeling & ROI", "Market Linkage & Scaling Strategy"],
  },
];

export const faqs = [
  { question: "What is open cultivation in agriculture?", answer: "Open cultivation refers to the traditional method of growing crops in open fields, where plants are directly sown in soil or transplanted, and rely on natural environmental conditions such as sunlight, rain, and wind for their growth and development." },
  { question: "What are the advantages of open cultivation?", answer: "Some advantages include lower initial setup costs compared to controlled environment methods, reliance on natural sunlight and rain reducing energy costs, large-scale production potential, and opportunity for natural pest control through ecosystem services." },
  { question: "How is irrigation managed in IGO Agritech Farms' projects?", answer: "IGO Agritech Farms uses different irrigation methods such as drip irrigation, sprinkler irrigation, or furrow irrigation, depending on crop type, soil type, and water availability. Efficient water conservation practices are implemented to optimize crop growth." },
  { question: "What training programs do you offer?", answer: "We offer comprehensive training in Polyhouse, Hydroponics, Vertical Farming, Mushroom Cultivation, Goat Farming, and Aquaculture. Each program includes hands-on practical sessions and business planning guidance." },
  { question: "Do you provide buyback services?", answer: "Yes, IGO Agritech Farms provides buyback services for project partners, ensuring stable income and market access for the produce grown using our technology and guidance." },
  { question: "What is the investment required for a polyhouse project?", answer: "The investment varies based on the size, location, and crop selection. Our team provides detailed project reports with cost analysis, ROI projections, and subsidy information tailored to your requirements." },
  { question: "Do you offer joint venture partnerships?", answer: "Yes, we offer joint venture models where investors can partner with us. We provide end-to-end management including technology, operations, marketing, and assured returns." },
  { question: "How can I enroll in a training course?", answer: "You can enroll through our website's course enquiry form, call us at +91 7397789803, or visit our facility in Chennai. We conduct regular batches and also offer customized training sessions." },
];

export const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Projects",
    href: "/projects",
    children: [
      {
        label: "Agri Farming Projects",
        href: "/projects/agri",
        icon: "/assets/header/project-drop-down-icon/agri-farm-projects-.webp",
        cardImage: "/assets/new project images/main-page/agri farming projects .png",
        children: [
          {
            label: "Protected Farming Projects",
            href: "/projects/agri/protected",
            icon: Tent,
            cardImage: "/assets/new project images/project-subcategories/subcategories/protected farming project.png",
            children: [
              { label: "Naturally Ventilated Polyhouse", href: "/projects/agri/protected/naturally-ventilated", image: "/assets/new project images/naturally ventilated polyuhouse .png" },
              { label: "Climate Controlled Polyhouse", href: "/projects/agri/protected/climate-controlled", image: "/assets/new project images/climate controlled polyhouse .jpeg" },
              { label: "Polycarbonate Greenhouse", href: "/projects/agri/protected/polycarbonate", image: "/assets/new project images/polycarboate green house .png" },
              { label: "Shade Net House", href: "/projects/agri/protected/shade-net", image: "/assets/new project images/shade net new .png" },
              { label: "Mist Chamber", href: "/projects/agri/protected/mist-chamber", image: "/assets/new project images/mist chamber .jpeg" },
            ]
          },
          {
            label: "Hydroponic Farming Projects",
            href: "/projects/agri/hydroponic",
            icon: Droplets,
            cardImage: "/assets/new project images/project-subcategories/subcategories/hydroponic farming projects.png",
            children: [
              { label: "NFT Hydroponic System", href: "/projects/agri/hydroponic/nft", image: "/assets/new project images/nft hydroponic system .png" },
              { label: "Deep Water Culture System", href: "/projects/agri/hydroponic/dwc", image: "/assets/new project images/deep water culture system .jpeg" },
              { label: "Vertical Hydroponic Towers", href: "/projects/agri/hydroponic/towers", image: "/assets/new project images/vertical hydroponic .png" },
              { label: "Commercial Hydroponic Farms", href: "/projects/agri/hydroponic/commercial", image: "/assets/new project images/commercial  indoor hydroponic setup .png" },
              { label: "Indoor Hydroponic Units", href: "/projects/agri/hydroponic/indoor", image: "/assets/new project images/indoor hydroponic .png" },
            ]
          },
          {
            label: "Vertical Farming Projects",
            href: "/projects/agri/vertical",
            icon: Layers,
            cardImage: "/assets/new project images/project-subcategories/subcategories/verticall farming projects.png",
            children: [
              { label: "Indoor Vertical Farms", href: "/projects/agri/vertical/indoor", image: "/assets/new project images/vertical hydroponic toers .png" },
              { label: "Commercial Vertical Farming Units", href: "/projects/agri/vertical/commercial", image: "/assets/new project images/vertical hydroponic toers .png" },
              { label: "Smart Grow Room Systems", href: "/projects/agri/vertical/smart-grow", image: "/assets/new project images/smart grow with sensor .png" },
            ]
          },
          {
            label: "Open Field Cultivation Projects",
            href: "/projects/agri/open-field",
            icon: TreeDeciduous,
            cardImage: "/assets/new project images/project-subcategories/subcategories/open cultivation project .png",
            children: [
              { label: "Dragon Fruit Plantation", href: "/projects/agri/open-field/dragon-fruit", image: "/assets/new project images/dragon furit farming .png" },
              { label: "Guava Plantation", href: "/projects/agri/open-field/guava", image: "/assets/new project images/gova fruit farming .png" },
              { label: "Mango Plantation", href: "/projects/agri/open-field/mango", image: "/assets/new project images/mango cultivaion .png" },
              { label: "Papaya Plantation", href: "/projects/agri/open-field/papaya", image: "/assets/new project images/papaya farming .png" },
              { label: "Fig Plantation", href: "/projects/agri/open-field/fig", image: "/assets/new project images/fig plantation .png" },
              { label: "Blueberry Plantation", href: "/projects/agri/open-field/blueberry", image: "/assets/new project images/blueberry plantation .png" },
            ]
          },
          {
            label: "Vegetable Cultivation Projects",
            href: "/projects/agri/vegetable",
            icon: Carrot,
            cardImage: "/assets/new project images/project-subcategories/subcategories/vegetable cultivation .png",
            children: [
              { label: "Cucumber Farming", href: "/projects/agri/vegetable/cucumber", image: "/assets/new project images/cucumber farming .png" },
              { label: "Capsicum Farming", href: "/projects/agri/vegetable/capsicum", image: "/assets/new project images/capcium farming .png" },
              { label: "Tomato Farming", href: "/projects/agri/vegetable/tomato", image: "/assets/new project images/tamato farming .png" },
              { label: "Chilli Farming", href: "/projects/agri/vegetable/chilli", image: "/assets/new project images/chilli farming .png" },
              { label: "Muskmelon Farming", href: "/projects/agri/vegetable/muskmelon", image: "/assets/new project images/muskmelon farming .png" },
              { label: "Watermelon Farming", href: "/projects/agri/vegetable/watermelon", image: "/assets/new project images/water melon farming .png" },
            ]
          },
          {
            label: "Medicinal Crop Projects",
            href: "/projects/agri/medicinal",
            icon: Pill,
            cardImage: "/assets/new project images/project-subcategories/subcategories/medicnl crop farming .png",
            children: [
              { label: "Aloe Vera Farming", href: "/projects/agri/medicinal/aloe-vera", image: "/assets/new project images/aloe vera farming .png" },
              { label: "Moringa Plantation", href: "/projects/agri/medicinal/moringa", image: "/assets/new project images/morenga farming .png" },
              { label: "Ginger Farming", href: "/projects/agri/medicinal/ginger", image: "/assets/new project images/ginger farming .png" },
              { label: "Turmeric Farming", href: "/projects/agri/medicinal/turmeric", image: "/assets/new project images/turmeric farming .png" },
              { label: "Tapioca Cultivation", href: "/projects/agri/medicinal/tapioca", image: "/assets/new project images/tapioca cultivation .png" },
            ]
          },
          {
            label: "Floriculture Projects",
            href: "/projects/agri/floriculture",
            icon: Flower,
            cardImage: "/assets/new project images/project-subcategories/subcategories/floriculture farming .png",
            children: [
              { label: "Rose Farming", href: "/projects/agri/floriculture/rose", image: "/assets/new project images/rose farming.png" },
              { label: "Jasmine Farming", href: "/projects/agri/floriculture/jasmine", image: "/assets/new project images/jasmin farming .png" },
              { label: "Marigold Farming", href: "/projects/agri/floriculture/marigold", image: "/assets/new project images/marigold farming .png" },
              { label: "Exotic Flower Farming", href: "/projects/agri/floriculture/exotic", image: "/assets/new project images/exotic farming .png" },
            ]
          },
          {
            label: "Mushroom Farming Projects",
            href: "/projects/agri/mushroom",
            icon: Leaf,
            cardImage: "/assets/new project images/project-subcategories/subcategories/mushroom  farming projects  .png",
            children: [
              { label: "Oyster Mushroom Units", href: "/projects/agri/mushroom/oyster", image: "/assets/new project images/oyster mushrrom units .png" },
              { label: "Button Mushroom Units", href: "/projects/agri/mushroom/button", image: "/assets/new project images/button mushroom .png" },
              { label: "Commercial Mushroom Farms", href: "/projects/agri/mushroom/commercial", image: "/assets/new project images/commercial mushroom farm .png" },
            ]
          },
          {
            label: "Urban Farming Projects",
            href: "/projects/agri/urban",
            icon: Building,
            cardImage: "/assets/new project images/project-subcategories/subcategories/urban farming project .png",
            children: [
              { label: "Rooftop Gardening Projects", href: "/projects/agri/urban/rooftop", image: "/assets/new project images/rooftop gardening projects .png" },
              { label: "Terrace Farming Projects", href: "/projects/agri/urban/terrace", image: "/assets/new project images/terrace garden projects  .png" },
              { label: "Kitchen Garden Projects", href: "/projects/agri/urban/kitchen", image: "/assets/new project images/kitchen garden .png" },
              { label: "Microgreens Production Units", href: "/projects/agri/urban/microgreens", image: "/assets/new project images/microgreens .png" },
            ]
          },
          {
            label: "Nursery Projects",
            href: "/projects/agri/nursery",
            icon: Sprout,
            cardImage: "/assets/new project images/project-subcategories/subcategories/nursery project .png",
            children: [
              { label: "Commercial Plant Nursery", href: "/projects/agri/nursery/commercial", image: "/assets/new project images/commercial plan nursery .png" },
              { label: "Seedling Production Units", href: "/projects/agri/nursery/seedling" },
              { label: "Tissue Culture Plant Nursery", href: "/projects/agri/nursery/tissue-culture", image: "/assets/new project images/tissue culture plant nursery .png" },
            ]
          }
        ]
      },
      {
        label: "Aquaculture Farming Projects",
        href: "/projects/aquaculture",
        icon: "/assets/header/project-drop-down-icon/aquaculture-farming-projects-.webp",
        cardImage: "/assets/new project images/main-page/aquaculture projects .png",
        children: [
          {
            label: "Fish Farming Projects",
            href: "/projects/aquaculture/fish",
            icon: Fish,
            cardImage: "/assets/new project images/project-subcategories/subcategories/frish farming .png",
            children: [
              { label: "Traditional Fish Farming", href: "/projects/aquaculture/fish/traditional", image: "/assets/new project images/traditional fish farming .png" },
              { label: "Intensive Fish Farming", href: "/projects/aquaculture/fish/intensive", image: "/assets/new project images/intensive fish farming .png" },
              { label: "Cage Fish Farming", href: "/projects/aquaculture/fish/cage", image: "/assets/new project images/cage fish farming .png" },
            ]
          },
          {
            label: "Biofloc Farming Projects",
            href: "/projects/aquaculture/biofloc",
            icon: Waves,
            cardImage: "/assets/new project images/project-subcategories/subcategories/biofloc  farming project .png",
            children: [
              { label: "Biofloc Fish Farming", href: "/projects/aquaculture/biofloc/fish", image: "/assets/new project images/biofloc fish farming .png" },
              { label: "Biofloc Shrimp Farming", href: "/projects/aquaculture/biofloc/shrimp", image: "/assets/new project images/shrimp farming .png" },
            ]
          },
          {
            label: "Shrimp Farming Projects",
            href: "/projects/aquaculture/shrimp",
            icon: Waves,
            cardImage: "/assets/new project images/project-subcategories/subcategories/shrimp farming .png",
            children: [
              { label: "Vannamei Shrimp Farming", href: "/projects/aquaculture/shrimp/vannamei", image: "/assets/new project images/vannamei shrimp farming .png" },
              { label: "Freshwater Prawn Farming", href: "/projects/aquaculture/shrimp/prawn", image: "/assets/new project images/shrimp farming .png" },
            ]
          },
          {
            label: "Crab Farming Projects",
            href: "/projects/aquaculture/crab",
            icon: Waves,
            cardImage: "/assets/new project images/project-subcategories/subcategories/crab farming projects .jpeg",
            children: [
              { label: "Mud Crab Farming", href: "/projects/aquaculture/crab/mud-crab", image: "/assets/new project images/mud crab .png" },
            ]
          },
          {
            label: "Integrated Aquaculture",
            href: "/projects/aquaculture/integrated",
            icon: RefreshCcw,
            cardImage: "/assets/new project images/project-subcategories/subcategories/intergarated aqua farming .png",
            children: [
              { label: "Aquaponics Systems", href: "/projects/aquaculture/integrated/aquaponics", image: "/assets/new project images/aquaponics system .png" },
              { label: "Integrated Fish + Crop Farming", href: "/projects/aquaculture/integrated/fish-crop", image: "/assets/new project images/integrated fish +crop farming .png" },
            ]
          }
        ]
      },
      {
        label: "Livestock Farming Projects",
        href: "/projects/livestock",
        icon: "/assets/header/project-drop-down-icon/livestock-farming-projecs-.webp",
        cardImage: "/assets/new project images/main-page/live stock project .png",
        children: [
          {
            label: "Goat Farming",
            href: "/projects/livestock/goat",
            icon: Shield,
            cardImage: "/assets/new project images/project-subcategories/subcategories/goat farming .png",
            children: [
              { label: "Commercial Goat Farming", href: "/projects/livestock/goat/commercial", image: "/assets/new project images/goat farming .png" },
              { label: "Integrated Goat Farming", href: "/projects/livestock/goat/integrated", image: "/assets/new project images/goat and fish farmign.png" },
            ]
          },
          {
            label: "Sheep Farming",
            href: "/projects/livestock/sheep",
            icon: Scissors,
            cardImage: "/assets/new project images/project-subcategories/subcategories/ship farming .png",
            children: [
              { label: "Commercial Sheep Farming", href: "/projects/livestock/sheep/commercial", image: "/assets/new project images/comercial sheep farming .png" },
            ]
          },
          {
            label: "Dairy Farming",
            href: "/projects/livestock/dairy",
            icon: Milk,
            cardImage: "/assets/new project images/project-subcategories/subcategories/dairy farming .png",
            children: [
              { label: "Dairy Farm Setup", href: "/projects/livestock/dairy/setup", image: "/assets/new project images/dairy farm setup .png" },
              { label: "Automated Dairy Systems", href: "/projects/livestock/dairy/automated", image: "/assets/new project images/automated dairy system .png" },
            ]
          },
          {
            label: "Poultry Farming",
            href: "/projects/livestock/poultry",
            icon: Bird,
            cardImage: "/assets/new project images/project-subcategories/subcategories/poultry farming .png",
            children: [
              { label: "Broiler Chicken Farms", href: "/projects/livestock/poultry/broiler", image: "/assets/new project images/brolier chicken farm .png" },
              { label: "Layer Chicken Farms", href: "/projects/livestock/poultry/layer", image: "/assets/new project images/layer chicken farming .png" },
            ]
          },
          {
            label: "Integrated Livestock Farming",
            href: "/projects/livestock/integrated",
            icon: Heart,
            cardImage: "/assets/new project images/project-subcategories/subcategories/intergrated live stock farming .png",
            children: [
              { label: "Goat + Fish Farming", href: "/projects/livestock/integrated/goat-fish", image: "/assets/new project images/goat and fish farmign.png" },
              { label: "Dairy + Crop Farming", href: "/projects/livestock/integrated/dairy-crop", image: "/assets/new project images/dairy + crop farming .png" },
            ]
          }
        ]
      },
      {
        label: "Farm Engineering Projects",
        href: "/projects/engineering",
        icon: "/assets/header/project-drop-down-icon/farm-engineering-projects.webp",
        cardImage: "/assets/new project images/main-page/farm engineering project .png",
        children: [
          {
            label: "Farm Infrastructure Projects",
            href: "/projects/engineering/infrastructure",
            icon: Factory,
            cardImage: "/assets/new project images/project-subcategories/subcategories/farm infrastructure project .png",
            children: [
              { label: "Cold Storage", href: "/projects/engineering/infrastructure/cold-storage", image: "/assets/new project images/project-subcategories/types/cold-storage.jpg" },
              { label: "Pack House", href: "/projects/engineering/infrastructure/pack-house", image: "/assets/new project images/packing house .png" },
              { label: "Farm Buildings", href: "/projects/engineering/infrastructure/buildings", image: "/assets/new project images/farm buildings .png" },
              { label: "Farm Roads", href: "/projects/engineering/infrastructure/roads", image: "/assets/new project images/farm roads .png" },
            ]
          },
          {
            label: "Water Management Projects",
            href: "/projects/engineering/water",
            icon: Droplets,
            cardImage: "/assets/new project images/project-subcategories/subcategories/water management project .png",
            children: [
              { label: "Rainwater Harvesting", href: "/projects/engineering/water/rainwater", image: "/assets/new project images/rain water harwesting .png" },
              { label: "Pond Liner Installation", href: "/projects/engineering/water/pond-liner", image: "/assets/new project images/pond liner  installation .png" },
              { label: "Farm Irrigation Systems", href: "/projects/engineering/water/irrigation", image: "/assets/new project images/irrigation system .png" },
              { label: "Borewell & Water Storage Systems", href: "/projects/engineering/water/borewell", image: "/assets/new project images/borewell & water storage system .png" },
            ]
          },
          {
            label: "Solar Agriculture Projects",
            href: "/projects/engineering/solar",
            icon: Sun,
            cardImage: "/assets/new project images/project-subcategories/subcategories/solar agriculture project   .png",
            children: [
              { label: "Solar Crop Dryer", href: "/projects/engineering/solar/crop-dryer", image: "/assets/new project images/solar driyer .png" },
              { label: "Solar Heater", href: "/projects/engineering/solar/heater", image: "/assets/new project images/solar heater .png" },
              { label: "Solar Fencing", href: "/projects/engineering/solar/fencing", image: "/assets/new project images/solar fencing .png" },
              { label: "Solar Lighting", href: "/projects/engineering/solar/lighting", image: "/assets/new project images/solar lighting .png" },
            ]
          },
          {
            label: "Farm Development Projects",
            href: "/projects/engineering/development",
            icon: Map,
            cardImage: "/assets/new project images/project-subcategories/subcategories/farm development project .png",
            children: [
              { label: "Land Surveying", href: "/projects/engineering/development/surveying", image: "/assets/new project images/lan surveying .png" },
              { label: "Topographic Mapping", href: "/projects/engineering/development/topographic", image: "/assets/new project images/topography surveying .png" },
              { label: "Contour Mapping", href: "/projects/engineering/development/contour", image: "/assets/new project images/contour mapping .png" },
              { label: "Land Leveling", href: "/projects/engineering/development/leveling", image: "/assets/new project images/land leveling .png" },
            ]
          }
        ]
      }
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Farm Planning & Consulting",
        href: "/services/farm-planning",
        icon: "/assets/compressed/service/main-page-service-image/farm-planning-&-consulting.webp",
        cardImage: "/assets/compressed/service/main-page-service-image/farm-planning-&-consulting.webp",
        children: [
          { label: "Farm Business Planning", href: "/services/farm-planning/farm-business-planning", image: "/assets/service/service image new/Farm Business Planning.webp" },
          { label: "Agri Investment Consulting", href: "/services/farm-planning/agri-investment-consulting", image: "/assets/service/service image new/Agri Investment Consulting.webp" },
          { label: "Crop Selection Consulting", href: "/services/farm-planning/crop-selection-consulting", image: "/assets/service/service image new/Crop Selection Consulting.webp" },
          { label: "Farm Layout Design", href: "/services/farm-planning/farm-layout-design", image: "/assets/service/service image new/Farm Layout Design.webp" },
          { label: "Aquaculture Consulting", href: "/services/farm-planning/aquaculture-consulting", image: "/assets/service/service image new/Aquaculture Consulting.webp" },
          { label: "Land Surveying", href: "/services/farm-planning/land-surveying", image: "/assets/service/service image new/Land Surveying.webp" },
        ]
      },
      {
        label: "Farming Project Setup",
        href: "/services/farming-project-setup",
        icon: "/assets/compressed/service/main-page-service-image/farming-project-setup.webp",
        cardImage: "/assets/compressed/service/main-page-service-image/farming-project-setup.webp",
        children: [
          { label: "Polyhouse Installation", href: "/services/farming-project-setup/polyhouse-installation", image: "/assets/service/service image new/Polyhouse Installation.webp" },
          { label: "Hydroponic Setup", href: "/services/farming-project-setup/hydroponic-setup", image: "/assets/service/service image new/Hydroponic Setup.webp" },
          { label: "Vertical Farming Setup", href: "/services/farming-project-setup/vertical-farming-setup", image: "/assets/service/service image new/Vertical Farming Setup.webp" },
          { label: "Fish Farming Setup", href: "/services/farming-project-setup/fish-farming-setup", image: "/assets/service/service image new/Fish Farming Setup.webp" },
          { label: "Biofloc Installation", href: "/services/farming-project-setup/biofloc-installation", image: "/assets/service/service image new/Biofloc Installation.webp" },
          { label: "Aquaculture Pond Construction", href: "/services/farming-project-setup/aquaculture-pond-construction", image: "/assets/service/service image new/Pond Construction.webp" },
          { label: "Aquaponics Setup", href: "/services/farming-project-setup/aquaponics-setup", image: "/assets/service/service image new/Aquaponics Setup.webp" },
          { label: "Goat Farm Setup", href: "/services/farming-project-setup/goat-farm-setup", image: "/assets/service/service image new/Goat Farm Setup.webp" },
          { label: "Dairy Farm Setup", href: "/services/farming-project-setup/dairy-farm-setup", image: "/assets/service/service image new/Dairy Farm Setup.webp" },
          { label: "Sheep Farm Setup", href: "/services/farming-project-setup/sheep-farm-setup", image: "/assets/service/service image new/Sheep Farm Setup.webp" },
          { label: "Poultry Farm Setup", href: "/services/farming-project-setup/poultry-farm-setup", image: "/assets/service/service image new/Poultry Farm Setup.webp" },
          { label: "GIS Mapping", href: "/services/farming-project-setup/gis-mapping", image: "/assets/service/service image new/GIS Mapping.webp" },
        ]
      },
      {
        label: "Farm Infrastructure",
        href: "/services/farm-infrastructure",
        icon: "/assets/compressed/service/main-page-service-image/farm-infrastructure-&-irrigation.webp",
        cardImage: "/assets/compressed/service/main-page-service-image/farm-infrastructure-&-irrigation.webp",
        children: [
          { label: "Cold Storage Construction", href: "/services/farm-infrastructure/cold-storage-construction", image: "/assets/service/service image new/Cold Storage Construction.webp" },
          { label: "Packhouse Construction", href: "/services/farm-infrastructure/packhouse-construction", image: "/assets/service/service image new/Packhouse Construction.webp" },
          { label: "Farm Building Design", href: "/services/farm-infrastructure/farm-building-design", image: "/assets/service/service image new/Farm Building Design.webp" },
          { label: "Drip Irrigation Installation", href: "/services/farm-infrastructure/drip-irrigation-installation", image: "/assets/service/service image new/Drip Irrigation Installation.webp" },
          { label: "Sprinkler Irrigation Systems", href: "/services/farm-infrastructure/sprinkler-irrigation-systems", image: "/assets/service/service image new/Sprinkler Systems.webp" },
          { label: "Water Pump Systems", href: "/services/farm-infrastructure/water-pump-systems", image: "/assets/service/service image new/Water Pump Systems.webp" },
          { label: "Land Leveling", href: "/services/farm-infrastructure/land-leveling", image: "/assets/service/service image new/Land Leveling.webp" },
        ]
      },
      {
        label: "Maintenance & Support",
        href: "/services/maintenance-support",
        icon: "/assets/compressed/service/main-page-service-image/maintenance-&-support.webp",
        cardImage: "/assets/compressed/service/main-page-service-image/maintenance-&-support.webp",
        children: [
          { label: "Livestock Shed Construction", href: "/services/maintenance-support/livestock-shed-construction", image: "/assets/service/service image new/Livestock Shed Construction.webp" },
          { label: "Polyhouse AMC", href: "/services/maintenance-support/polyhouse-amc", image: "/assets/service/service image new/Polyhouse AMC.webp" },
          { label: "Hydroponic System AMC", href: "/services/maintenance-support/hydroponic-system-amc", image: "/assets/service/service image new/Hydroponic AMC.webp" },
          { label: "Farm Equipment Maintenance", href: "/services/maintenance-support/farm-equipment-maintenance", image: "/assets/service/service image new/Equipment Maintenance.webp" },
        ]
      }
    ],
  },
  {
    label: "Products",
    href: "/products",
    children: [
      {
        label: "Agri-Farming Inputs",
        href: "/products/agri-inputs",
        icon: Sprout,
        cardImage: "/assets/product-images/new main image for product/agri inputs .jpg",
        children: [
          { label: "Vegetable Seeds", href: "/products/agri-inputs/veg-seeds", icon: Sprout },
          { label: "Fruit Seeds", href: "/products/agri-inputs/fruit-seeds", icon: Cherry },
          { label: "Leafy & Herb Seeds", href: "/products/agri-inputs/leafy-seeds", icon: Leaf },

          { label: "Growing Media & Substrates", href: "/products/agri-inputs/media", icon: Layers },
          { label: "Plant Nutrition & Fertilizers", href: "/products/agri-inputs/nutrition", icon: FlaskConical },
          { label: "Plant Protection (IPM)", href: "/products/agri-inputs/protection", icon: ShieldCheck },
          { label: "Plant Growth Regulators", href: "/products/agri-inputs/pgrs", icon: Zap },
          { label: "Mulching & Weed Control", href: "/products/agri-inputs/mulching", icon: Grid },
        ]
      },
      {
        label: "Polyhouse Structure",
        href: "/products/structure",
        icon: Hammer,
        cardImage: "/assets/product-images/new main image for product/polyhouse structure .jpg",
        children: [
          { label: "Structural Frames & Parts", href: "/products/structure/frames", icon: Construction },
          { label: "Greenhouse Covering", href: "/products/structure/covering", icon: Tent },
          { label: "Insect & Shade Nets", href: "/products/structure/nets", icon: Grid },
          { label: "Climate & Ventilation", href: "/products/structure/ventilation", icon: Fan },
          { label: "Misting & Fogging", href: "/products/structure/misting", icon: CloudRain },
          { label: "Plumbing & Distribution", href: "/products/structure/plumbing", icon: Pipette },
        ]
      },
      {
        label: "Control & Automation",
        href: "/products/automation",
        icon: Cpu,
        cardImage: "/assets/product-images/new main image for product/automation and cotroller .jpg",
        children: [
          { label: "Dosing & Fertigation", href: "/products/automation/dosing", icon: Settings2 },
          { label: "Environmental Controllers", href: "/products/automation/controllers", icon: Thermometer },
          { label: "Smart Actuators & Motors", href: "/products/automation/motors", icon: Gauge },
          { label: "Electrical Systems", href: "/products/automation/electrical", icon: Zap },
        ]
      },
      {
        label: "Horticulture Catalog",
        href: "/products/horticulture",
        icon: Flower,
        cardImage: "/assets/product-images/new main image for product/horticulture catlog .png",
        children: [
          { label: "Vegetable Crops", href: "/products/horticulture/vegetables", icon: Apple },
          { label: "Flower Crops", href: "/products/horticulture/flowers", icon: Sun },
          { label: "Exotic Fruit Crops", href: "/products/horticulture/fruits", icon: Cherry },
          { label: "Medicinal & Herbs", href: "/products/horticulture/herbs", icon: Leaf },
        ]
      },
      {
        label: "Digital Agri & IoT",
        href: "/products/digital",
        icon: Activity,
        cardImage: "/assets/product-images/new main image for product/digital agri and iot .jpg",
        children: [
          { label: "IoT Hardware & Nodes", href: "/products/digital/hardware", icon: Cpu },
          { label: "Software & Dashboards", href: "/products/digital/software", icon: Monitor },
          { label: "Digital Services", href: "/products/digital/services", icon: Globe },
        ]
      },
      {
        label: "Post-Harvest & Legacy",
        href: "/products/specialized",
        icon: Package,
        cardImage: "/assets/product-images/new main image for product/post harvest and legacy .jpg",
        children: [
          { label: "Harvesting & Cold Chain", href: "/products/specialized/post-harvest", icon: ThermometerSnowflake },
          { label: "Aquaculture Solutions", href: "/products/specialized/aquaculture", icon: Droplets },
          { label: "Livestock Ecosystems", href: "/products/specialized/livestock", icon: Heart },
        ]
      }
    ]
  },
  { label: "Blog", href: "/blog", icon: "📰" },
  { label: "Careers", href: "/careers", icon: "💼" },
  { label: "Contact", href: "/contact", icon: "📞" },
  { label: "About", href: "/about", icon: "🏢" },
  { label: "IGO Academy", href: "/courses", icon: "🎓" },
];

export const igoBrands = [
  { id: "igo-agritech-farms", name: "IGO Agritech Farms", logo: "/assets/brands/igo agritech farms .jpg", tag: "Core Business", desc: "India's leading Agri Engineering & Consulting brand — polyhouse, hydroponics, vertical farming, precision farming and livestock projects. Pan-India. MSME Award 2024." },
  { id: "farmers-factory", name: "Farmers Factory", logo: "/assets/brands/farmers factory .jpg", tag: "Processing & Mfg", desc: "Farm to shop distribution brand. Bringing fresh farm produce directly to retail stores and consumers across India." },
  { id: "valluvam", name: "Valluvam", logo: "/assets/brands/valluvam .jpg", tag: "Agri Consultancy", desc: "Branded grocery staples celebrating Tamil heritage. Quality everyday essentials — As Pure As Nature." },
  { id: "protein-cuts", name: "Protein Cuts", logo: "/assets/brands/proten cuts .jpg", tag: "Farm-to-Table", desc: "Premium meat, fish, and eggs retail brand. Fresh protein products straight from IGO's own livestock farms." },
  { id: "igo-agrimart", name: "IGO Agri Mart", logo: "/assets/brands/igo agri mart .jpg", tag: "Distribution", desc: "Farm inputs and distribution network connecting quality agricultural inputs directly to farmers across India." },
  { id: "igo-nursery", name: "IGO Nursery", logo: "/assets/brands/igo nursery .jpg", tag: "Plant Propagation", desc: "Premium nursery and landscaping solutions — supplying quality plants, seeds and horticultural products pan-India." },
  { id: "palm-cafe", name: "Palm Cafe", logo: "/assets/brands/palm cafe .jpg", tag: "F&B", desc: "The Healthy Food Joint — farm-to-table F&B brand creating 5,000 jobs for youth using IGO's own farm produce." },
  { id: "igo-exports-imports", name: "IGO Exports & Imports", logo: "/assets/brands/tech farming export .jpg", tag: "Trade", desc: "International trade division connecting Indian agri products to global markets and bringing world-class inputs to India." },
  { id: "igo-tech-farming-scientists", name: "IGO Tech Farming Scientist Foundation", logo: "/assets/brands/igo-foundation.jpeg", tag: "Foundation", desc: "Research and education foundation advancing agri-science and technology for the next generation of tech farming scientists." },
  { id: "igo-mart", name: "IGO Mart", logo: "/assets/brands/igo mart .jpg", tag: "Retail", desc: "Supermarket chain offering quality products at accessible prices — part of IGO Group's consumer retail vision." },
  { id: "igo-fintech", name: "IGO Fintech", logo: "/assets/brands/igo fintech .jpg", tag: "Fintech", desc: "Micro finance unit providing financial access and support to farmers and agricultural entrepreneurs across India." },
  { id: "igo-farm-land-estates", name: "IGO Farm Land Estates", logo: "", tag: "Real Estate", desc: "Agricultural land and property development — creating investment opportunities in farmland across India." },
  { id: "igo-wealth-management", name: "IGO Wealth Management Services", logo: "", tag: "Investment", desc: "JV investment project providing wealth management and financial planning services to IGO Group stakeholders." },
  { id: "igo-franchise", name: "IGO Franchise", logo: "", tag: "Franchise", desc: "Franchise operations division expanding IGO Group brands across India through a structured franchise model." },
  { id: "igo-farmgate-mandi", name: "IGO Farmgate Mandi", logo: "/assets/brands/igo farm gate mandi.jpg", tag: "Programme", desc: "Guaranteed buy-back programme for farmers — empowering agricultural entrepreneurs with assured market access." },
  { id: "igo-crop-care", name: "IGO Crop Care", logo: "", tag: "Agri Input", desc: "Quality crop care solutions for optimum yield and sustainable farming practices across all crop types." },
  { id: "igo-organic-pharmacy", name: "IGO Organic Pharmacy", logo: "", tag: "Healthcare", desc: "Future division developing organic pharmaceutical products from IGO's farm network — bridging agriculture and health." },
  { id: "igo-natural-cosmetics", name: "IGO Natural Cosmetics", logo: "", tag: "Lifestyle", desc: "Future personal care brand using natural farm-sourced ingredients. Farm to skin — the next frontier for IGO Group." },
  { id: "igo-farm-factories", name: "IGO Farm Factories", logo: "", tag: "Infrastructure", desc: "Industrial-scale farm facilities integrating processing, storage, and logistics for high-efficiency agri-chains." },
  { id: "igo-agrimart-sub", name: "IGO AgriMart", logo: "/assets/brands/igo agri mart .jpg", tag: "Distribution", desc: "Specialized input supply centers for advanced farming technologies and sustainable inputs." },
  { id: "india-green", name: "India Green", logo: "", tag: "Sustainability", desc: "Environmental conservation and green initiative division focused on carbon neutrality and sustainable agri-ecosystems." },
  { id: "india-green-organics", name: "India Green Organics", desc: "Certified organic production and distribution arm ensuring chemical-free food for a healthier India.", logo: "", tag: "Organic" },
  { id: "igo-farm-loans-subsidy", name: "IGO Farm Loans, Subsidy & Grants", logo: "", tag: "Finance", desc: "Expert guidance and financial facilitation for farmers to access government agricultural subsidies and low-interest loans." },
  { id: "igo-farm-automation", name: "IGO Farm Automation", logo: "", tag: "Technology", desc: "Smart farm hardware and software solutions—IoT, sensors, and automated climate control for precision agriculture." },
  { id: "igo-training-courses", name: "IGO Training Courses", logo: "", tag: "Education", desc: "Skill development and masterclasses for modern farming techniques, certified by industry experts." },
  { id: "igo-green-energy", name: "IGO Green Energy", logo: "", tag: "Energy", desc: "Renewable energy solutions for farms, including solar water pumps and solar agri-grid integration." },
];

export const indiaPresence = {
  stats: [
    { label: "Happy Clients", value: "15,000+", sublabel: "VERIFIED" },
    { label: "Projects Done", value: "15,000+", sublabel: "VERIFIED" },
    { label: "Experience", value: "10+ Years", sublabel: "VERIFIED" },
    { label: "Experts", value: "2,000+", sublabel: "VERIFIED" },
  ],
  states: [
    { name: "Andhra Pradesh", isHub: true },
    { name: "Arunachal Pradesh", isHub: false },
    { name: "Assam", isHub: false },
    { name: "Bihar", isHub: false },
    { name: "Chhattisgarh", isHub: false },
    { name: "Goa", isHub: false },
    { name: "Gujarat", isHub: false },
    { name: "Haryana", isHub: false },
    { name: "Himachal Pradesh", isHub: false },
    { name: "Jharkhand", isHub: false },
    { name: "Karnataka", isHub: true },
    { name: "Kerala", isHub: false },
    { name: "Madhya Pradesh", isHub: false },
    { name: "Maharashtra", isHub: true },
    { name: "Manipur", isHub: false },
    { name: "Meghalaya", isHub: false },
    { name: "Mizoram", isHub: false },
    { name: "Nagaland", isHub: false },
    { name: "Odisha", isHub: false },
    { name: "Punjab", isHub: false },
    { name: "Rajasthan", isHub: false },
    { name: "Sikkim", isHub: false },
    { name: "Tamil Nadu", isHub: true },
    { name: "Telangana", isHub: false },
    { name: "Tripura", isHub: false },
    { name: "Uttar Pradesh", isHub: true },
    { name: "Uttarakhand", isHub: false },
    { name: "West Bengal", isHub: false },
  ],
  unionTerritories: [
    { name: "Andaman & Nicobar", isHub: false },
    { name: "Chandigarh", isHub: false },
    { name: "Dadra & Nagar Haveli", isHub: false },
    { name: "Daman & Diu", isHub: false },
    { name: "Delhi / NCR", isHub: true },
    { name: "Jammu & Kashmir", isHub: false },
    { name: "Ladakh", isHub: false },
    { name: "Lakshadweep", isHub: false },
    { name: "Puducherry", isHub: false },
  ]
};

