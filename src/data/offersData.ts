// Advertising / Offer Posters — data types and localStorage helpers

export interface OfferPoster {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  ctaLabel: string;
  ctaLink: string;
  image: string;          // base64 data URL or absolute/relative URL
  bgColor: string;        // fallback bg colour
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
  expiryDate: string | null;
  note: string;
}

export interface HistoryEntry {
  id: string;
  action: "published" | "updated" | "deleted" | "activated" | "deactivated" | "reordered";
  posterTitle: string;
  posterId: string;
  timestamp: string;
  changeNote: string;
  snapshot: OfferPoster | null;
}

const OFFERS_KEY  = "igo_offer_posters";
const HISTORY_KEY = "igo_ads_history";

export const getOffers = (): OfferPoster[] => {
  try { return JSON.parse(localStorage.getItem(OFFERS_KEY) || "[]"); }
  catch { return []; }
};

export const saveOffers = (offers: OfferPoster[]): void =>
  localStorage.setItem(OFFERS_KEY, JSON.stringify(offers));

export const getActiveOffers = (): OfferPoster[] => {
  const now = new Date();
  return getOffers()
    .filter(o => {
      if (!o.isActive) return false;
      if (o.expiryDate && new Date(o.expiryDate) < now) return false;
      return true;
    })
    .sort((a, b) => a.displayOrder - b.displayOrder);
};

export const getHistory = (): HistoryEntry[] => {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]"); }
  catch { return []; }
};

export const addHistory = (entry: Omit<HistoryEntry, "id" | "timestamp">): void => {
  const history = getHistory();
  history.unshift({ ...entry, id: `h_${Date.now()}`, timestamp: new Date().toISOString() });
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 150)));
};

export const generateId = (): string =>
  `offer_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

/** Compress + resize image file to base64 JPEG (~1200px wide, quality 0.78) */
export const compressImage = (file: File, maxWidth = 1200, quality = 0.78): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ratio   = Math.min(maxWidth / img.width, 1);
        canvas.width  = img.width  * ratio;
        canvas.height = img.height * ratio;
        canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export const BADGE_OPTIONS = [
  "", "HOT DEAL", "NEW", "LIMITED", "SPECIAL", "SEASONAL", "FLASH SALE",
];

export const CTA_PRESETS = [
  { label: "Contact Us",    value: "/contact" },
  { label: "View Projects", value: "/projects" },
  { label: "View Products", value: "/products" },
  { label: "View Services", value: "/services" },
  { label: "View Offers",   value: "/offers" },
  { label: "Custom URL…",   value: "__custom__" },
];

// ─── Default seed posters (shown on first load before any uploads) ───────────
const SEED_KEY = "igo_offers_seeded_v15";

const DEFAULT_OFFERS: OfferPoster[] = [
  {
    id: "seed_1",
    title: "",
    subtitle: "",
    badge: "IGO GROUP",
    ctaLabel: "View Projects",
    ctaLink: "/projects",
    image: "/assets/demo-poster/main-banner.png",
    bgColor: "#1a5c1a",
    isActive: true,
    displayOrder: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    expiryDate: null,
    note: "Permanent Main Banner",
  },
  {
    id: "seed_2",
    title: "Happy Bakrid Day",
    subtitle: "Celebrate the bounty that sustains.",
    badge: "BAKRID MUBARAK",
    ctaLabel: "Register Your Project",
    ctaLink: "/contact",
    image: "/assets/hero-banners/active/bakrid-banner-1.png",
    bgColor: "#1a5c1a",
    isActive: true,
    displayOrder: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    expiryDate: null,
    note: "Bakrid Main Banner",
  },
  {
    id: "seed_3",
    title: "Bakrid Special Offer",
    subtitle: "Save from ₹75,000 to ₹5 Lakhs on Agri-Farming Projects.",
    badge: "SPECIAL OFFER",
    ctaLabel: "Contact Us",
    ctaLink: "/contact",
    image: "/assets/hero-banners/active/bakrid-banner-2.png",
    bgColor: "#1a5c1a",
    isActive: true,
    displayOrder: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    expiryDate: null,
    note: "Bakrid Offer Poster",
  },
];

/** Seeds default demo-posters into localStorage on first ever load (or version bump). */
export const initDefaultOffers = (): void => {
  const currentSeed = localStorage.getItem(SEED_KEY);
  if (currentSeed === "1") return;

  // Clear ALL old seed keys so stale data is wiped
  Object.keys(localStorage).forEach(k => {
    if (k.startsWith("igo_offers_seeded_v") || k === "igo_offer_posters") {
      localStorage.removeItem(k);
    }
  });

  // Force-write corrected default offers
  saveOffers(DEFAULT_OFFERS);
  localStorage.setItem(SEED_KEY, "1");
};

export const exportHistoryCSV = (): void => {
  const rows = [
    ["ID", "Action", "Poster", "Timestamp", "Note"],
    ...getHistory().map(h => [h.id, h.action, h.posterTitle, h.timestamp, h.changeNote]),
  ];
  const csv  = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url  = URL.createObjectURL(blob);
  const a    = Object.assign(document.createElement("a"), {
    href: url,
    download: `igo_ads_history_${new Date().toISOString().slice(0, 10)}.csv`,
  });
  a.click();
  URL.revokeObjectURL(url);
};

