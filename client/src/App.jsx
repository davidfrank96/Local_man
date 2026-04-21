import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Store,
  Clock3,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  ShieldCheck,
  Compass,
  Mail,
  Phone,
  Palette,
  Navigation,
  BadgeDollarSign,
  LocateFixed,
  Salad,
  Menu,
  X,
  Users,
  Map,
  Star,
  Search,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const themes = {
  sunset: {
    name: "Sunset Market",
    page: "#f7f2e8",
    panel: "#fffaf1",
    card: "#ffffff",
    text: "#1f2937",
    muted: "#6b7280",
    border: "#e7dcc8",
    accent: "#c76b2a",
    accentSoft: "#f6d9b8",
    accentDeep: "#8f3f16",
    dark: "#1f1a17",
    pin: "#d9481f",
    water: "#bfe1f4",
    land: "#f1d28a",
    road: "#fff7e6",
    glow: "rgba(215, 109, 47, 0.22)",
  },
  forest: {
    name: "Market Green",
    page: "#eff5ee",
    panel: "#f7fcf7",
    card: "#ffffff",
    text: "#163126",
    muted: "#577264",
    border: "#d7e6da",
    accent: "#2f7a55",
    accentSoft: "#d6eadc",
    accentDeep: "#1f5c3f",
    dark: "#12211a",
    pin: "#dd6b20",
    water: "#cde9ea",
    land: "#dce9b6",
    road: "#f8fbef",
    glow: "rgba(47, 122, 85, 0.22)",
  },
  midnight: {
    name: "Midnight City",
    page: "#0f1720",
    panel: "#111b27",
    card: "#162231",
    text: "#e8eef7",
    muted: "#97a7bc",
    border: "#243447",
    accent: "#60a5fa",
    accentSoft: "#152c45",
    accentDeep: "#93c5fd",
    dark: "#081018",
    pin: "#f97316",
    water: "#17354c",
    land: "#1d2d3c",
    road: "#395067",
    glow: "rgba(96, 165, 250, 0.22)",
  },
};

const vendors = [
  { name: "Mama Tolu's Breakfast Spot", food: "Akara, pap, bread", area: "Yaba", time: "6:00 AM - 10:30 AM", price: "₦" },
  { name: "Mallam Musa Suya", food: "Suya, kilishi, spicy sides", area: "Wuse", time: "6:00 PM - 12:00 AM", price: "₦₦" },
  { name: "Bisi Local Kitchen", food: "Amala, ewedu, gbegiri", area: "Surulere", time: "12:00 PM - 8:00 PM", price: "₦₦" },
  { name: "Campus Chop Corner", food: "Rice, stew, spaghetti", area: "Akoka", time: "11:00 AM - 7:00 PM", price: "₦" },
];

const mapSpots = [
  { title: "Hidden amala joint", note: "Lunch crowd favorite", x: "21%", y: "56%" },
  { title: "Street akara stand", note: "Morning rush spot", x: "68%", y: "34%" },
  { title: "Roadside jollof", note: "Budget meals all day", x: "32%", y: "30%" },
  { title: "Night suya stop", note: "Best after 7 PM", x: "76%", y: "63%" },
];

const features = [
  { icon: Navigation, title: "Map-led local discovery", text: "See where hidden vendors are clustered and explore neighborhoods visually instead of relying on generic restaurant grids." },
  { icon: Salad, title: "Search by cravings and context", text: "Look for what you want to eat, what is open now, and what fits your budget without digging through noise." },
  { icon: Store, title: "Visibility for smaller vendors", text: "Give roadside sellers, home kitchens, market stalls, and small canteens a fairer shot at being found." },
  { icon: BadgeDollarSign, title: "Built around affordability", text: "The product is designed for real everyday food decisions, not just premium dining or delivery-first behavior." },
];

const vendorBenefits = [
  "Get discovered by people nearby",
  "List what you sell, where you are, and when you are open",
  "Build repeat customers without fighting for attention on restaurant-first platforms",
  "Tell your story and grow your own local audience",
];

const steps = [
  { icon: Search, title: "Search what you want", text: "Look for amala, suya, akara, rice spots, cheap lunch, or whatever fits your mood and budget." },
  { icon: Map, title: "See it on the map", text: "Find nearby spots visually, understand where clusters are, and choose what works for your location." },
  { icon: Star, title: "Go where locals trust", text: "Discover places people already know are worth the stop, not just whoever spent the most on visibility." },
];

const stats = [
  { value: "Hidden", label: "vendors made visible" },
  { value: "Local", label: "food culture preserved" },
  { value: "Better", label: "discovery for everyday meals" },
];

function SectionHeader({ eyebrow, title, text, center = false, theme }) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <div
        className="mb-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em]"
        style={{ background: theme.accentSoft, color: theme.accentDeep, border: `1px solid ${theme.border}` }}
      >
        {eyebrow}
      </div>
      <h2 className="text-3xl font-semibold tracking-tight md:text-5xl" style={{ color: theme.text }}>
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 md:text-lg" style={{ color: theme.muted }}>
        {text}
      </p>
    </div>
  );
}

function ThemePicker({ current, setCurrent, theme }) {
  return (
    <div className="inline-flex w-full flex-wrap items-center gap-2 rounded-2xl px-3 py-3 sm:w-auto" style={{ background: theme.panel, border: `1px solid ${theme.border}` }}>
      <div className="mr-1 flex items-center gap-2 text-sm font-medium" style={{ color: theme.text }}>
        <Palette className="h-4 w-4" />
        Color mood
      </div>
      {Object.entries(themes).map(([key, item]) => (
        <button
          key={key}
          type="button"
          onClick={() => setCurrent(key)}
          className="rounded-full px-3 py-2 text-xs font-semibold transition"
          style={{
            background: current === key ? item.accent : item.card,
            color: current === key ? "white" : theme.text,
            border: `1px solid ${current === key ? item.accent : theme.border}`,
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

function MobileMenu({ open, setOpen, theme }) {
  if (!open) return null;
  return (
    <div className="border-t px-6 py-5 md:hidden" style={{ background: theme.page, borderColor: theme.border }}>
      <div className="flex flex-col gap-4 text-sm font-medium" style={{ color: theme.text }}>
        {[
          ["Story", "#story"],
          ["Map concept", "#map"],
          ["How it works", "#how-it-works"],
          ["Vendors", "#vendors"],
          ["Waitlist", "#waitlist"],
        ].map(([label, href]) => (
          <a key={label} href={href} onClick={() => setOpen(false)} className="py-1">
            {label}
          </a>
        ))}
        <a
          href="#waitlist"
          onClick={() => setOpen(false)}
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white"
          style={{ background: theme.accent }}
        >
          Join waitlist
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

function MapHero({ theme }) {
  return (
    <div
      className="relative overflow-hidden rounded-[2rem] p-3 shadow-2xl md:rounded-[2.5rem] md:p-4"
      style={{ background: theme.panel, border: `1px solid ${theme.border}`, boxShadow: `0 28px 80px ${theme.glow}` }}
    >
      <div className="relative h-[24rem] overflow-hidden rounded-[1.5rem] sm:h-[28rem] lg:h-[34rem]" style={{ background: `linear-gradient(145deg, ${theme.land}, ${theme.water})` }}>
        <svg viewBox="0 0 800 620" className="absolute inset-0 h-full w-full">
          <rect x="0" y="0" width="800" height="620" fill={theme.land} />
          <path d="M535 0c37 45 49 100 37 160-13 61-2 106 36 147 29 31 72 57 128 79v234H0V423c45-35 78-75 96-120 27-67 85-97 173-89 36 3 69-8 100-34 26-22 55-41 86-56 26-12 53-18 80-18z" fill={theme.water} opacity="0.95" />
          <path d="M0 115c78 22 145 25 202 9 75-22 130-18 165 11 40 33 90 39 151 18 59-20 115-25 168-16 43 8 81 6 114-5" fill="none" stroke={theme.road} strokeWidth="11" strokeLinecap="round" opacity="0.95" />
          <path d="M65 548c62-26 112-70 150-132 43-71 97-112 162-123 73-12 129-44 170-97 30-40 72-70 127-91" fill="none" stroke={theme.road} strokeWidth="12" strokeLinecap="round" opacity="0.95" />
          <path d="M154 0c8 85 41 145 99 181 72 45 104 95 96 149-8 48 10 91 54 128 54 45 104 80 149 104" fill="none" stroke={theme.road} strokeWidth="9" strokeLinecap="round" opacity="0.75" />
          <path d="M742 220c-67 0-122 16-166 49-56 42-105 58-148 48-56-13-102-3-139 28-30 25-77 45-141 60-57 13-106 49-149 108" fill="none" stroke={theme.road} strokeWidth="8" strokeLinecap="round" opacity="0.72" />
        </svg>

        <div className="absolute left-4 top-4 rounded-2xl px-4 py-3 backdrop-blur-xl md:left-6 md:top-6" style={{ background: "rgba(255,255,255,0.82)", border: `1px solid ${theme.border}` }}>
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] sm:text-xs" style={{ color: theme.accentDeep }}>
            Live map concept
          </div>
          <div className="mt-1 text-xs font-semibold sm:text-sm" style={{ color: theme.text }}>
            Hidden spots worth knowing
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4 rounded-2xl px-4 py-3 backdrop-blur-xl md:bottom-6 md:left-6 md:right-auto" style={{ background: "rgba(255,255,255,0.82)", border: `1px solid ${theme.border}` }}>
          <div className="flex items-center gap-2 text-xs sm:text-sm" style={{ color: theme.text }}>
            <LocateFixed className="h-4 w-4" style={{ color: theme.accent }} />
            Map-led local discovery. Real neighborhoods. Real food culture.
          </div>
        </div>

        {mapSpots.map((spot, index) => {
          const mobileLabelSide = index % 2 === 0 ? "left-1/2 -translate-x-1/2" : "right-0";
          const desktopLabelPosition = index % 2 === 0 ? "sm:left-[4.4rem] sm:top-1/2 sm:-translate-y-1/2" : "sm:right-[4.4rem] sm:top-1/2 sm:-translate-y-1/2";
          return (
            <div key={spot.title} className="absolute" style={{ left: spot.x, top: spot.y }}>
              <div className="relative -translate-x-1/2 -translate-y-1/2">
                <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl sm:h-14 sm:w-14" style={{ background: theme.glow }} />
                <div className="relative flex h-11 w-11 items-center justify-center rounded-full text-white shadow-xl sm:h-14 sm:w-14" style={{ background: theme.pin }}>
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="absolute left-1/2 top-[3rem] h-8 w-[2px] -translate-x-1/2 sm:top-[3.85rem] sm:h-12" style={{ background: theme.pin, opacity: 0.35 }} />
                <div
                  className={`absolute top-[3.75rem] w-32 rounded-2xl px-3 py-2 text-center shadow-lg backdrop-blur-xl ${mobileLabelSide} sm:w-44 sm:text-left ${desktopLabelPosition}`}
                  style={{ background: "rgba(255,255,255,0.88)", border: `1px solid ${theme.border}` }}
                >
                  <div className="text-[11px] font-semibold capitalize sm:text-sm" style={{ color: theme.text }}>
                    {spot.title}
                  </div>
                  <div className="mt-1 text-[10px] sm:text-xs" style={{ color: theme.muted }}>
                    {spot.note}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function VendorCard({ vendor, theme }) {
  return (
    <div className="group rounded-3xl p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl" style={{ background: theme.card, border: `1px solid ${theme.border}` }}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold" style={{ color: theme.text }}>{vendor.name}</h3>
          <p className="mt-1 text-sm" style={{ color: theme.muted }}>{vendor.food}</p>
        </div>
        <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: theme.accentSoft, color: theme.accentDeep }}>
          {vendor.price}
        </span>
      </div>
      <div className="space-y-2 text-sm" style={{ color: theme.muted }}>
        <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {vendor.area}</div>
        <div className="flex items-center gap-2"><Clock3 className="h-4 w-4" /> {vendor.time}</div>
      </div>
      <div className="mt-5 flex items-center gap-2 text-sm font-medium" style={{ color: theme.text }}>
        View vendor
        <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </div>
    </div>
  );
}

export default function LocalManLandingPage() {
  const [currentTheme, setCurrentTheme] = useState("sunset");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    joiningAs: "User",
    interest: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });

  const theme = useMemo(() => themes[currentTheme], [currentTheme]);
  const darkMode = currentTheme === "midnight";
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const updateField = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    if (!form.firstName || !form.lastName || !form.email) {
      setStatus({ type: "error", message: "First name, last name, and email are required." });
      return;
    }

    try {
      const response = await fetch(`${apiBaseUrl}/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus({ type: "success", message: "You joined the waitlist successfully." });
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        city: "",
        joiningAs: "User",
        interest: "",
      });
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Submission failed." });
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ background: theme.page, color: theme.text }}>
      <div className="absolute inset-x-0 top-0 -z-10 h-[42rem]" style={{ background: `radial-gradient(circle at top, ${theme.glow}, transparent 38%), radial-gradient(circle at 80% 20%, ${theme.accentSoft}, transparent 22%)` }} />

      <header className="sticky top-0 z-40 backdrop-blur-xl" style={{ background: `${theme.page}dd`, borderBottom: `1px solid ${theme.border}` }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-lg" style={{ background: theme.accent }}>
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <div className="text-base font-semibold tracking-tight">The Local Man</div>
              <div className="text-[11px] uppercase tracking-[0.2em] sm:text-xs" style={{ color: theme.muted }}>Discover real local food</div>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm md:flex" style={{ color: theme.muted }}>
            <a href="#story" className="transition hover:opacity-100" style={{ opacity: 0.92 }}>Story</a>
            <a href="#map" className="transition hover:opacity-100" style={{ opacity: 0.92 }}>Map concept</a>
            <a href="#how-it-works" className="transition hover:opacity-100" style={{ opacity: 0.92 }}>How it works</a>
            <a href="#vendors" className="transition hover:opacity-100" style={{ opacity: 0.92 }}>Vendors</a>
            <a href="#waitlist" className="transition hover:opacity-100" style={{ opacity: 0.92 }}>Waitlist</a>
          </nav>

          <div className="hidden md:block">
            <a href="#waitlist" className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5" style={{ background: theme.accent }}>
              Join waitlist
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-2xl md:hidden" style={{ background: theme.card, border: `1px solid ${theme.border}`, color: theme.text }} onClick={() => setMobileMenuOpen((prev) => !prev)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        <MobileMenu open={mobileMenuOpen} setOpen={setMobileMenuOpen} theme={theme} />
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:pb-24 lg:pt-16">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm shadow-sm" style={{ background: theme.card, color: theme.muted, border: `1px solid ${theme.border}` }}>
              <Sparkles className="h-4 w-4" style={{ color: theme.accent }} />
              Built for hidden food spots and the people who keep communities fed
            </div>

            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-7xl lg:leading-[1.02]">
              Discover the <span style={{ color: theme.accent }}>hidden spots worth knowing</span>.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8 lg:text-xl" style={{ color: theme.muted }}>
              The Local Man helps people discover authentic, affordable local food from roadside sellers, small kitchens, hidden neighborhood spots, market stalls, and everyday vendors who are usually invisible online.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a href="#waitlist" className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-medium text-white transition hover:-translate-y-0.5" style={{ background: theme.accent }}>
                Join the waitlist
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#map" className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-medium transition" style={{ border: `1px solid ${theme.border}`, background: theme.card, color: theme.text }}>
                See map concept
                <Navigation className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-8">
              <ThemePicker current={currentTheme} setCurrent={setCurrentTheme} theme={theme} />
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ["Map-first identity", "The product feels location-aware from the first screen"],
                ["Stronger visual hook", "The hidden-spots idea becomes obvious immediately"],
                ["Color switch built in", "You can compare multiple mood directions fast"],
              ].map(([title, text]) => (
                <div key={title} className="rounded-3xl p-5 shadow-sm backdrop-blur" style={{ background: theme.card, border: `1px solid ${theme.border}` }}>
                  <div className="text-sm font-semibold" style={{ color: theme.text }}>{title}</div>
                  <div className="mt-2 text-sm leading-6" style={{ color: theme.muted }}>{text}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <MapHero theme={theme} />
          </motion.div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8" id="story">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[2rem] p-8 md:p-10" style={{ background: theme.dark, color: "white" }}>
              <div className="mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em]" style={{ background: "rgba(255,255,255,0.1)", color: darkMode ? "#bfdbfe" : "#fbd38d" }}>
                The story behind it
              </div>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">This is bigger than finding food.</h2>
              <p className="mt-5 text-base leading-7 text-white/80">In many cities, especially in markets like Nigeria, thousands of people survive on daily food sales. They feed workers before work, students after school, neighborhoods at night, and families looking for affordable meals.</p>
              <p className="mt-4 text-base leading-7 text-white/80">But online visibility is skewed toward bigger brands. The people doing the real day-to-day feeding often stay hidden unless you already know someone who knows them.</p>
              <p className="mt-4 text-base leading-7 text-white/95">The Local Man exists to change that. It gives local vendors a digital presence and gives users a better way to discover the food culture already around them.</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {[
                "Small food vendors are hard to find online.",
                "Most discovery platforms prioritize bigger restaurants.",
                "Customers miss authentic, affordable food right around them.",
                "Word of mouth is still doing all the work for sellers who deserve more visibility.",
              ].map((item) => (
                <div key={item} className="rounded-[2rem] p-6 shadow-sm" style={{ background: theme.card, border: `1px solid ${theme.border}` }}>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: theme.accentSoft, color: theme.accentDeep }}>
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <p className="text-sm leading-6" style={{ color: theme.muted }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-4 rounded-[2rem] p-6 sm:grid-cols-3 sm:p-8" style={{ background: theme.card, border: `1px solid ${theme.border}` }}>
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-[1.5rem] p-5" style={{ background: theme.panel }}>
                <div className="text-3xl font-semibold sm:text-4xl" style={{ color: theme.text }}>{stat.value}</div>
                <div className="mt-2 text-sm" style={{ color: theme.muted }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" id="map">
          <SectionHeader eyebrow="Map section" title="Discover the places locals actually keep to themselves" text="Local Man helps people find hidden food spots, roadside favorites, budget meals, late-night gems, and neighborhood vendors that never make it onto the big delivery apps." center theme={theme} />
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[2rem] p-7" style={{ background: theme.card, border: `1px solid ${theme.border}` }}>
              <div className="space-y-4">
                {mapSpots.map((spot) => (
                  <div key={spot.title} className="flex gap-4 rounded-2xl p-4" style={{ background: theme.panel }}>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white" style={{ background: theme.pin }}>
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold capitalize" style={{ color: theme.text }}>{spot.title}</div>
                      <div className="mt-1 text-sm" style={{ color: theme.muted }}>{spot.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] p-8" style={{ background: theme.card, border: `1px solid ${theme.border}` }}>
              <h3 className="text-2xl font-semibold" style={{ color: theme.text }}>Why Local Man matters</h3>
              <div className="mt-6 space-y-4 text-sm leading-6" style={{ color: theme.muted }}>
                <div className="flex gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: theme.accent }} /> The best local spots are usually not on the big apps.</div>
                <div className="flex gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: theme.accent }} /> Small vendors deserve visibility without expensive platform fees.</div>
                <div className="flex gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: theme.accent }} /> Users get access to cheaper, better, and more authentic food options nearby.</div>
                <div className="flex gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: theme.accent }} /> The platform helps hidden local businesses get discovered and grow.</div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" id="how-it-works">
          <SectionHeader eyebrow="How it works" title="Built for real discovery, not generic listings" text="The Local Man is designed around how people actually search for food in real life: what they want to eat, how much they want to spend, what is close by, and which spots locals already rate highly." center theme={theme} />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <motion.div key={step.title} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeUp} className="rounded-[2rem] p-7 shadow-sm" style={{ background: theme.card, border: `1px solid ${theme.border}` }}>
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: theme.accentSoft, color: theme.accentDeep }}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold" style={{ color: theme.text }}>{step.title}</h3>
                  <p className="mt-3 text-sm leading-6" style={{ color: theme.muted }}>{step.text}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-[2rem] p-8 md:p-10" style={{ background: theme.card, border: `1px solid ${theme.border}` }}>
              <SectionHeader eyebrow="For users" title="Find what people around you already know is good" text="No more relying only on big restaurant apps. Discover affordable, authentic meals from the places people actually talk about in your neighborhood." theme={theme} />
              <div className="mt-8 flex flex-wrap gap-3">
                {["Breakfast", "Street Food", "Local Kitchens", "Night Grills", "Budget Meals", "Hidden Gems"].map((item) => (
                  <span key={item} className="rounded-full px-4 py-2 text-sm" style={{ background: theme.panel, color: theme.text, border: `1px solid ${theme.border}` }}>
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-8 rounded-[1.75rem] p-6 text-slate-100" style={{ background: theme.dark }}>
                <div className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: darkMode ? "#93c5fd" : "#fdba74" }}>Discovery example</div>
                <p className="mt-3 text-base leading-7 text-white/75">Search: “Affordable amala near me, open now” or “Best suya in this area after 7 PM.” That is the kind of intent this platform is built around.</p>
              </div>
            </div>

            <div className="rounded-[2rem] p-8 md:p-10" style={{ background: `linear-gradient(135deg, ${theme.accentSoft}, ${theme.panel})`, border: `1px solid ${theme.border}` }}>
              <div className="mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em]" style={{ background: theme.card, color: theme.text, border: `1px solid ${theme.border}` }}>
                For vendors
              </div>
              <h3 className="text-3xl font-semibold tracking-tight md:text-4xl" style={{ color: theme.text }}>A fairer way to be seen online</h3>
              <div className="mt-6 space-y-4">
                {vendorBenefits.map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl p-4 backdrop-blur" style={{ background: theme.card, border: `1px solid ${theme.border}` }}>
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" style={{ color: theme.accent }} />
                    <p className="text-sm leading-6" style={{ color: theme.muted }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" id="vendors">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeader eyebrow="Vendor examples" title="Still built for the people big platforms usually miss" text="The stronger visual design does not change the point of the product. The core remains visibility for smaller food vendors and better discovery for people who want authentic, affordable meals." theme={theme} />
            <a href="#waitlist" className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: theme.text }}>
              Be one of the first featured vendors
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {vendors.map((vendor) => <VendorCard key={vendor.name} vendor={vendor} theme={theme} />)}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] p-8 md:p-10" style={{ background: theme.card, border: `1px solid ${theme.border}` }}>
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
              <SectionHeader eyebrow="Long-term vision" title="Start with food discovery. Grow into local economic visibility." text="This starts as a better way to discover local food. But the bigger opportunity is building digital visibility for small food businesses, preserving neighborhood food culture, and creating a stronger local discovery ecosystem." theme={theme} />
              <div className="space-y-4">
                {[
                  "Launch waitlist and collect early users and vendors",
                  "Curate first set of food vendors by city and neighborhood",
                  "Release searchable discovery experience",
                  "Introduce vendor profiles, reviews, and featured spots",
                  "Expand to more cities and community-led local guides",
                ].map((item, index) => (
                  <div key={item} className="flex items-start gap-4 rounded-2xl p-4" style={{ background: theme.panel }}>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-sm font-semibold text-white" style={{ background: theme.accent }}>{index + 1}</div>
                    <p className="pt-1 text-sm leading-6" style={{ color: theme.muted }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="rounded-[2rem] p-7 shadow-sm" style={{ background: theme.card, border: `1px solid ${theme.border}` }}>
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: theme.accentSoft, color: theme.accentDeep }}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold" style={{ color: theme.text }}>{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6" style={{ color: theme.muted }}>{feature.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" id="waitlist">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="rounded-[2rem] p-8 md:p-10" style={{ background: theme.dark, color: "white" }}>
              <div className="mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em]" style={{ background: "rgba(255,255,255,0.1)", color: darkMode ? "#bfdbfe" : "#fbd38d" }}>
                Join early
              </div>
              <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Get early access to The Local Man.</h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/80">Join the waitlist for launch updates, early access, and first onboarding for vendors and local food lovers.</p>
              <div className="mt-8 space-y-3 text-sm text-white/80">
                <div className="flex items-center gap-3"><CheckCircle2 className="h-4 w-4" style={{ color: darkMode ? "#93c5fd" : "#fdba74" }} /> Early access updates</div>
                <div className="flex items-center gap-3"><CheckCircle2 className="h-4 w-4" style={{ color: darkMode ? "#93c5fd" : "#fdba74" }} /> First vendor onboarding spots</div>
                <div className="flex items-center gap-3"><CheckCircle2 className="h-4 w-4" style={{ color: darkMode ? "#93c5fd" : "#fdba74" }} /> Launch announcements and city rollout news</div>
              </div>
              <div className="mt-8 rounded-[1.5rem] p-5" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="flex items-center gap-3 text-sm text-white/90">
                  <Users className="h-4 w-4" />
                  Built for food lovers, local explorers, and vendors who deserve more visibility.
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] p-8 shadow-sm md:p-10" style={{ background: theme.card, border: `1px solid ${theme.border}` }}>
              <form className="grid gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
                <label className="grid gap-2">
                  <span className="text-sm font-medium" style={{ color: theme.text }}>First name</span>
                  <input value={form.firstName} onChange={updateField("firstName")} className="h-12 rounded-2xl px-4 outline-none ring-0 transition" style={{ border: `1px solid ${theme.border}`, background: theme.panel, color: theme.text }} placeholder="David" />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-medium" style={{ color: theme.text }}>Last name</span>
                  <input value={form.lastName} onChange={updateField("lastName")} className="h-12 rounded-2xl px-4 outline-none ring-0 transition" style={{ border: `1px solid ${theme.border}`, background: theme.panel, color: theme.text }} placeholder="Frank" />
                </label>
                <label className="grid gap-2 md:col-span-2">
                  <span className="text-sm font-medium" style={{ color: theme.text }}>Email address</span>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: theme.muted }} />
                    <input type="email" value={form.email} onChange={updateField("email")} className="h-12 w-full rounded-2xl pl-11 pr-4 outline-none ring-0 transition" style={{ border: `1px solid ${theme.border}`, background: theme.panel, color: theme.text }} placeholder="you@example.com" />
                  </div>
                </label>
                <label className="grid gap-2 md:col-span-2">
                  <span className="text-sm font-medium" style={{ color: theme.text }}>Phone number</span>
                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: theme.muted }} />
                    <input value={form.phone} onChange={updateField("phone")} className="h-12 w-full rounded-2xl pl-11 pr-4 outline-none ring-0 transition" style={{ border: `1px solid ${theme.border}`, background: theme.panel, color: theme.text }} placeholder="+234..." />
                  </div>
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-medium" style={{ color: theme.text }}>City</span>
                  <input value={form.city} onChange={updateField("city")} className="h-12 rounded-2xl px-4 outline-none ring-0 transition" style={{ border: `1px solid ${theme.border}`, background: theme.panel, color: theme.text }} placeholder="Lagos" />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-medium" style={{ color: theme.text }}>Joining as</span>
                  <select value={form.joiningAs} onChange={updateField("joiningAs")} className="h-12 rounded-2xl px-4 outline-none ring-0 transition" style={{ border: `1px solid ${theme.border}`, background: theme.panel, color: theme.text }}>
                    <option>User</option>
                    <option>Vendor</option>
                    <option>Both</option>
                  </select>
                </label>
                <label className="grid gap-2 md:col-span-2">
                  <span className="text-sm font-medium" style={{ color: theme.text }}>What kind of local food do you care about most?</span>
                  <textarea value={form.interest} onChange={updateField("interest")} className="min-h-[120px] rounded-2xl px-4 py-3 outline-none ring-0 transition" style={{ border: `1px solid ${theme.border}`, background: theme.panel, color: theme.text }} placeholder="Tell us what you want to discover or what you sell..." />
                </label>

                {status.message ? (
                  <div
                    className="rounded-2xl px-4 py-3 text-sm md:col-span-2"
                    style={{
                      background: status.type === "success" ? theme.accentSoft : darkMode ? "#3b1d1d" : "#fde2e2",
                      color: status.type === "success" ? theme.accentDeep : darkMode ? "#fecaca" : "#991b1b",
                      border: `1px solid ${status.type === "success" ? theme.border : darkMode ? "#7f1d1d" : "#fca5a5"}`,
                    }}
                  >
                    {status.message}
                  </div>
                ) : null}

                <button type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl px-6 text-sm font-medium text-white transition hover:-translate-y-0.5 md:col-span-2" style={{ background: theme.accent }}>
                  Join the waitlist
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer style={{ borderTop: `1px solid ${theme.border}`, background: theme.panel }}>
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl text-white" style={{ background: theme.accent }}>
                <Compass className="h-5 w-5" />
              </div>
              <div>
                <div className="text-base font-semibold tracking-tight" style={{ color: theme.text }}>The Local Man</div>
                <div className="text-sm" style={{ color: theme.muted }}>Local food. Local culture. Local people.</div>
              </div>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-6" style={{ color: theme.muted }}>
              Final landing page direction with map-led discovery, responsive layout, stronger visual structure, and multiple brand moods.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 text-sm md:justify-self-end" style={{ color: theme.muted }}>
            <div>
              <div className="font-semibold" style={{ color: theme.text }}>Explore</div>
              <div className="mt-3 space-y-2">
                <a href="#story" className="block hover:opacity-100">Story</a>
                <a href="#map" className="block hover:opacity-100">Map concept</a>
                <a href="#vendors" className="block hover:opacity-100">Vendors</a>
              </div>
            </div>
            <div>
              <div className="font-semibold" style={{ color: theme.text }}>Get access</div>
              <div className="mt-3 space-y-2">
                <a href="#waitlist" className="block hover:opacity-100">Join waitlist</a>
                <a href="#waitlist" className="block hover:opacity-100">Vendor sign-up</a>
                <a href="#waitlist" className="block hover:opacity-100">Launch updates</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
